


const PIKE ={
    "value":0,
    "src": "public/src/imgs/pike.png"
}
const CLUB ={
    "value":0,
    "src": "public/src/imgs/club.png"
}
const HEART ={
    "value":0,
    "src": "public/src/imgs/heart.png"
}
const DIAMOND ={
    "value":0,
    "src": "public/src/imgs/diamond.png"
}
const QUEEN = {
    "value": 0,
    "src": "public/src/imgs/queen_crown.png"
}
const JOKER = {
    "value": 0,
    "src": "public/src/imgs/joker.png"
}

function getRandomInt(min:number, max:number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
const cardSymbolList = [PIKE, CLUB, HEART, DIAMOND, QUEEN, JOKER]

var playerDiceImage = document.getElementById("playerDice") as HTMLImageElement;
var cpuDiceImage = document.getElementById("cpuDice") as HTMLImageElement;

function rollDice(dice:HTMLImageElement)
{
    dice.src = cardSymbolList[getRandomInt(0,cardSymbolList.length)].src
}


rollDice(playerDiceImage)
rollDice(cpuDiceImage)