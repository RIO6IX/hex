// Create floating shapes
const shapesContainer = document.querySelector('.floating-shapes');
const colors = ['#ff6b6b88', '#4ecdc488', '#ffffff88', '#96c93d88'];

for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.style.width = shape.style.height = `${Math.random() * 100 + 50}px`;
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.background = colors[Math.floor(Math.random() * colors.length)];
    shape.style.animationDelay = `${Math.random() * 5}s`;
    shapesContainer.appendChild(shape);
}

// Add mouse move interaction
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.backgroundPosition = `
        ${x * 100}% ${y * 100}%
    `;
});
