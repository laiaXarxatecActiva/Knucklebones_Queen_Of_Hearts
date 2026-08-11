import { generateDice } from "./diceController.js";

export class GameBoard {
    container: HTMLElement;
    prefix: string;
    playerName: string;

    constructor(container: HTMLElement, prefix:string, playerName: string) {
        this.container = container;
        this.prefix = prefix;
        this.playerName = playerName;
    }

    create(): void {
        /**
         * ======== RAND SYMBOL ========
         */

        const randSymbol = document.createElement("div");
        randSymbol.className = "rand-item";
        randSymbol.id = `${this.prefix}-rand-item`;
        //generateDice(this.prefix);
        //console.log(randSymbol)
       /* const img = document.createElement("img");
        img.className = "dice";
        img.id = `${this.prefix}-dice`;
        img.alt = "";
        img.draggable = true;

        randSymbol.appendChild(img);*/

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
            pointColumn.id = `${this.prefix}-column-points-${col}`

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
        value.textContent = "0";

        score.append(total, value);

        /**
         * ======== ARRANGE BOARDS ========
         */
        
        if (this.prefix == "opponent") {
            gameBoard.append(columns, points, name);
            this.container.append(randSymbol, gameBoard, score);
        
        } else {
            gameBoard.append(name, points, columns);
            this.container.append(randSymbol, gameBoard, score)
        }
    }
}