//import { currentPlayableDice } from "./diceController";
import { GameBoard } from "./GameBoard.js";
import { endTurn, turn } from "./turnSystem.js";
import { Dice } from "./Dice.js";

export class CpuMovement {
    turn: number;
    gameBoard: GameBoard;
    otherPlayerBoard:GameBoard;
    //playerBoard: GameBoard;
    //dice: HTMLElement|undefined;
    

    constructor(turn: number, gameBoard: GameBoard, otherPlayerBoard:GameBoard/*playerBoard: GameBoard,*/ /*dice: HTMLElement */) {
        this.turn = turn;
        this.gameBoard = gameBoard;
        this.otherPlayerBoard = otherPlayerBoard;
        //this.dice = dice;
    }

    /*checkIfTurn(){
        return(this.turn == turn);
    }*/

    placeDice(dice: Dice, col:number){
        //console.log(col)
       if(col === -1) {
            endTurn();
            return;
        }
       if(dice.owner != this.turn) return;
       
        if (!this.gameBoard.cells[col]) return;

        const emptyCell = this.gameBoard.cells[col].findIndex(cell => cell?.children.length as number <= 0);
        //console.log("empty",emptyCell)
        if (emptyCell === -1) return;
        const cpuContainer = document.getElementById(`${this.gameBoard.prefix}-rand-item`);
        const diceImg = document.getElementById(`${this.gameBoard.prefix}-dice`) as HTMLImageElement;
        //console.log(diceImg)
        this.gameBoard.cells[col][emptyCell]?.appendChild(diceImg);
        cpuContainer!.innerHTML= "";
        this.gameBoard.addSymbol(col,dice.value);
        this.otherPlayerBoard.deleteColumnSymbols(col, dice.value);
        endTurn();

    }

}