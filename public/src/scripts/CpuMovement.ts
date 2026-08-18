
import { GameBoard } from "./GameBoard.js";
import { endTurn, turn } from "./turnSystem.js";
import { Dice } from "./Dice.js";

export class CpuMovement {
    turn: number;
    gameBoard: GameBoard;
    otherPlayerBoard:GameBoard;
 
    

    constructor(turn: number, gameBoard: GameBoard, otherPlayerBoard:GameBoard) {
        this.turn = turn;
        this.gameBoard = gameBoard;
        this.otherPlayerBoard = otherPlayerBoard;
     
    }

    
    placeDice(dice: Dice, col:number){
       
       if(col === -1) {
            endTurn();
            return;
        }
       if(dice.owner != this.turn) return;
       
        if (!this.gameBoard.cells[col]) return;

        const emptyCell = this.gameBoard.cells[col].findIndex(cell => cell?.children.length as number <= 0);
       
        if (emptyCell === -1) return;
        const cpuContainer = document.getElementById(`${this.gameBoard.prefix}-rand-item`);
        const diceImg = document.getElementById(`${this.gameBoard.prefix}-dice`) as HTMLImageElement;
        
        this.gameBoard.cells[col][emptyCell]?.appendChild(diceImg);
        cpuContainer!.innerHTML= "";
        this.gameBoard.addSymbol(col,dice.value);
        this.otherPlayerBoard.deleteColumnSymbols(col, dice.value);
        endTurn();

    }

    

}