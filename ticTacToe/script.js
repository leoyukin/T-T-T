const board = Array(9).fill("");

let currentPlayer = "X";

let gameOver = false;

const cells = document.querySelectorAll("#board button");

const statusEl = document.querySelector("#status");

const restart = document.querySelector("#restart");

function render() {
  cells.forEach((cell, index) => {

    cell.textContent = board[index]
  })
}

render();

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );


}


cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || board[index] !== "") return;
    board[index] = currentPlayer;
    render();
    if (checkWinner(currentPlayer)) {
      gameOver = true;
      statusEl.textContent = `${currentPlayer} wins!`
      return;
    }
    if (board.every(cell => cell !== "")) {
      gameOver = true;
      statusEl.textContent = "It's a draw!";
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `It's ${currentPlayer} turn`;

  })
})

restart.addEventListener("click", () => {
  gameOver = false;
  currentPlayer = "X";
  board.fill("");
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
  render();
})