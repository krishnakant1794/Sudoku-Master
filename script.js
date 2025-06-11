let board = [];             let solution = [];          let initialBoard = [];      let timerInterval;          let startTime;              let selectedCell = null;    
let puzzlesSolved = 0;
let fastestTime = Infinity; let totalTime = 0;          let leaderboard = [];       
const sudokuBoardEl = document.getElementById('sudoku-board');
const messagesEl = document.getElementById('messages');
const timerEl = document.getElementById('timer');
const puzzlesSolvedEl = document.getElementById('puzzles-solved');
const fastestTimeEl = document.getElementById('fastest-time');
const totalTimeEl = document.getElementById('total-time');
const leaderboardListEl = document.getElementById('leaderboard-list');
const difficultySelect = document.getElementById('difficulty');

const resetModal = document.getElementById('reset-modal');
const confirmResetBtn = document.getElementById('confirm-reset-btn');
const cancelResetBtn = document.getElementById('cancel-reset-btn');


/**
 * Formats milliseconds into a human-readable time string (MM:SS).
 * @param {number} ms - Time in milliseconds.
 * @returns {string} Formatted time string.
 */
function formatTime(ms) {
    if (ms === Infinity) return 'N/A';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Formats milliseconds into a human-readable time string (HH:MM:SS).
 * @param {number} ms - Time in milliseconds.
 * @returns {string} Formatted time string.
 */
function formatTotalTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Deep clones a 2D array (Sudoku board).
 * @param {number[][]} arr - The array to clone.
 * @returns {number[][]} A deep copy of the array.
 */
function deepCopy(arr) {
    return arr.map(row => [...row]);
}


/**
 * Checks if a number can be placed at a given position on the board.
 * @param {number[][]} currentBoard - The current state of the Sudoku board.
 * @param {number} row - The row index (0-8).
 * @param {number} col - The column index (0-8).
 * @param {number} num - The number to check (1-9).
 * @returns {boolean} True if the number is valid, false otherwise.
 */
function isValid(currentBoard, row, col, num) {
        for (let x = 0; x < 9; x++) {
        if (currentBoard[row][x] === num) {
            return false;
        }
    }

        for (let x = 0; x < 9; x++) {
        if (currentBoard[x][col] === num) {
            return false;
        }
    }

        const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentBoard[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Finds the next empty cell (0) on the board.
 * @param {number[][]} currentBoard - The current state of the Sudoku board.
 * @returns {[number, number]|null} An array [row, col] of the empty cell, or null if no empty cells.
 */
function findEmpty(currentBoard) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (currentBoard[r][c] === 0) {
                return [r, c];
            }
        }
    }
    return null;
}

/**
 * Solves the Sudoku board using a backtracking algorithm.
 * Modifies the board in place.
 * @param {number[][]} currentBoard - The board to solve.
 * @returns {boolean} True if a solution is found, false otherwise.
 */
function solveSudoku(currentBoard) {
    const emptyCell = findEmpty(currentBoard);
    if (!emptyCell) {
        return true;     }

    const [row, col] = emptyCell;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5); 
    for (const num of numbers) {
        if (isValid(currentBoard, row, col, num)) {
            currentBoard[row][col] = num;
            if (solveSudoku(currentBoard)) {
                return true;
            }
            currentBoard[row][col] = 0;         }
    }
    return false; }

/**
 * Generates a complete, valid Sudoku board.
 * @returns {number[][]} A 9x9 array representing a solved Sudoku board.
 */
function generateFullBoard() {
    const newBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    solveSudoku(newBoard);     return newBoard;
}

/**
 * Counts the number of solutions for a given Sudoku board.
 * This function is crucial for ensuring unique puzzles.
 * @param {number[][]} currentBoard - The board to check.
 * @returns {number} The number of unique solutions found.
 */
function countSolutions(currentBoard) {
    let solutions = 0;
    const tempBoard = deepCopy(currentBoard); 
    function solve(boardToCount) {
        if (solutions > 1) return; 
        const emptyCell = findEmpty(boardToCount);
        if (!emptyCell) {
            solutions++;
            return;
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValid(boardToCount, row, col, num)) {
                boardToCount[row][col] = num;
                solve(boardToCount);
                boardToCount[row][col] = 0;             }
        }
    }

    solve(tempBoard);
    return solutions;
}

/**
 * Generates a new Sudoku puzzle with a unique solution.
 * @param {string} difficulty - 'easy', 'medium', or 'hard'.
 * @returns {{puzzle: number[][], solution: number[][]}} The generated puzzle and its unique solution.
 */
