import { Dice } from "../Dice.js";
import { ScoreSystem } from "../ScoreSystem.js";

export class SimulatedBoard {
    //container: HTMLElement;
    prefix: string;
    board: (number | null)[][];
    scoreSystem: ScoreSystem;
    totalScore:number;
    turn: number;
    column:number;

    constructor(prefix:string, board: (number | null)[][], turn: number) {
        //this.container = container;
        this.prefix = prefix;
        //this.playerName = playerName;
        //This is meant to control the columns and the cells of the board
        this.board = JSON.parse(JSON.stringify(board));
        //This will be used to control the score. 
        this.scoreSystem = new ScoreSystem();
        this.totalScore= this.scoreSystem.calculateTotalScore(this.board);
        this.turn = turn;
        this.column = -1;
    }


    // Control Symbols on the board and how this affects Scores
    addSymbol(columnIndex: number, value: number): number {
        if (!this.board[columnIndex]) return -1;
        
        
        const emptyCell = this.board[columnIndex].findIndex(cell => cell === null);
        
        if (emptyCell === -1) return -1;
        //console.log(this.board[columnIndex][emptyCell])
        this.board[columnIndex][emptyCell] = value;
        
        //console.log("emptyCell", emptyCell)
        //console.log("value",value)
        //console.log("new",this.board)
        //console.log(this.board[columnIndex])
        this.totalScore= this.scoreSystem.calculateTotalScore(this.board);
        return 0;
    }
   /* updateTotalScore(): number {
        
        // This is the  total score of all the board
        const totalScore = this.scoreSystem.calculateTotalScore(this.board);
        
        return totalScore;
    }*/

    deleteColumnSymbols(column: number, value: number ):void{
        
        for(let i = 0; i < this.board[column].length; i++){
            if (this.board[column][i] === value){
                
                this.board[column][i] = null;

            }
        }
        this.reorderColumn(column);
        this.totalScore= this.scoreSystem.calculateTotalScore(this.board);
    }

    //This reorders a given column if some of its elements get deleted
    reorderColumn(column:number):void{
        let firstRowWithNoValue = -1;
        for (let row = 0; row < this.board[column].length; row++){
                if(this.board[column][row] === null) 
                {
                    if(firstRowWithNoValue === -1) firstRowWithNoValue = row;
                }
                else if(firstRowWithNoValue != -1){
    
                    this.board[column][firstRowWithNoValue] = this.board[column][row];
                    this.board[column][row] = null;
                    firstRowWithNoValue = row;
                    row = firstRowWithNoValue;
                }
                
                
            }
    }
    placeSimulatedDice(dice: Dice, col:number, opponentSimBoard: SimulatedBoard){
        if(col === -1) {
            return;
        }
       if(dice.owner != this.turn) return;
       
        /*if (!this.gameBoard.cells[col]) return;

        const emptyCell = this.gameBoard.cells[col].findIndex(cell => cell?.children.length as number <= 0);
       
        if (emptyCell === -1) return;*/
        //const cpuContainer = document.getElementById(`${this.gameBoard.prefix}-rand-item`);
        //const diceImg = document.getElementById(`${this.gameBoard.prefix}-dice`) as HTMLImageElement;
        
        //this.gameBoard.cells[col][emptyCell]?.appendChild(diceImg);
        //cpuContainer!.innerHTML= "";
        if(this.addSymbol(col,dice.value) != 0) return;
        opponentSimBoard.deleteColumnSymbols(col, dice.value);
        this.column = col;
        
    }

}