import { ScoreSystem } from "./ScoreSystem.js";

export class GameBoard {
    container: HTMLElement;
    prefix: string;
    playerName: string;
    board: (number | null)[][];
    scoreSystem: ScoreSystem;
    cells: (HTMLDivElement | null)[][];

    constructor(container: HTMLElement, prefix:string, playerName: string) {
        this.container = container;
        this.prefix = prefix;
        this.playerName = playerName;
        //This is meant to control the columns and the cells of the board, initially empty
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        //This will be used to control the score. 
        this.scoreSystem = new ScoreSystem();

        //This stores every div of every cell on the board
        this.cells=[
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    // Create the Board
    create(): void {
        /**
         * ======== RAND SYMBOL ========
         */

        const randSymbol = document.createElement("div");
        randSymbol.className = "rand-item";
        randSymbol.id = `${this.prefix}-rand-item`;

        /**
         * ======== GAME BOARD ========
         */

        const gameBoard = document.createElement("div");
        gameBoard.className = "game-board";
        gameBoard.id = `${this.prefix}-game-board`;

        /**
         * ======== COLUMNS ========
         */

        const columns = document.createElement("div");
        columns.className = "columns";
        columns.id = `${this.prefix}-columns`;

        for (let col = 1; col <= 3; col++) {
            const column = document.createElement("div");
            column.className = "column";
            column.id = `${this.prefix}-column-${col}`;
            
            for (let row = 1; row <= 3; row++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.id = `${this.prefix}-cell-${col}-${row}`;

                column.appendChild(cell);
                this.cells[col -1][row-1] = cell;
            }

            columns.appendChild(column);
        }
        
        /**
         * ======== COLUMN'S POINTS ========
         */

        const points = document.createElement("div");
        points.className = "points";
        points.id = `${this.prefix}-points`;

        for (let col = 1; col <= 3; col++) {
            const pointColumn = document.createElement("div");
            pointColumn.className = "column-points";
            pointColumn.id = `${this.prefix}-column-points-${col}`;

            const p = document.createElement("p");
            p.textContent = "0";

            pointColumn.appendChild(p);
            points.appendChild(pointColumn);
        }

        /**
         * ======== NAME ========
         */

        const name = document.createElement("div");
        name.className = "name";
        name.id = `${this.prefix}-name`;

        const nameText = document.createElement("p");
        nameText.textContent = this.playerName;

        name.appendChild(nameText);

        /**
         * ======== SCORE ========
         */

        const score = document.createElement("div");
        score.className = "score";
        score.id = `${this.prefix}-score`;

        const total = document.createElement("p");
        total.textContent = "Total:";

        const value = document.createElement("span");
        value.id = `${this.prefix}-score-value`;
        value.textContent = "0";

        score.append(total, value);

        /**
         * ======== ARRANGE BOARDS ========
         */

        if (this.prefix === "opponent") {
            gameBoard.append(columns, points, name);
            this.container.append(randSymbol, gameBoard, score);
        } else {
            gameBoard.append(name, points, columns);
            this.container.append(randSymbol, gameBoard, score);
        }
    }

    // Control Symbols on the board and how this affects Scores
    addSymbol(columnIndex: number, value: number): void {
        const column = this.board[columnIndex];
        if (!column) return;

        const emptyCell = column.findIndex(cell => cell === null);
        if (emptyCell === -1) return;

        column[emptyCell] = value;

        this.updateScoreDisplay();
    }

    // Ensures the Scores displayed is the correct one acording to 
    // the symbols on the board
    updateScoreDisplay(): void {
        // This is the score of a column acording to the symbols
        const columnScores = this.scoreSystem.calculateAllColumnScores(this.board);
        // This is the  total score of all the board
        const totalScore = this.scoreSystem.calculateTotalScore(this.board);
        
        // This reviews the score of the columns and ensures to update it.
        columnScores.forEach((score, index) => {
            const pointColumn = document.getElementById(`${this.prefix}-column-points-${index + 1}`);
            const scoreElement = pointColumn?.querySelector("p");
            if (scoreElement) scoreElement.textContent = score.toString();
        });

        // This controls the total score
        const totalElement = document.querySelector(`#${this.prefix}-score span`);
        if (totalElement) totalElement.textContent = totalScore.toString();
    }

    deleteColumnSymbols(column: number, value: number ):void{
        for(let i = 0; i < this.board[column].length; i++){
            if (this.board[column][i] === value){
                console.log(this.cells[column][i])
                this.cells[column][i]!.innerHTML = '';
                this.board[column][i] = null;
            }
        }

        this.updateScoreDisplay();
    }
}