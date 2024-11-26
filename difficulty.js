const playButton = document.getElementById("play-button");
const container = document.querySelector(".play-button-container");

function createButton(text, targetFile) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "center-button difficulty-btn";
    button.addEventListener("click", () => {
        window.location.href = targetFile;
    });
    return button;
}

playButton.addEventListener("click", () => {
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    const easyButton = createButton("Easy", "Page2/Page2.html");
    const mediumButton = createButton("Medium", "Page2/Page2.html");
    const hardButton = createButton("Hard", "Page2/Page2.html");

    container.appendChild(easyButton);
    container.appendChild(mediumButton);
    container.appendChild(hardButton);
});
