// Game configurations
const DIFFICULTIES = {
    beginner: { rows: 9, cols: 9, mines: 10 },
    intermediate: { rows: 16, cols: 16, mines: 40 },
    expert: { rows: 16, cols: 30, mines: 99 }
};

// Game variables
let board = [];
let mineLocations = [];
let gameStarted = false;
let gameOver = false;
let timer = 0;
let timerInterval;
let currentDifficulty = 'beginner';
let remainingMines;

// DOM elements
const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
const newGameButton = document.getElementById('newGameButton');
const timerDisplay = document.getElementById('timer');
const mineCountDisplay = document.getElementById('mineCount');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Initialize game
function initGame() {
    const config = DIFFICULTIES[currentDifficulty];
    board = [];
    mineLocations = [];
    gameStarted = false;
    gameOver = false;
    timer = 0;
    remainingMines = config.mines;
    mineCountDisplay.textContent = remainingMines;
    timerDisplay.textContent = '0 seconds';
    newGameButton.style.display = 'none';
    
    // Clear previous board
    gameBoard.innerHTML = '';
    
    // Set grid template columns based on difficulty and screen size
    let cellSize = 30; // Default size
    if (window.innerWidth <= 800) {
        cellSize = 25;
    } else if (window.innerWidth <= 600) {
        cellSize = 20;
    } else if (window.innerWidth <= 400) {
        cellSize = 18;
    }
    
    // For expert mode, ensure the grid fits
    if (currentDifficulty === 'expert') {
        const maxWidth = window.innerWidth - 40; // Account for padding and margins
        const maxCols = Math.floor(maxWidth / cellSize);
        if (config.cols > maxCols) {
            cellSize = Math.floor(maxWidth / config.cols);
        }
    }
    
    gameBoard.style.gridTemplateColumns = `repeat(${config.cols}, ${cellSize}px)`;
    
    // Create new board
    for (let i = 0; i < config.rows; i++) {
        board[i] = [];
        for (let j = 0; j < config.cols; j++) {
            board[i][j] = {
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            };
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            gameBoard.appendChild(cell);
        }
    }
}

// Place mines randomly
function placeMines(firstRow, firstCol) {
    const config = DIFFICULTIES[currentDifficulty];
    const totalCells = config.rows * config.cols;
    const mineCount = config.mines;
    
    // Create array of all possible positions
    let positions = [];
    for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / config.cols);
        const col = i % config.cols;
        // Don't place mine on first click or adjacent cells
        if (Math.abs(row - firstRow) > 1 || Math.abs(col - firstCol) > 1) {
            positions.push({ row, col });
        }
    }
    
    // Shuffle and place mines
    for (let i = 0; i < mineCount; i++) {
        const randomIndex = Math.floor(Math.random() * positions.length);
        const { row, col } = positions.splice(randomIndex, 1)[0];
        board[row][col].isMine = true;
        mineLocations.push({ row, col });
    }
    
    // Calculate neighbor mines
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.cols; j++) {
            if (!board[i][j].isMine) {
                board[i][j].neighborMines = countNeighborMines(i, j);
            }
        }
    }
}

// Count mines around a cell
function countNeighborMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (isValidCell(newRow, newCol) && board[newRow][newCol].isMine) {
                count++;
            }
        }
    }
    return count;
}

// Check if cell is within board bounds
function isValidCell(row, col) {
    const config = DIFFICULTIES[currentDifficulty];
    return row >= 0 && row < config.rows && col >= 0 && col < config.cols;
}

// Reveal a cell
function revealCell(row, col) {
    if (!isValidCell(row, col) || board[row][col].isRevealed || board[row][col].isFlagged) {
        return;
    }
    
    board[row][col].isRevealed = true;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (board[row][col].isMine) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        handleGameOver(false);
        revealAllMines();
        return;
    }
    
    cell.classList.add('revealed');
    
    if (board[row][col].neighborMines > 0) {
        cell.textContent = board[row][col].neighborMines;
        cell.style.color = getNumberColor(board[row][col].neighborMines);
        return;
    }
    
    // Reveal neighbors if no mines around
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            revealCell(row + i, col + j);
        }
    }
    
    // Check win condition
    if (checkWin()) {
        handleGameOver(true);
    }
}

// Get color for numbers
function getNumberColor(num) {
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d'];
    return colors[num - 1] || '#000';
}

// Toggle flag on a cell
function toggleFlag(row, col) {
    if (!isValidCell(row, col) || board[row][col].isRevealed || gameOver) {
        return;
    }
    
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    board[row][col].isFlagged = !board[row][col].isFlagged;
    
    if (board[row][col].isFlagged) {
        cell.classList.add('flagged');
        cell.textContent = '🚩';
        remainingMines--;
    } else {
        cell.classList.remove('flagged');
        cell.textContent = '';
        remainingMines++;
    }
    
    mineCountDisplay.textContent = remainingMines;
    
    // Check win condition
    if (checkWin()) {
        gameOver = true;
        clearInterval(timerInterval);
        alert('Congratulations! You won!');
    }
}

// Check win condition
function checkWin() {
    const config = DIFFICULTIES[currentDifficulty];
    for (let i = 0; i < config.rows; i++) {
        for (let j = 0; j < config.cols; j++) {
            if (board[i][j].isMine && !board[i][j].isFlagged) {
                return false;
            }
            if (!board[i][j].isMine && !board[i][j].isRevealed) {
                return false;
            }
        }
    }
    return true;
}

// Reveal all mines
function revealAllMines() {
    mineLocations.forEach(({ row, col }) => {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('mine');
        cell.textContent = '💣';
    });
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `${timer} seconds`;
    }, 1000);
}

// Event Listeners
gameBoard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell') || gameOver) return;
    
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    if (!gameStarted) {
        gameStarted = true;
        placeMines(row, col);
        startTimer();
    }
    
    revealCell(row, col);
});

gameBoard.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('cell') || gameOver) return;
    
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    if (!gameStarted) {
        gameStarted = true;
        placeMines(row, col);
        startTimer();
    }
    
    toggleFlag(row, col);
});

startButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    initGame();
});

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentDifficulty = button.dataset.difficulty;
        initGame();
    });
});

// Update game over function
function handleGameOver(won) {
    gameOver = true;
    clearInterval(timerInterval);
    if (won) {
        alert('Congratulations! You won!');
    } else {
        alert('Game Over!');
    }
    newGameButton.style.display = 'block';
}

// Add event listener for new game button
newGameButton.addEventListener('click', () => {
    initGame();
});

// Add window resize handler
window.addEventListener('resize', () => {
    if (gameStarted) {
        initGame();
    }
});

// Initialize game on load
initGame(); 