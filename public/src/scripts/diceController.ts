import { makeDraggable } from "./dragDrop.js";
import { turn } from "./turnSystem.js"
import { Dice } from "./Dice.js";


export let currentPlayableDice = new Dice(0, 0, "");

/*// CREATING THE DICE

const playerDiceImage = document.getElementById("player-dice") as HTMLImageElement;
const cpuDiceImage = document.getElementById("opponent-dice") as HTMLImageElement;*/

// CREATING CARD SYMBOLS

const DIAMOND = {
    value:1,
    src: "public/src/imgs/diamond.png"
};

const CLUB = {
    value:3,
    src: "public/src/imgs/club.png"
};

const HEART = {
    value:2,
    src: "public/src/imgs/heart.png"
};

const PIKE = {
    value:4,
    src: "public/src/imgs/pike.png"
};

const JOKER = {
    value: 5,
    src: "public/src/imgs/joker.png"
};

const QUEEN = {
    value: 6,
    src: "public/src/imgs/queen_crown.png"
};

const cardSymbolList = [DIAMOND, CLUB, HEART, PIKE, JOKER, QUEEN];

// FUNCTION RAND

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// FUNCTION DICE ROLL

function rollDice(): void {
    let randomDice = cardSymbolList[getRandomInt(0, cardSymbolList.length)];
    
   currentPlayableDice.owner = turn;
   currentPlayableDice.value = randomDice.value;
   currentPlayableDice.img = randomDice.src;
}

export function generateDice(player:string):void{
    rollDice();
    const diceImg = document.createElement("img");
    diceImg.src = currentPlayableDice.img;
    diceImg.className = "dice";
    diceImg.id = `${player}-dice`;
    diceImg.alt = "";
    if(player==="player"){
        diceImg.draggable = true;
        makeDraggable(diceImg);
    }
    

    const container = document.getElementById(`${player}-rand-item`);

    if (container) {
        container.innerHTML = '';
        container.appendChild(diceImg);
    }

}

