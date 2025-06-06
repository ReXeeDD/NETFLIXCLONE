// DOM Elements
const videoPlayer = document.getElementById('movie-player');
const videoContainer = document.querySelector('.video-container');
const playPauseBtn = document.querySelector('.play-pause');
const volumeBtn = document.querySelector('.volume');
const volumeSlider = document.querySelector('.volume-slider');
const volumeFilled = document.querySelector('.volume-filled');
const progressBar = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const fullscreenBtn = document.querySelector('.fullscreen');
const backButton = document.querySelector('.back-button');
const movieTitle = document.querySelector('.movie-title');

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Initialize video source and title
if (movieId) {
    // Always play movie1.mp4 regardless of which movie is clicked
    videoPlayer.src = 'movies/movie1.mp4';
    
    // Still show the correct title for the movie that was clicked
    const movieData = {
        1: "Dune: Part Two",
        2: "Madame Web",
        3: "Anyone But You",
        4: "Argylle",
        5: "Migration"
    };
    movieTitle.textContent = movieData[movieId] || 'Movie';
} else {
    window.location.href = 'index.html';
}

// Play/Pause functionality
function togglePlay() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playPauseBtn.addEventListener('click', togglePlay);
videoPlayer.addEventListener('click', togglePlay);

// Volume functionality
let lastVolume = 1;

function toggleMute() {
    if (videoPlayer.volume) {
        lastVolume = videoPlayer.volume;
        videoPlayer.volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeFilled.style.width = '0';
    } else {
        videoPlayer.volume = lastVolume;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeFilled.style.width = `${lastVolume * 100}%`;
    }
}

function handleVolumeChange(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const volume = Math.min(Math.max(x / rect.width, 0), 1);
    videoPlayer.volume = volume;
    volumeFilled.style.width = `${volume * 100}%`;
    
    if (volume === 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

volumeBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('click', handleVolumeChange);

// Progress bar functionality
function updateProgress() {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    
    currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
    totalTimeEl.textContent = formatTime(videoPlayer.duration);
}

function setProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / rect.width) * videoPlayer.duration;
    videoPlayer.currentTime = time;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

videoPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

// Back button functionality
backButton.addEventListener('click', () => {
    window.history.back();
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlay();
            break;
        case 'f':
            toggleFullscreen();
            break;
        case 'm':
            toggleMute();
            break;
        case 'arrowleft':
            videoPlayer.currentTime -= 10;
            break;
        case 'arrowright':
            videoPlayer.currentTime += 10;
            break;
        case 'arrowup':
            e.preventDefault();
            videoPlayer.volume = Math.min(videoPlayer.volume + 0.1, 1);
            volumeFilled.style.width = `${videoPlayer.volume * 100}%`;
            break;
        case 'arrowdown':
            e.preventDefault();
            videoPlayer.volume = Math.max(videoPlayer.volume - 0.1, 0);
            volumeFilled.style.width = `${videoPlayer.volume * 100}%`;
            break;
    }
});

// Hide controls when mouse is inactive
let timeout;
videoContainer.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    videoContainer.style.cursor = 'default';
    timeout = setTimeout(() => {
        if (!videoPlayer.paused) {
            videoContainer.style.cursor = 'none';
        }
    }, 3000);
}); 