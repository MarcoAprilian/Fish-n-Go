const clickSound = document.getElementById("click-sound");


document.addEventListener("click", function () {
    // Play the sound
    clickSound.currentTime = 0; // Reset time to start the sound from the beginning
    clickSound.play();
  });
