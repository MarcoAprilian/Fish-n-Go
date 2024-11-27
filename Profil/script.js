// JavaScript can be added later for interactive features if needed
document.addEventListener('DOMContentLoaded', function() {
    // You can add any dynamic functionality here, for example:
    console.log("Halaman Profil Loaded!");
});

const images = [
    "logo1.jpg",
    "logo2.jpg",
    "logo3.jpg",
    "logo4.jpg"
];

const randomImage = images[Math.floor(Math.random() * images.length)];
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("avatar").src = randomImage;
});