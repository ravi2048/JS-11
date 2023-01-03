// grab the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');

const sliders = player.querySelectorAll('.player__slider');

const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled');

// functions
progress.style.cursor = 'pointer';
const togglePlay = () => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

const updateIcon = () => {
    const icon = video.paused ? '►' : '❚ ❚';
    toggleButton.textContent = icon;
};

function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function slideHandler() {
    video[this.name] = this.value;
}

function updateProgressBarAuto() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function updateProgressBarManual(e) {
    const skipToTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = skipToTime;
}

// add event listeners
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);

skipButtons.forEach(skip => skip.addEventListener('click', skipVideo))

sliders.forEach(slider => {
    slider.addEventListener('change', slideHandler)
    slider.addEventListener('mousemove', slideHandler)
});

video.addEventListener('timeupdate', updateProgressBarAuto);

progress.addEventListener('click', updateProgressBarManual);
let isMouseDown = false;
progress.addEventListener('mousemove', (e) => isMouseDown && updateProgressBarManual(e));
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('mousedown', () => isMouseDown = true);