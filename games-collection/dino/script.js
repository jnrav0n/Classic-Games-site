const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

// Set canvas size
canvas.width = 800;
canvas.height = 300;

// Game constants
const GRAVITY = 0.8;
const JUMP_FORCE = -15;
const GROUND_Y = canvas.height - 50;
const DINO_WIDTH = 40;
const DINO_HEIGHT = 60;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 40;
const INITIAL_SPEED = 5;
const MAX_SPEED = 12;

// Game variables
let dino = {
    x: 50,
    y: GROUND_Y - DINO_HEIGHT,
    width: DINO_WIDTH,
    height: DINO_HEIGHT,
    velocityY: 0,
    isJumping: false
};

let obstacles = [];
let score = 0;
let highScore = localStorage.getItem('dinoHighScore') || 0;
let gameSpeed = INITIAL_SPEED;
let gameLoop = null;
let gameStarted = false;

// Initialize game
function initGame() {
    dino.y = GROUND_Y - DINO_HEIGHT;
    dino.velocityY = 0;
    dino.isJumping = false;
    obstacles = [];
    score = 0;
    gameSpeed = INITIAL_SPEED;
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

// Draw dinosaur
function drawDino() {
    // Body
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Legs
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(dino.x + 5, dino.y + dino.height - 15, 8, 15);
    ctx.fillRect(dino.x + dino.width - 13, dino.y + dino.height - 15, 8, 15);

    // Eye
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(dino.x + dino.width - 10, dino.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(dino.x + 15, dino.y - 10, 10, 20);
}

// Draw obstacle
function drawObstacle(obstacle) {
    // Main body
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Pattern
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    
    // Draw diagonal stripes
    for (let i = 0; i < obstacle.width; i += 4) {
        ctx.beginPath();
        ctx.moveTo(obstacle.x + i, obstacle.y);
        ctx.lineTo(obstacle.x + i + obstacle.height, obstacle.y + obstacle.height);
        ctx.stroke();
    }

    // Draw border
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, GROUND_Y, canvas.width, 2);

    // Draw dinosaur
    drawDino();

    // Draw obstacles
    obstacles.forEach(drawObstacle);
}

// Update game state
function update() {
    // Update dinosaur position
    dino.velocityY += GRAVITY;
    dino.y += dino.velocityY;

    // Ground collision
    if (dino.y > GROUND_Y - DINO_HEIGHT) {
        dino.y = GROUND_Y - DINO_HEIGHT;
        dino.velocityY = 0;
        dino.isJumping = false;
    }

    // Update obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameSpeed;
        
        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
            scoreElement.textContent = score;
            
            // Update high score
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem('dinoHighScore', highScore);
            }
        }

        // Collision detection
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            gameOver();
        }
    });

    // Increase game speed gradually
    gameSpeed = Math.min(INITIAL_SPEED + Math.floor(score / 50), MAX_SPEED);
}

// Spawn obstacle
function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        y: GROUND_Y - OBSTACLE_HEIGHT,
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT
    });
}

// Game loop
function gameStep() {
    update();
    draw();
}

// Start game
function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    initGame();
    gameLoop = setInterval(gameStep, 1000 / 60);
    obstacleSpawner = setInterval(spawnObstacle, 2000);
    startButton.textContent = 'Restart Game';
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    clearInterval(obstacleSpawner);
    gameStarted = false;
    alert(`Game Over! Score: ${score}`);
    startButton.textContent = 'Start Game';
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;
    
    if (event.code === 'Space' && !dino.isJumping) {
        dino.velocityY = JUMP_FORCE;
        dino.isJumping = true;
    }
});

// Start button click handler
startButton.addEventListener('click', startGame);

// Initial draw
draw(); 