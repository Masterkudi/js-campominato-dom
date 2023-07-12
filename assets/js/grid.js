const squareCellsSelect = document.querySelector("[name='square-cells']");
const btnPlay = document.querySelector("#btn-play");

const gridContainer = document.querySelector(".grid-container");

btnPlay.addEventListener("click", onBtnClick);

function onBtnClick() {

    const squareCells = parseInt(squareCellsSelect.value);

    console.log("valore scelto", squareCells);

    const gridList = createGrid(squareCells);

    console.log(gridList);

    printGrid(gridContainer, gridList);

}

function createSingleSquare(squareContent, squareCells) {
    const square = document.createElement("div");
  
    const squaresPerRow = Math.sqrt(squareCells);
  
    square.classList.add("grid-square");
    square.textContent = squareContent;
    square.style.flexBasis = `calc(100% / ${squaresPerRow})`;
  
    square.addEventListener("click", function () {
      square.classList.toggle("bg-primary");
    });
  
    // Output
    return square;
  }
  
function createGrid(squaresNumber) {
    const grid = [];
  
    for (let i = 0; i < squaresNumber; i++) {
      // salvo in una variabile l'output della funzione createSingleSquare
      const newSquare = createSingleSquare("" + i, squaresNumber);
  
      grid.push(newSquare);
    }
  
    // Output
    return grid;
  }

  function printGrid(container, squaresList) {
    // reset del contenuto del container per evitare che ci siano altri div creati precedentemente
    container.innerHTML = "";
  
    for (let i = 0; i < squaresList.length; i++) {
      container.append(squaresList[i]);
    }
  }

