let btnRef = document.querySelectorAll(".button-option"); // Selects all elements with the class "button-option" (Tic-Tac-Toe cells)
let popupRef = document.querySelector(".popup"); // Selects the popup element for displaying game-over messages
let newGameBtn = document.getElementById("new-game"); // Selects the "New Game" button for starting a new game
let restartBtn = document.getElementById("restart"); // Selects the "Restart" button for restarting the current game
let msgRef = document.getElementById("message"); // Selects the message element within the popup to display game-over messages

// Winning pattern array for Tic-Tac-Toe
let winningPattern = [
    [0, 1, 2], // Horizontal top row
    [3, 4, 5], // Horizontal middle row
    [6, 7, 8], // Horizontal bottom row
    [0, 3, 6], // Vertical left column
    [1, 4, 7], // Vertical middle column
    [2, 5, 8], // Vertical right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Game state initialization
let xTurn = true; // Indicates whether it's player 'X's turn (starts as true)
let count = 0; // Keeps track of the number of moves made in the game


// Display 'x' or 'o' on click and check for winner
btnRef.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (xTurn) // If it's 'X's turn
        {
            element.innerText = "X"; // Set the clicked cell's text to 'X'
            element.disabled = true; // Disable the cell to prevent further clicks
            xTurn = false; // Switch to 'O's turn
        } else {  // If it's 'O's turn

            element.innerText = "O";  // Set the clicked cell's text to 'O'
            element.disabled = true; // Disable the cell
            xTurn = true; // Switch to 'X's turn

        }
        count++;  // Increment the move count
        checkWinner(); // Check if a winning pattern is achieved
    });
});   

// Check for winner or tie
function checkWinner() {
    for (let pattern of winningPattern) // iterates through each winning pattern in the winningPattern array.
        {
        let [a, b, c] = pattern; //  destructures the pattern to get the indices of the cells in that pattern.
        if (
            btnRef[a].innerText !== "" && // Ensures the cells being checked are not empty.
            btnRef[a].innerText === btnRef[b].innerText &&
            btnRef[a].innerText === btnRef[c].innerText // Checks if the three cells in the current pattern have the same content (either 'X' or 'O').
        ) {
            gameOver(btnRef[a].innerText); //Triggers the game-over logic and passes the winner's symbol ('X' or 'O').
            return;
        }
    }
    if (count === 9) {
        gameOver("It's a Tie!");  //If count is 9, and no winner has been found, it calls gameOver("It's a Tie!") to indicate a tie.
    }
}

// Display game-over popup with message
function gameOver(winner) {
    popupRef.classList.remove("hide"); // removes the "hide" class from the popup, making it visible.
    if (winner === "It's a Tie!") {
        msgRef.innerText = winner;
    } else {
        msgRef.innerText = `Player ${winner} wins!`;
    }
}

// Reset game for a new game or restart
function resetGame() {
    xTurn = true; // Reset the turn to 'X' (as the game usually starts with 'X')
    count = 0; // Reset the move count to zero
    popupRef.classList.add("hide"); // Hide the game-over popup
    btnRef.forEach((element) => {
        element.innerText = ""; // Clear the content of each button (cell)
        element.disabled = false;  //Re-enable the button to allow new clicks
    });
}

newGameBtn.addEventListener("click", resetGame); // on click new game 
restartBtn.addEventListener("click", resetGame); // on click reset game
