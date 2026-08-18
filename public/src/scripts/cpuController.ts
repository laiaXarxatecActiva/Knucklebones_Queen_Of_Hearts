import {CpuMovement} from "./CpuMovement.js"
import { currentPlayableDice } from "./diceController.js"
import { GameBoard } from "./GameBoard.js"
import { SimulatedBoard } from "./cpuBehaviour/SimulatedBoard.js";

const cpuTurn = 1;
let board : GameBoard | undefined;
let humanBoard : GameBoard | undefined;
export function cpuPlay(cpuBoard: GameBoard, playerBoard:GameBoard){
    board = cpuBoard;
    humanBoard = playerBoard;
    //console.log(playerBoard)
    //console.log(board)
    /*let cpuMovement= new CpuMovement(cpuTurn, board, playerBoard);
    //Simulate "thinking" time
    setTimeout(() =>{
        cpuMovement.placeDice(currentPlayableDice, getRandomColumn())
    },1000)*/
    let cpuMovement= new CpuMovement(cpuTurn, board as GameBoard, humanBoard as GameBoard);
    let simulationBoards = [];
    //let bestColumn=0;
    //let diceValue = currentPlayableDice.value;
    for(let col=0; col < board.board.length; col++){
        let simulatedBoard = new SimulatedBoard(board?.prefix as string, board?.board as (number | null)[][], cpuTurn);
        console.log(currentPlayableDice)
        simulatedBoard.placeSimulatedDice(currentPlayableDice, col);
        simulationBoards.push(simulatedBoard);

        console.log(simulatedBoard.board);
        console.log(simulatedBoard.totalScore);
    }
    let selectedCol=-1;
    let highestScore=0;
    for(let i=0; i < simulationBoards.length; i++){
        if(simulationBoards[i].totalScore > highestScore) {
            highestScore = simulationBoards[i].totalScore;
            selectedCol = simulationBoards[i].column;
        }

    }
    cpuMovement.placeDice(currentPlayableDice, selectedCol);
    
}

/*function thinkStrategy(){
    let cpuMovement= new CpuMovement(cpuTurn, board as GameBoard, humanBoard as GameBoard);
    let simulationBoards = [];

    
    /*let simulatedBoard = new SimulatedBoard(board?.prefix as string, board?.board as (number | null)[][]);
    console.log(simulatedBoard.board);
    console.log(simulatedBoard.totalScore);

    let randColumn = getRandomColumn()*/
    //Simulate "thinking" time
    /*setTimeout(() =>{
        cpuMovement.placeDice(currentPlayableDice, randColumn)
        simulatedBoard.board=board?.board as (number | null)[][]
        simulatedBoard.addSymbol(randColumn, 10)
    console.log(simulatedBoard.board);
    console.log(simulatedBoard.totalScore);
    },1000)
    
}*/

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