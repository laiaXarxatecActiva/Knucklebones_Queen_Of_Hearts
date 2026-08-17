import {CpuMovement} from "./CpuMovement.js"
import { currentPlayableDice } from "./diceController.js"
import { GameBoard } from "./GameBoard.js"
import { endTurn } from "./turnSystem.js";

const cpuTurn = 1;
let board : GameBoard | undefined;
export function cpuPlay(cpuBoard: GameBoard, playerBoard:GameBoard){
    board = cpuBoard;
    let cpuMovement= new CpuMovement(cpuTurn, board, playerBoard);
    //console.log(currentPlayableDice)
    setTimeout(() =>{
        cpuMovement.placeDice(currentPlayableDice, getRandomColumn())
    },1000)
    
    
}



function getRandomColumn(): number {
    let availableColumns = [];

    for(let i = 0; i < (board?.cells.length as number); i++){
        for(let j = 0; j < (board?.cells[i].length as number); j++){
            if(board?.cells[i][j]?.children.length as number <= 0){ 
                availableColumns.push(i);
                break;
            }
        }
    }
    if (availableColumns.length <= 0) return -1;
    
    let minCeiled = Math.ceil(0);
    let maxFloored = Math.floor(availableColumns.length);
    
    
    return availableColumns[Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)];
}