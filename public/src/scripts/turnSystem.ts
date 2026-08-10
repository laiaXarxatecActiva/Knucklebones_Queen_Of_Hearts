let turn = 0;
let winner = -1;
console.log("Turno", turn)

export function endTurn(){
    if(winner===-1){
        changeTurn();
    }
}
function changeTurn(){
    turn = turn===0 ? 1 : 0;
    console.log("Turno", turn)
}