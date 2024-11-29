const canvas = document.getElementById('bubblesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 20 + 13;
        this.speed = Math.random() * 0.8 + 1;
        this.opacity = Math.random() * 0.3 + 0.3;
    }

    update() {
        this.y -= this.speed;
        if (this.y < -this.radius) {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + this.radius;
        }
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, 
            this.y, 
            this.radius * 0.1, 
            this.x, 
            this.y, 
            this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.2})`);
        gradient.addColorStop(0.3, `rgba(230, 230, 250, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        // Add a shiny highlight
        ctx.beginPath();
        ctx.arc(this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.3});`
        ctx.fill();
        ctx.closePath();
    }
}

function createBubbles() {
    for (let i = 0; i < 40; i++) {
        bubbles.push(new Bubble());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animate);
}

createBubbles();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
