import { endTurn } from "./turnSystem.js";
import { currentPlayableDice } from "./diceController.js";
import { GameBoard } from "./GameBoard.js";

export function makeDraggable(item: HTMLElement): void {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", (e: DragEvent) => {
        e.dataTransfer?.setData("text/plain", item.id);
        item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    });
}

export function makeDropZone(zone: HTMLElement, gameBoard: GameBoard, otherPlayerBoard: GameBoard): void {
    zone.addEventListener("dragover", (e: DragEvent) => {
        e.preventDefault();
        zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (e: DragEvent) => {
        e.preventDefault();
        zone.classList.remove("drag-over");

        const draggedId = e.dataTransfer?.getData("text/plain");
        if (!draggedId) return;

        const draggedEl = document.getElementById(draggedId);
        if (!draggedEl) return;

        //This makes use of the addSymbol function to control the score
        // the moment the symbol is droped inside the board
        const columnElement = zone.parentElement;

        if (!columnElement) return;

        //This prevents putting the dice on the wrong board 
        if((gameBoard.prefix === "player" && currentPlayableDice.owner != 0)
        || (gameBoard.prefix === "opponent" && currentPlayableDice.owner != 1)) return;
        
        const columnId = columnElement.id;
        const columnIndex = Number(columnId.split("-").pop()) - 1;
       
        //This ensures that the dice is positioned at the highest empty cell on the selected column
        const zoneId = zone.id;
        
        const zoneCol = Number(zoneId.split("-").slice(-2, -1)[0]) -1;
        let numRows = 3;
        let zoneRow = 0;
        while(zoneRow < numRows){
                
            if((gameBoard.cells[zoneCol][zoneRow]) && ((gameBoard.cells[zoneCol][zoneRow])?.children.length as number <= 0)){
                zone = gameBoard.cells[zoneCol][zoneRow] as HTMLElement;
                break;
            }
            zoneRow++;
        }

        if (zone.children.length > 0) return;

        //This prevents putting the dice on the wrong board 
        if((gameBoard.prefix === "player" && currentPlayableDice.owner != 0)
        || (gameBoard.prefix === "opponent" && currentPlayableDice.owner != 1)) return;
        
        gameBoard.addSymbol(columnIndex, currentPlayableDice.value);
        
        zone.appendChild(draggedEl);

        draggedEl.setAttribute("draggable", "false");

        otherPlayerBoard.deleteColumnSymbols(zoneCol, currentPlayableDice.value);

        //The turn ends the moment that the dice is placed in a valid column
        endTurn();
    });
}

// because it is controlled earlier, this causes that
// the item no longer needs to be passed 

export function initDragAndDrop(dropZones: HTMLElement[], playerBoard: GameBoard, opponentBoard: GameBoard): void {
    dropZones.forEach(zone => {
        //const board = zone.id.startsWith("player-") ? playerBoard : opponentBoard;
        //makeDropZone(zone, board);
        if(zone.id.startsWith("player-")){
            makeDropZone(zone, playerBoard,opponentBoard );
        }
        else {
            makeDropZone(zone, opponentBoard, playerBoard );
        }
        
    });
}