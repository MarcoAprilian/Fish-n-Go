const musicPlayer = document.getElementById('background-music');
const play1 = document.getElementById('play-1');
const play2 = document.getElementById('play-2');
const play3 = document.getElementById('play-3');
const play4 = document.getElementById('play-4');
const play5 = document.getElementById('play-5');
const muteBtn = document.getElementById('mute');
let isMuted = false; // Track whether the audio is muted
let wasPlaying = false; // Track if music was playing before mute

// Show or hide dropdown menu when the button is clicked
document.getElementById('menu-button').addEventListener('click', function() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Actions for the buttons in the dropdown
play1.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute'; // Reset the mute button text
});

play2.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute';
});

play3.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute';
});

play4.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute';
});

play5.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute';
});

// Mute and unmute functionality
muteBtn.addEventListener('click', function() {
    if (isMuted) {
        if (wasPlaying) musicPlayer.play(); // Resume if it was playing before
        muteBtn.textContent = 'Mute';
    } else {
        if (!musicPlayer.paused) {
            musicPlayer.pause();
            wasPlaying = true;
        } else {
            wasPlaying = false;
        }
        muteBtn.textContent = 'Unmute';
    }
    isMuted = !isMuted;
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#menu-button')) {
        const dropdownContent = document.getElementById('dropdown-content');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
};