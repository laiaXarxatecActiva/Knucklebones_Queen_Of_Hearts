import { initDragAndDrop } from "./dragDrop.js";
import { GameBoard } from "./GameBoard.js";
import { showExplanation, showRoundInfo } from "./popUp.js";
import { initTurn, restartTurn } from "./turnSystem.js";

// CREATING THE BOARDS 
const opponentContainer = document.getElementById("opponent");
const playerContainer = document.getElementById("player");

// the opponent boards are initialized earlier
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

initTurn(playerBoard,opponentBoard);

// ..... Drag&Drop .....

//Because the items are controlled in drag&drop for score, it is no longer needed in this
//const diceItems = Array.from(document.querySelectorAll(".dice")) as HTMLElement[];

const cells = Array.from(document.querySelectorAll(".cell")) as HTMLElement[];

if (playerBoard && opponentBoard) {
    //And now it needs the player and opponentBoard
    initDragAndDrop(cells, playerBoard, opponentBoard);
}

document.getElementById('how-to-play-btn')?.addEventListener('click', showExplanation);

document.getElementById('round-info-btn')?.addEventListener('click', () => {
    const playerScore = document.getElementById('player-score-value')?.textContent ?? '0';
    const opponentScore = document.getElementById('opponent-score-value')?.textContent ?? '0';
    showRoundInfo(opponentScore, playerScore);
});

// Restart Game upon End Game
document.addEventListener('restart-game', () => {
    playerBoard?.clearBoard();
    opponentBoard?.clearBoard();
    restartTurn();
})