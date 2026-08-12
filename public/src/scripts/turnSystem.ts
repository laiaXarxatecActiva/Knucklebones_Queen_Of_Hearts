import { generateDice } from "./diceController.js";
import { GameBoard } from "./GameBoard.js";


export let turn = 0;
let winner = -1;

let currentPlayerBoard: GameBoard | undefined;
let currentOpponentBoard : GameBoard | undefined;

export function initTurn(playerBoard:  GameBoard | undefined, opponentBoard: GameBoard | undefined){
    turn = 0;
    generateDice("player");
    currentPlayerBoard = playerBoard;
    currentOpponentBoard = opponentBoard;
    
}
export function endTurn(){
    
    if(gameHasEnded()){
        console.log("La partida ha terminado!!")
        return;
        
    }
    if(winner===-1){
        changeTurn();
    }
}


function changeTurn(){
    turn = turn===0 ? 1 : 0;
    turn===0?generateDice("player"): generateDice("opponent");
    
    
}

function gameHasEnded():Boolean{
    let currentBoard = turn===0 ? currentPlayerBoard: currentOpponentBoard;
    
    for (let col = 0; col < (currentBoard?.cells.length as number); col++) {
            
            for (let row = 0; row < (currentBoard?.cells[col].length as number); row++) {
                if(currentBoard?.cells[col][row]?.children.length as number <= 0) return false;
            }
        }
    return true;
}