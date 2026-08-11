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

export function makeDropZone(zone: HTMLElement, gameBoard: GameBoard): void {
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

        if (zone.children.length > 0) return;

        const columnElement = zone.parentElement;

        if (!columnElement) return;

        const columnId = columnElement.id;

        const columnIndex = Number(columnId.split("-").pop()) - 1;

        gameBoard.addSymbol(columnIndex, currentPlayableDice.value);

        zone.appendChild(draggedEl);

        draggedEl.setAttribute("draggable", "false");

        endTurn();
    });
}

export function initDragAndDrop(dropZones: HTMLElement[], playerBoard: GameBoard, opponentBoard: GameBoard): void {
    dropZones.forEach(zone => {
        const board = zone.id.startsWith("player-") ? playerBoard : opponentBoard;
        makeDropZone(zone, board);
    });
}