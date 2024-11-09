const musicPlayer = document.getElementById('background-music');
const play1 = document.getElementById('play-1');
const play2 = document.getElementById('play-2');
const play3 = document.getElementById('play-3');
const play4 = document.getElementById('play-4');
const play5 = document.getElementById('play-5');
const muteBtn = document.getElementById('mute');
let isMuted = false; 
let wasPlaying = false;


document.getElementById('menu-button').addEventListener('click', function() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});


play1.addEventListener('click', function() {
    musicPlayer.src = this.value;
    musicPlayer.play();
    isMuted = false;
    muteBtn.textContent = 'Mute';
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

// Mute and unmute
muteBtn.addEventListener('click', function() {
    if (isMuted) {
        if (wasPlaying) musicPlayer.play();
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

window.onclick = function(event) {
    const dropdownContent = document.getElementById('dropdown-content');
    const menuButton = document.getElementById('menu-button');

    if (!menuButton.contains(event.target) && !dropdownContent.contains(event.target)) {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
};
