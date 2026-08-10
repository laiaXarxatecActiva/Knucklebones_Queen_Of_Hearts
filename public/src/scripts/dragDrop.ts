import { endTurn } from "./turnSystem.js"

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

export function makeDropZone(zone: HTMLElement): void {
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

        zone.appendChild(draggedEl);
        endTurn();
    });
}

export function initDragAndDrop(items: HTMLElement[], dropZones: HTMLElement[]): void {
    items.forEach(makeDraggable);
    dropZones.forEach(makeDropZone);
}