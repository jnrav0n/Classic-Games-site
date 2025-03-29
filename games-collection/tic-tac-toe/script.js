const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

// Game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = {
    X: parseInt(localStorage.getItem('ticTacToeScoreX')) || 0,
    O: parseInt(localStorage.getItem('ticTacToeScoreO')) || 0
};

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    updatePlayerDisplay();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    updateCell(cell, cellIndex);
    handleResult();
}

// Update cell
function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;
}

// Handle game result
function handleResult() {
    let roundWon = false;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} wins!`;
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        status.textContent = "Game ended in a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    updatePlayerDisplay();
}

// Update player display
function updatePlayerDisplay() {
    document.querySelector('.player-x').classList.toggle('active', currentPlayer === 'X');
    document.querySelector('.player-o').classList.toggle('active', currentPlayer === 'O');
}

// Update scores
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    localStorage.setItem('ticTacToeScoreX', scores.X);
    localStorage.setItem('ticTacToeScoreO', scores.O);
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', initGame);

// Initialize game and scores
initGame();
updateScores(); 