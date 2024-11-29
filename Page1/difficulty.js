const playButton = document.getElementById("play-button");
const container = document.querySelector(".center-container");

function createButton(text, difficulty) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "center-button";
    button.addEventListener("click", () => {
        window.location.href = `Page2/Page2.html?difficulty=${difficulty}`;
    });
    return button;
}

playButton.addEventListener("click", () => {
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";

    const easyButton = createButton("Easy", "easy");
    const mediumButton = createButton("Medium", "medium");
    const hardButton = createButton("Hard", "hard");

    container.appendChild(easyButton);
    container.appendChild(mediumButton);
    container.appendChild(hardButton);
});