function generatePuzzle(difficulty) {
    const fullBoard = generateFullBoard();
    const puzzleBoard = deepCopy(fullBoard); 
        let cellsToRemove;
    switch (difficulty) {
        case 'easy': cellsToRemove = 40; break;         case 'medium': cellsToRemove = 50; break;         case 'hard': cellsToRemove = 60; break;         default: cellsToRemove = 50;
    }

    let attempts = 0;
    while (cellsToRemove > 0 && attempts < 1000) {         const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (puzzleBoard[row][col] !== 0) {
            const originalValue = puzzleBoard[row][col];
            puzzleBoard[row][col] = 0; 
            if (countSolutions(puzzleBoard) === 1) {
                cellsToRemove--;
            } else {
                puzzleBoard[row][col] = originalValue;             }
        }
        attempts++;
    }
    return { puzzle: puzzleBoard, solution: fullBoard };
}


/**
 * Renders the Sudoku board in the DOM.
 * @param {number[][]} currentBoard - The board state to render.
 * @param {number[][]} initialPuzzle - The initial puzzle state (to mark prefilled cells).
 */
function renderBoard(currentBoard, initialPuzzle) {
    sudokuBoardEl.innerHTML = '';     currentBoard.forEach((row, rIdx) => {
        row.forEach((num, cIdx) => {
            const cellDiv = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';             input.maxLength = 1;
            input.value = num === 0 ? '' : num;
            input.dataset.row = rIdx;
            input.dataset.col = cIdx;

            if (initialPuzzle[rIdx][cIdx] !== 0) {
                input.classList.add('prefilled');
                input.readOnly = true;
            } else {
                input.addEventListener('input', handleInputChange);
                input.addEventListener('focus', handleCellFocus);
                input.addEventListener('blur', handleCellBlur);
            }
            cellDiv.appendChild(input);
            sudokuBoardEl.appendChild(cellDiv);
        });
    });
}

/**
 * Handles input changes in Sudoku cells.
 * Validates input and updates board state.
 * @param {Event} event - The input event.
 */
function handleInputChange(event) {
    const input = event.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    let value = input.value.trim();

        if (value === '' || (/^[1-9]$/.test(value))) {
        board[row][col] = value === '' ? 0 : parseInt(value);
        input.value = value;     } else {
        input.value = '';         board[row][col] = 0;
    }

    clearMessages();
    highlightErrors();     highlightRelatedCells(input); }

/**
 * Highlights cells with errors (repeated numbers in row, column, or box).
 */
function highlightErrors() {
        document.querySelectorAll('.highlight-error').forEach(el => el.classList.remove('highlight-error'));

    let hasErrors = false;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const num = board[r][c];
            if (num === 0) continue; 
                        board[r][c] = 0;
            if (!isValid(board, r, c, num)) {
                const inputEl = sudokuBoardEl.children[r * 9 + c].querySelector('input');
                inputEl.classList.add('highlight-error');
                hasErrors = true;
            }
            board[r][c] = num;         }
    }
    return hasErrors;
}

/**
 * Highlights the selected cell and related cells (same row, column, and 3x3 box).
 * @param {HTMLInputElement} inputEl - The currently focused input element.
 */
function highlightRelatedCells(inputEl) {
        document.querySelectorAll('.highlight-selected, .highlight-related').forEach(el => {
        el.classList.remove('highlight-selected', 'highlight-related');
    });

    if (!inputEl) return;

    const row = parseInt(inputEl.dataset.row);
    const col = parseInt(inputEl.dataset.col);

    inputEl.classList.add('highlight-selected');

        for (let i = 0; i < 9; i++) {
        if (i !== col) {
            sudokuBoardEl.children[row * 9 + i].querySelector('input').classList.add('highlight-related');
        }
        if (i !== row) {
            sudokuBoardEl.children[i * 9 + col].querySelector('input').classList.add('highlight-related');
        }
    }

        const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const r = startRow + i;
            const c = startCol + j;
            if (r !== row || c !== col) {
                sudokuBoardEl.children[r * 9 + c].querySelector('input').classList.add('highlight-related');
            }
        }
    }
}

/**
 * Handles cell focus to apply highlighting.
 * @param {Event} event - The focus event.
 */
function handleCellFocus(event) {
    selectedCell = event.target;
    highlightRelatedCells(selectedCell);
}

/**
 * Handles cell blur to remove highlighting.
 */
