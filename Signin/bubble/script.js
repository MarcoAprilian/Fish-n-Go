document.addEventListener('mousemove', function(e) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    document.body.appendChild(bubble);
    bubble.style.width = `${Math.random() * 10 + 10}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${e.pageX}px`;
    bubble.style.top = `${e.pageY}px`;

    bubble.addEventListener('animationend', () => bubble.remove());
});