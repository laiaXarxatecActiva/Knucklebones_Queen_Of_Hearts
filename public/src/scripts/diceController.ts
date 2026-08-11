import { makeDraggable } from "./dragDrop.js";
import { turn } from "./turnSystem.js"

export let currentPlayableDice = {
    owner:0,
    value:0,
    img:""

}

/*// CREATING THE DICE

const playerDiceImage = document.getElementById("player-dice") as HTMLImageElement;
const cpuDiceImage = document.getElementById("opponent-dice") as HTMLImageElement;*/

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

// FUNCTION RAND

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// FUNCTION DICE ROLL

function rollDice(): void {
    let randomDice = cardSymbolList[getRandomInt(0, cardSymbolList.length)];
    currentPlayableDice ={
        owner: turn,
        value: randomDice.value,
        img: randomDice.src
    }
}

export function generateDice(player:string):void{
    rollDice();
    const diceImg = document.createElement("img");
    diceImg.src = currentPlayableDice.img;
    diceImg.className = "dice";
    diceImg.id = `${player}-dice`;
    diceImg.alt = "";
    diceImg.draggable = true;
    makeDraggable(diceImg);
    let container = document.getElementById(`${player}-rand-item`)
    container?.appendChild(diceImg);
    console.log(diceImg)
    console.log(`${player}-rand-item`)
    console.log(container)
}

/*export function checkIfDiceCanMove():boolean{
    return turn===currentPlayableDice.owner;
}*/