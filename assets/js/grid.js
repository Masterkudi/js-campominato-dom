const btnPlay = document.querySelector("#btn-play");
const gridContainer = document.querySelector(".grid-container");

btnPlay.addEventListener("click", startGame);

function startGame() {
  const difficulty = document.querySelector("select").value;
  const gridSize = getGridSize(difficulty);
  const bombsCount = 16; // Numero di bombe fisso
  const gridList = createGrid(gridSize);
  

  // Genera le bombe in posizioni casuali
  const bombIndexes = generateBombIndexes(gridSize, bombsCount);
  for (let index of bombIndexes) {
    gridList[index].hasBomb = true;
  }

  printGrid(gridContainer, gridList);

  // Aggiungi l'evento di click a ogni cella
  const gridSquares = document.querySelectorAll(".grid-square");
  for (let i = 0; i < gridSquares.length; i++) {
    square.setAttribute("data-index", i);

    gridSquares[i].addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      revealCell(gridList, index);
    });
    
  }
}

function getGridSize(difficulty) {
  switch (difficulty) {
    case "1":
      return 100;
    case "2":
      return 81;
    case "3":
      return 49;
    default:
      return 100;
  }
}

function createGrid(gridSize) {
  const grid = [];

  for (let i = 0; i < gridSize; i++) {
    const square = {
      hasBomb: false,
      isRevealed: false,
    };
    grid.push(square);
  }

  return grid;
}

function generateBombIndexes(gridSize, bombsCount) {
  const bombIndexes = [];

  while (bombIndexes.length < bombsCount) {
    const randomIndex = Math.floor(Math.random() * gridSize);
    if (!bombIndexes.includes(randomIndex)) {
      bombIndexes.push(randomIndex);
    }
  }

  return bombIndexes;
}

function printGrid(container, squaresList) {
  container.innerHTML = "";

  for (let i = 0; i < squaresList.length; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    container.appendChild(square);
    
  }
}

function revealCell(gridList, index) {
  const gridSquare = document.querySelectorAll(".grid-square")[index];
  const square = gridList[index];
  if (square.hasBomb) {
    gridSquare.classList.add("bg-danger");
    gameOver();
  } else {
    gridSquare.classList.add("bg-primary");
    square.isRevealed = true;
    checkWin(gridList);
  }
}

function gameOver() {
  alert("Game over!");
}

function checkWin(gridList) {
  const gridSquares = document.querySelectorAll(".grid-square");
  const revealedCount = Array.from(gridList).filter((square) =>
    square.isRevealed
  ).length;

  if (revealedCount === gridSquares.length - bombsCount) {
    const score = getScore();
    alert(`Hai vinto! Punteggio: ${score}`);
  }
}

function getScore() {
  const gridSquares = document.querySelectorAll(".grid-square");
  const score = Array.from(gridSquares).filter((square) =>
    square.classList.contains("bg-primary")
  ).length;
  return score;
}
