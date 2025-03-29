const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');

// Draw background
ctx.fillStyle = '#f8f9fa';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw snake
ctx.fillStyle = '#2ecc71';
const snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];
const gridSize = 20;

for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
}

// Draw food
ctx.fillStyle = '#e74c3c';
ctx.fillRect(7 * gridSize, 5 * gridSize, gridSize - 2, gridSize - 2);

// Convert to data URL and download
const dataURL = canvas.toDataURL('image/png');
const link = document.createElement('a');
link.download = 'preview.png';
link.href = dataURL;
link.click(); 