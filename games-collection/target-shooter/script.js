const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const timerElement = document.getElementById('timer');

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Game constants
const GAME_DURATION = 60; // seconds
const TARGET_TYPES = [
    { color: '#e74c3c', points: 10, size: 30 },  // Red target - 10 points
    { color: '#3498db', points: 20, size: 25 },  // Blue target - 20 points
    { color: '#2ecc71', points: 30, size: 20 }   // Green target - 30 points
];

// Game variables
let score = 0;
let highScore = localStorage.getItem('targetShooterHighScore') || 0;
let timeLeft = GAME_DURATION;
let gameActive = false;
let targets = [];
let gameLoop = null;
let timerInterval = null;

// Target class
class Target {
    constructor() {
        const type = TARGET_TYPES[Math.floor(Math.random() * TARGET_TYPES.length)];
        this.x = Math.random() * (canvas.width - type.size);
        this.y = Math.random() * (canvas.height - type.size);
        this.size = type.size;
        this.color = type.color;
        this.points = type.points;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    isHit(x, y) {
        const centerX = this.x + this.size/2;
        const centerY = this.y + this.size/2;
        const distance = Math.sqrt(
            Math.pow(x - centerX, 2) + 
            Math.pow(y - centerY, 2)
        );
        return distance <= this.size/2;
    }
}

// Initialize game
function initGame() {
    score = 0;
    timeLeft = GAME_DURATION;
    targets = [];
    gameActive = true;
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
    timerElement.textContent = timeLeft;
    spawnTarget();
}

// Spawn new target
function spawnTarget() {
    targets.push(new Target());
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw targets
    targets.forEach(target => target.draw());
}

// Handle click
function handleClick(e) {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targets.forEach((target, index) => {
        if (target.isHit(x, y)) {
            score += target.points;
            scoreElement.textContent = score;
            targets.splice(index, 1);
            spawnTarget();
        }
    });
}

// Update game state
function update() {
    if (!gameActive) return;
}

// Game loop
function gameStep() {
    update();
    draw();
}

// Timer function
function updateTimer() {
    if (!gameActive) return;
    
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        gameOver();
    }
}

// Start game
function startGame() {
    if (gameActive) return;
    
    // Clear any existing intervals
    if (gameLoop) clearInterval(gameLoop);
    if (timerInterval) clearInterval(timerInterval);
    
    initGame();
    gameLoop = setInterval(gameStep, 1000 / 60);
    timerInterval = setInterval(updateTimer, 1000);
    startButton.textContent = 'Restart Game';
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    gameActive = false;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('targetShooterHighScore', highScore);
    }
    
    alert(`Game Over! Score: ${score}`);
    startButton.textContent = 'Start Game';
}

// Event listeners
canvas.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);

// Initial draw
draw(); 