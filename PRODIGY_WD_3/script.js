let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Columns
    [0, 4, 8], [2, 4, 6]               // Diagonals
];

function startGame() {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    initializeGame();
}

function initializeGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    document.getElementById('gameStatus').textContent = "Player X's turn";
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('win-animation', 'lose-animation', 'tie-animation');
    });
}

function makeMove(cell, index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === "X" ? "#3498DB" : "#E74C3C";
        
        checkResult();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        
        // Check for a winning pattern
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('gameStatus').textContent = `Player ${board[a]} Wins!`;

            // Highlight winning cells with win animation
            pattern.forEach(index => document.getElementsByClassName('cell')[index].classList.add('win-animation'));

            // Add lose animation to opponent’s cells
            Array.from(document.getElementsByClassName('cell')).forEach((cell, index) => {
                if (!pattern.includes(index)) {
                    cell.classList.add('lose-animation');
                }
            });

            winnerFound = true;
            return;
        }
    }

    // Check for a tie if no winner was found and the board is full
    if (!winnerFound && !board.includes("")) {
        gameActive = false;
        document.getElementById('gameStatus').textContent = "It's a Draw!";
        
        // Apply tie animation to all cells
        Array.from(document.getElementsByClassName('cell')).forEach(cell => {
            cell.classList.add('tie-animation');
        });
    }
}

function restartGame() {
    initializeGame();
}
