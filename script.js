document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    function renderBoard() {
        board.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(index) {
        if (gameState[index] === '' && !checkWinner()) {
            gameState[index] = currentPlayer;
            renderBoard();
            if (!checkWinner() && !checkDraw()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.textContent = `Player ${currentPlayer} wins!`;
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        if (!gameState.includes('')) {
            status.textContent = "It's a draw!";
            return true;
        }
        return false;
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
        status.textContent = `Current Player: ${currentPlayer}`;
    }

    resetBtn.addEventListener('click', resetGame);

    // Initialize the game
    renderBoard();
    status.textContent = `Current Player: ${currentPlayer}`;
});