function handleCellBlur() {
    selectedCell = null;
    document.querySelectorAll('.highlight-selected, .highlight-related').forEach(el => {
        el.classList.remove('highlight-selected', 'highlight-related');
    });
}

/**
 * Displays a message to the user.
 * @param {string} message - The message text.
 * @param {string} type - 'success' or 'error'.
 */
function showMessage(message, type) {
    messagesEl.textContent = message;
    messagesEl.className = `text-lg font-semibold min-h-[2rem] ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
}

/**
 * Clears any displayed messages.
 */
function clearMessages() {
    messagesEl.textContent = '';
    messagesEl.className = 'text-lg font-semibold min-h-[2rem]';
}

/**
 * Checks the current board against the solution.
 */
function checkSolution() {
    stopTimer();
    const hasErrors = highlightErrors();

    if (hasErrors) {
        showMessage('Incorrect entries found. Please correct them!', 'error');
        return;
    }

        for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                showMessage('Puzzle not complete. Keep going!', 'error');
                startTimer();                 return;
            }
        }
    }

        for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] !== solution[r][c]) {
                showMessage('Solution is incorrect. Try again!', 'error');
                startTimer();                 return;
            }
        }
    }

        showMessage('Congratulations! Puzzle Solved!', 'success');
    updateStatsOnSolve();
}

/**
 * Resets the user-entered inputs on the board.
 */
function resetGame() {
    board = deepCopy(initialBoard);     renderBoard(board, initialBoard);     clearMessages();
    stopTimer();
    startTimer();     highlightErrors(); }

/**
 * Starts a new game: generates a new puzzle, resets timer, and renders.
 */
function newGame() {
    stopTimer();
    clearMessages();
    const difficulty = difficultySelect.value;
    const { puzzle, solution: solvedBoard } = generatePuzzle(difficulty);
    board = deepCopy(puzzle);
    initialBoard = deepCopy(puzzle);
    solution = deepCopy(solvedBoard);
    renderBoard(board, initialBoard);
    startTimer();
    highlightErrors(); }

/**
 * Fills one correct empty cell as a hint.
 */
function hint() {
    const emptyCells = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length === 0) {
        showMessage('No empty cells left for a hint!', 'error');
        return;
    }

        const hintCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const row = hintCell.r;
    const col = hintCell.c;
    const correctValue = solution[row][col];

    board[row][col] = correctValue;
    const inputEl = sudokuBoardEl.children[row * 9 + col].querySelector('input');
    inputEl.value = correctValue;
    inputEl.classList.add('prefilled');     inputEl.readOnly = true;
    inputEl.removeEventListener('input', handleInputChange);
    inputEl.removeEventListener('focus', handleCellFocus);
    inputEl.removeEventListener('blur', handleCellBlur);

    clearMessages();
    highlightErrors(); }

/**
 * Allows user to input their own puzzle and then solves it.
 */
function solveMyPuzzle() {
    stopTimer();
    clearMessages();

        document.querySelectorAll('#sudoku-board input').forEach(input => {
        input.readOnly = false;
        input.classList.remove('prefilled');
        input.addEventListener('input', handleInputChange);         input.addEventListener('focus', handleCellFocus);
        input.addEventListener('blur', handleCellBlur);
    });

        const currentPuzzle = deepCopy(board);

        const solved = solveSudoku(currentPuzzle);

    if (solved) {
        solution = deepCopy(currentPuzzle);         initialBoard = Array(9).fill(null).map(() => Array(9).fill(0));         renderBoard(solution, initialBoard);         showMessage('Your puzzle has been solved!', 'success');
    } else {
        showMessage('This puzzle has no solution or is invalid!', 'error');
    }
}


/**
 * Starts the game timer.
 */
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);     startTime = Date.now();
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

/**
 * Stops the game timer.
 */
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

/**
 * Updates the timer display.
 */
function updateTimerDisplay() {
    const elapsedTime = Date.now() - startTime;
    timerEl.textContent = formatTime(elapsedTime);
}


/**
 * Loads game statistics from localStorage.
 */
function loadStats() {
    const storedStats = localStorage.getItem('sudokuStats');
    if (storedStats) {
        const stats = JSON.parse(storedStats);
        puzzlesSolved = stats.puzzlesSolved || 0;
        fastestTime = stats.fastestTime || Infinity;
        totalTime = stats.totalTime || 0;
        leaderboard = stats.leaderboard || [];
    }
    updateStatsDisplay();
    updateLeaderboardDisplay();
}

/**
 * Saves game statistics to localStorage.
 */
function saveStats() {
    const stats = {
        puzzlesSolved,
        fastestTime,
        totalTime,
        leaderboard
    };
    localStorage.setItem('sudokuStats', JSON.stringify(stats));
}

/**
 * Updates the displayed statistics.
 */
function updateStatsDisplay() {
    puzzlesSolvedEl.textContent = puzzlesSolved;
    fastestTimeEl.textContent = formatTime(fastestTime);
    totalTimeEl.textContent = formatTotalTime(totalTime);
}

/**
 * Updates stats when a puzzle is solved.
 */
function updateStatsOnSolve() {
    puzzlesSolved++;
    const timeTaken = Date.now() - startTime;
    if (timeTaken < fastestTime) {
        fastestTime = timeTaken;
    }
    totalTime += timeTaken;

        leaderboard.push({ time: timeTaken, date: new Date().toLocaleString() });
    leaderboard.sort((a, b) => a.time - b.time);     leaderboard = leaderboard.slice(0, 10); 
    saveStats();
    updateStatsDisplay();
    updateLeaderboardDisplay();
}

/**
 * Resets all game statistics and clears localStorage.
 */
function resetStats() {
        const confirmation = window.confirm('Are you sure you want to reset all game statistics? This cannot be undone.');
    if (confirmation) {
        puzzlesSolved = 0;
        fastestTime = Infinity;
        totalTime = 0;
        leaderboard = [];
        saveStats();
        updateStatsDisplay();
        updateLeaderboardDisplay();
        showMessage('Statistics reset successfully!', 'success');
    }
}

/**
 * Updates the leaderboard display.
 */
function updateLeaderboardDisplay() {
    leaderboardListEl.innerHTML = '';
    if (leaderboard.length === 0) {
        leaderboardListEl.innerHTML = '<li class="text-gray-500">No entries yet. Solve a puzzle!</li>';
        return;
    }
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1}: ${formatTime(entry.time)} on ${entry.date}`;
        leaderboardListEl.appendChild(li);
    });
}

