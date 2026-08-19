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
    
    let cpuMovement= new CpuMovement(cpuTurn, board as GameBoard, humanBoard as GameBoard);
    let simulationBoards = [];
    //let bestColumn=0;
    //let diceValue = currentPlayableDice.value;
    for(let col=0; col < board.board.length; col++){
        let simulatedBoard = new SimulatedBoard(board?.prefix as string, board?.board as (number | null)[][], cpuTurn);
        let humanSimulatedBoard = new SimulatedBoard(humanBoard?.prefix as string, humanBoard?.board as (number | null)[][], 0);
        //console.log(currentPlayableDice)
        simulatedBoard.placeSimulatedDice(currentPlayableDice, col, humanSimulatedBoard);
        if(simulatedBoard.column != -1){
            simulationBoards.push(simulatedBoard);
            //console.log(humanSimulatedBoard)
            simulatedBoard.totalScore -= humanSimulatedBoard.totalScore;
        }
        

        //console.log(simulatedBoard.board);
        //console.log(simulatedBoard.totalScore);
    }
    let selectedCol=-1;
    let highestScore=-Infinity;
    let indexInSimulation = -1;

    console.log("tablas simuladas", simulationBoards)
    for(let i=0; i < simulationBoards.length; i++){
        console.log("tabla a examinar", simulationBoards[i].board)
        if(simulationBoards[i].totalScore > highestScore) {
            highestScore = simulationBoards[i].totalScore;
            selectedCol = simulationBoards[i].column;
            indexInSimulation = i;
        }else if(simulationBoards[i].totalScore === highestScore){
            selectedCol=chooseOneNumberBetweenTwo(selectedCol, simulationBoards[i].column);
            if(selectedCol === simulationBoards[i].column) indexInSimulation = i;
            //console.log(selectedCol)
            //console.log (simulationBoards[selectedCol])
            highestScore = simulationBoards[indexInSimulation].totalScore;
        }
    }
    //Simulate "thinking" time
    setTimeout(() =>{
        console.log("best column", selectedCol)
        cpuMovement.placeDice(currentPlayableDice, selectedCol);
    },1000)
    
    
}

function chooseOneNumberBetweenTwo(firstNum: number, secondNum: number): number {
    let randomNum = Math.round(Math.random())
    //return Math.floor(Math.random()) === 0 ? firstNum : secondNum;
    /*console.log(randomNum)
    console.log("random",Math.round(Math.random()))
    console.log("random",Math.round(Math.random()))
    console.log("random",Math.round(Math.random()))
    console.log("random",Math.round(Math.random()))*/
    return randomNum === 0 ? firstNum : secondNum;
}
/*
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
}*/