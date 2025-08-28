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
  // Define all winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      arr[a] !== null &&
      arr[a] === arr[b] &&
      arr[b] === arr[c]
    ) {
      document.getElementById("running").textContent = `Winner is ${currPlayer}`;
      highlightWinningTiles(combo);
      clearNonWinningTiles(combo);
      return true;
    }
  }

  if (!arr.some((e) => e === null)) {
    document.getElementById("running").textContent = `It's a Tie!`;
    return true;
  }

  return false;
}

function highlightWinningTiles(winningTiles) {
  winningTiles.forEach(i => {
    const tile = document.getElementById(i);
    tile.classList.add('winner');
  });
}

function clearNonWinningTiles(winningTiles) {
  for (let i = 0; i < arr.length; i++) {
    if (!winningTiles.includes(i)) {
      const tile = document.getElementById(i);
      tile.textContent = "";
      tile.classList.remove('winner');
    }
  }
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
