import { generateDice } from "./diceController.js";
import { GameBoard } from "./GameBoard.js";
import { endGame } from "./popUp.js";

export let turn = 0;
let winner = -1;

let currentPlayerBoard: GameBoard | undefined;
let currentOpponentBoard : GameBoard | undefined;

export function initTurn(playerBoard:  GameBoard | undefined, opponentBoard: GameBoard | undefined){
    turn = 0;
    generateDice("player");
    console.log("Turno", turn)
}

export function endTurn(){
    
    if(gameHasEnded()){
        console.log("La partida ha terminado!!")
        getWinner()
        //if(winner === 0) console.log("Has ganado");
        //else if(winner === 1) console.log("La reina ha ganado")
        //else if(winner === 2) console.log("Empate")

        let won = false;
        
        if (winner === 0) won = true;
        
        endGame(won);

        return;
        
    }else {
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

function getWinner(){
    const playerPoints = Number(document.getElementById(`${currentPlayerBoard?.prefix}-score-value`)?.textContent);
    const opponentPoints = Number(document.getElementById(`${currentOpponentBoard?.prefix}-score-value`)?.textContent);
    winner= playerPoints > opponentPoints ? 0 : (playerPoints < opponentPoints ? 1 : 2)
}