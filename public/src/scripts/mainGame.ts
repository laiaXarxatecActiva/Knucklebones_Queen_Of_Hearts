import { initDragAndDrop } from "./dragDrop.js";
import { GameBoard } from "./GameBoard.js"
import { explanationGame } from "./popUps.js";

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

// CREATING THE DICE

const playerDiceImage = document.getElementById("player-dice") as HTMLImageElement;
const cpuDiceImage = document.getElementById("opponent-dice") as HTMLImageElement;

// CREATING CARD SYMBOLS

const PIKE = {
    value:0,
    src: "public/src/imgs/pike.png"
};

const CLUB = {
    value:0,
    src: "public/src/imgs/club.png"
};

const HEART = {
    value:0,
    src: "public/src/imgs/heart.png"
};

const DIAMOND = {
    value:0,
    src: "public/src/imgs/diamond.png"
};

const QUEEN = {
    value: 0,
    src: "public/src/imgs/queen_crown.png"
};

const JOKER = {
    value: 0,
    src: "public/src/imgs/joker.png"
};

const cardSymbolList = [PIKE, CLUB, HEART, DIAMOND, JOKER, QUEEN];

// ..... TEST dragDrop .....

const diceItems = Array.from(document.querySelectorAll<HTMLElement>(".dice"));

const cells = Array.from(document.querySelectorAll<HTMLElement>(".cell"));

initDragAndDrop(diceItems, cells);

// FUNCTION RAND

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// FUNCTION DICE ROLL

function rollDice(dice:HTMLImageElement): void {
    dice.src = cardSymbolList[getRandomInt(0, cardSymbolList.length)].src;
}

rollDice(playerDiceImage);
rollDice(cpuDiceImage);

explanationGame();