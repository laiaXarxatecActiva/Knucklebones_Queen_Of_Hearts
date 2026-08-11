import { initDragAndDrop } from "./dragDrop.js";
import { GameBoard } from "./GameBoard.js"
import { showExplanation } from "./popUp.js";
import { initTurn } from "./turnSystem.js";

// CREATING THE BOARDS 
const opponentContainer = document.getElementById("opponent");
const playerContainer = document.getElementById("player");

let opponentBoard: GameBoard | undefined;
let playerBoard: GameBoard | undefined;

if (opponentContainer) {
    opponentBoard = new GameBoard(
        opponentContainer, 
        "opponent", 
        "Reina de Naipes"
    );
    opponentBoard.create();
}

if (playerContainer) {
    playerBoard = new GameBoard(
        playerContainer,
        "player",
        "Tú"
    );
    playerBoard.create();
}

// Initialize Turn system

initTurn();

// ..... Drag&Drop .....

//const diceItems = Array.from(document.querySelectorAll(".dice")) as HTMLElement[];
const cells = Array.from(document.querySelectorAll(".cell")) as HTMLElement[];

if (playerBoard && opponentBoard) {
    initDragAndDrop(cells, playerBoard, opponentBoard);
}

/*rollDice(playerDiceImage);
rollDice(cpuDiceImage);*/

document.getElementById('how-to-play-btn')?.addEventListener('click', showExplanation);