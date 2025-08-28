let currPlayer = "X";
let arr = Array(9).fill(null);

document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      handleClick(tile);
    });
  });

  document.getElementById("reset").addEventListener("click", resetGame);
  document
    .getElementById("darkModeToggle")
    .addEventListener("click", toggleDarkMode);
});

function checkWinner() {
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) ||
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) ||
    (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6])
  ) {
    document.getElementById("running").textContent = `Winner is ${currPlayer}`;
    document.ge
    return true;
  }

  if (!arr.some((e) => e === null)) {
    document.getElementById("running").textContent = `It's a Tie!`;
    return true;
  }

  return false;
}

function handleClick(tile) {
  const id = Number(tile.id);
  if (arr[id] !== null) return;
  arr[id] = currPlayer;
  tile.textContent = currPlayer;

  if (checkWinner()) {
    return;
  }

  currPlayer = currPlayer === "X" ? "O" : "X";
  document.getElementById("turns").textContent = `Current Turn: ${currPlayer}`;
}

function resetGame() {
  arr.fill(null);
  currPlayer = "X";
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.textContent = "";
  });
  document.getElementById("turns").textContent = `Current Turn: X`;
  document.getElementById("running").textContent = `Game Status: Running`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const button = document.getElementById("darkModeToggle");
  button.textContent = document.body.classList.contains("dark-mode")
    ? "LIGHT MODE"
    : "DARK MODE";
}

// Apply saved theme on reload
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  document.getElementById("darkModeToggle").textContent = "LIGHT MODE";
}