/**
 * Toggles dark mode on/off.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('sudokuDarkMode', 'enabled');
    } else {
        localStorage.removeItem('sudokuDarkMode');
    }
}

/**
 * Loads dark mode preference from localStorage.
 */
function loadDarkModePreference() {
    if (localStorage.getItem('sudokuDarkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Handles keyboard events for navigation and input.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyDown(event) {
    if (!selectedCell) return;

    const row = parseInt(selectedCell.dataset.row);
    const col = parseInt(selectedCell.dataset.col);
    let nextRow = row;
    let nextCol = col;

    switch (event.key) {
        case 'ArrowUp':
            nextRow = (row > 0) ? row - 1 : 8;
            break;
        case 'ArrowDown':
            nextRow = (row < 8) ? row + 1 : 0;
            break;
        case 'ArrowLeft':
            nextCol = (col > 0) ? col - 1 : 8;
            break;
        case 'ArrowRight':
            nextCol = (col < 8) ? col + 1 : 0;
            break;
        case 'Backspace':
        case 'Delete':
            if (!selectedCell.readOnly) {
                selectedCell.value = '';
                board[row][col] = 0;
                highlightErrors();
                clearMessages();
            }
            return;         case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9':
            if (!selectedCell.readOnly) {
                selectedCell.value = event.key;
                board[row][col] = parseInt(event.key);
                highlightErrors();
                clearMessages();
            }
            return;         default:
            return;     }

    event.preventDefault(); 
    const nextInput = sudokuBoardEl.children[nextRow * 9 + nextCol].querySelector('input');
    if (nextInput) {
        nextInput.focus();
    }
}

document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    loadStats();
    loadDarkModePreference();
    newGame(); 
        document.getElementById('new-game-btn').addEventListener('click', newGame);
    document.getElementById('check-solution-btn').addEventListener('click', checkSolution);
    document.getElementById('reset-btn').addEventListener('click', () => resetModal.classList.add('show'));
    document.getElementById('hint-btn').addEventListener('click', hint);
    document.getElementById('solve-my-puzzle-btn').addEventListener('click', solveMyPuzzle);
    document.getElementById('dark-mode-btn').addEventListener('click', toggleDarkMode);
    document.getElementById('reset-stats-btn').addEventListener('click', resetStats);

        confirmResetBtn.addEventListener('click', () => {
        resetGame();
        resetModal.classList.remove('show');
    });
    cancelResetBtn.addEventListener('click', () => {
        resetModal.classList.remove('show');
    });

        document.addEventListener('keydown', handleKeyDown);
}
