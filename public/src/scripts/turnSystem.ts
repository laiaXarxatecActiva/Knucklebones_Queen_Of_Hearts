import { generateDice } from "./diceController.js";



export let turn = 0;
let winner = -1;

export function initTurn(){
    turn = 0;
    generateDice("player");
    //console.log("Turno", turn)
}
export function endTurn(){
    if(winner===-1){
        changeTurn();
    }
}


function changeTurn(){
    turn = turn===0 ? 1 : 0;
    turn===0?generateDice("player"): generateDice("opponent");
    
    //console.log("Turno", turn)
}