import { generateDice } from "./diceController.js";
import { GameBoard } from "./GameBoard.js";
import { endGame } from "./popUp.js";
import { cpuPlay } from "./cpuController.js";

export let turn = 0;
let winner = -1;

let currentPlayerBoard: GameBoard | undefined;
let currentOpponentBoard : GameBoard | undefined;

export function initTurn(playerBoard:  GameBoard | undefined, opponentBoard: GameBoard | undefined){
    turn = 0;
    currentPlayerBoard = playerBoard;
    currentOpponentBoard = opponentBoard;    
    generateDice("player");
    updateTurnIndicator();
}

export function restartTurn() {
    turn = 0;
    winner = -1;

    const opponentRand = document.getElementById('opponent-rand-item');
    if (opponentRand) opponentRand.innerHTML = '';

    generateDice("player");
    updateTurnIndicator();
}

export function endTurn(){
    
    if(gameHasEnded()){
        console.log("La partida ha terminado!!")
        getWinner()
        
        
        endGame(winner);

        return;
        
    }else {
        changeTurn();
    }
}

function changeTurn(){
    turn = turn===0 ? 1 : 0;
     
    if (turn===0)generateDice("player");
    else  {
        generateDice("opponent");
        cpuPlay(currentOpponentBoard as GameBoard, currentPlayerBoard as GameBoard);
    }
    updateTurnIndicator();
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

export function updateTurnIndicator(): void {
    const playerName = document.getElementById('player-name');
    const opponentName = document.getElementById('opponent-name');
    
    playerName?.classList.toggle('active-turn', turn == 0);
    opponentName?.classList.toggle('active-turn', turn == 1);
}