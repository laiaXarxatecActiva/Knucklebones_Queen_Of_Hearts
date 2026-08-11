import { initDragAndDrop } from "./dragDrop.js";
import { GameBoard } from "./GameBoard.js"
import { showExplanation, showRoundInfo } from "./popUp.js";
import { initTurn } from "./turnSystem.js";

// CREATING THE BOARDS 
const opponentContainer = document.getElementById("opponent");
const playerContainer = document.getElementById("player");

if (opponentContainer) {
    const opponentBoard = new GameBoard(
        opponentContainer, 
        "opponent", 
        "Reina de Naipes"
    );
    opponentBoard.create();
}

if (playerContainer) {
    const playerBoard = new GameBoard(
        playerContainer,
        "player",
        "Tú"
    );
    playerBoard.create();
}


initTurn();


// ..... TEST dragDrop .....

const diceItems = Array.from(document.querySelectorAll<HTMLElement>(".dice"));

const cells = Array.from(document.querySelectorAll<HTMLElement>(".cell"));

initDragAndDrop(diceItems, cells);

/*rollDice(playerDiceImage);
rollDice(cpuDiceImage);*/

document.getElementById('how-to-play-btn')?.addEventListener('click', showExplanation);