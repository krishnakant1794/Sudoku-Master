# Sudoku Master

Challenge your mind with Sudoku Master, a classic Sudoku game built using HTML, CSS (with Tailwind CSS for utility classes), and JavaScript. This game offers a responsive and intuitive interface, intelligent puzzle generation, and various features to enhance your playing experience.

## Table of Contents

-   [Features](#features)
-   [How to Play](#how-to-play)
-   [Installation](#installation)
-   [File Structure](#file-structure)
-   [Technologies Used](#technologies-used)
-   [Bonus Features Implemented](#bonus-features-implemented)
-   [Contributing](#contributing)
-   [License](#license)

## Features

* **Attractive UI:** Clean, modern design with an attractive title and icon.
* **Dynamic Sudoku Board:** Renders a 9x9 grid where pre-filled numbers are non-editable and blank cells are input boxes.
* **Intelligent Puzzle Generation:**
    * Automatically generates a new puzzle on page load or via the "New Game" button.
    * Ensures each generated puzzle has only one valid solution.
    * Offers **Difficulty Settings** (Easy, Medium, Hard) to control clue count.
* **Real-time Validation & Feedback:**
    * Highlights invalid entries (repeated numbers in a row, column, or 3x3 box) in real-time.
    * Displays clear error messages for incorrect inputs or incomplete puzzles.
    * Shows a success message upon correct puzzle completion.
* **Comprehensive Game Controls:**
    * **New Game:** Loads a fresh puzzle.
    * **Check Solution:** Validates the current puzzle state against the solution.
    * **Reset:** Clears only user-entered inputs, preserving pre-filled numbers. Includes a modal warning for confirmation.
    * **Hint:** Fills in one correct empty cell to help you out.
    * **Solve My Puzzle:** Allows users to input a custom puzzle and then solves it using the game's algorithm.
* **Persistent Scorecard / Stats:**
    * Tracks and displays the number of completed puzzles.
    * Saves user stats like puzzles solved, fastest time, and total time using `localStorage`.
    * Provides a button to reset all score and stat history.
* **Timer & Leaderboard:**
    * A timer tracks how long the user takes to solve a puzzle.
    * Maintains a leaderboard of the top 10 fastest times.
* **Customization:**
    * **Dark Mode:** A toggle button to switch between light and dark themes.
* **Enhanced UX:**
    * Supports keyboard navigation using arrow keys and number keys for seamless input.
    * Highlights selected cells and related rows, columns, and 3x3 blocks for better visual focus.

## How to Play

1.  **Start a Game:** A new Sudoku puzzle will be generated automatically when you open the page. You can also click the "New Game" button.
2.  **Choose Difficulty:** Select your preferred difficulty (Easy, Medium, Hard) from the dropdown.
3.  **Enter Numbers:** Click on any empty cell and type a number from 1 to 9.
4.  **Live Feedback:** Watch for cells highlighted in red, indicating an incorrect or conflicting entry.
5.  **Check Your Work:** Use the "Check Solution" button to validate your progress at any time.
6.  **Need Help?** Click "Hint" to reveal a correct number in an empty cell.
7.  **Reset:** If you want to clear your entries and start over on the same puzzle, click "Reset".
8.  **Solve a Custom Puzzle:** Click "Solve My Puzzle", then manually input the numbers of any Sudoku puzzle you want solved. Click "Solve My Puzzle" again to see the solution.
9.  **Track Progress:** Your stats (puzzles solved, fastest time, total time) and leaderboard entries are automatically saved.

## Installation

To run this Sudoku game locally, simply follow these steps:

1.  **Clone the repository (Optional, if you have the files already):**
    ```bash
    git clone [https://github.com/your-username/sudoku-master.git](https://github.com/your-username/sudoku-master.git)
    cd sudoku-master
    ```
2.  **Download the files:** If not cloning, ensure you have the `index.html`, `style.css`, and `script.js` files in the same directory.
3.  **Open `index.html`:** Double-click `index.html` in your file explorer, or open it with your web browser (e.g., Chrome, Firefox, Edge).

The game should load directly in your browser.

## File Structure 
.
├── index.html          # Main HTML file for the game interface
├── style.css           # Custom CSS for styling and board layout
└── script.js           # Core JavaScript logic for game mechanics, puzzle generation, and interactions
## Technologies Used

* **HTML5:** For the basic structure of the web page.
* **CSS3:** For styling and layout, enhanced with:
    * **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **JavaScript (ES6+):** For all game logic, including:
    * Sudoku puzzle generation (backtracking algorithm).
    * Solution validation.
    * UI manipulation and event handling.
    * Timer and stats management (using `localStorage`).
* **Font Awesome:** For the game's icon.
* **Google Fonts (Inter):** For a modern and readable typeface.

## Bonus Features Implemented

The following bonus features from the requirements have been successfully implemented:

* **Timer & Leaderboard:** Tracks game time and displays a list of best solving times.
* **Hint Feature:** Provides a single correct number to assist players.
* **Customizations:** Includes a dark mode toggle.
* **Extra UX & Game Enhancements:**
    * Keyboard navigation using arrow and number keys.
    * Ability for users to input puzzles manually and have them solved.
* **Difficulty Settings:** Offers "Easy", "Medium", and "Hard" difficulties by varying the number of initial clues.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
