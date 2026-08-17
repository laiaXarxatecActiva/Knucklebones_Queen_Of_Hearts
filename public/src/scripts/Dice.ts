export class Dice {
    owner:number;
    value:number;
    img:string;
    constructor(owner: number, value: number, img:string){
        this.owner = owner;
        this.value = value;
        this.img = img;
    }
}