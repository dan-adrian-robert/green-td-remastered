import {Engine} from "../Engine.";
import {Enemy} from "./Enemy";

export class Hp {
	pozX: number;
	pozY: number;
	sizeX: number;
	sizeY: number;
	hpSize: number;
	value: number;

	constructor(px: number, py: number, sizeX: number, sizeY:number, value: number) {
		//position
		this.pozX = px;
		this.pozY = py;

		//size
		this.sizeX = sizeX;
		this.sizeY = sizeY;

		//the size of 1 hp
		this.hpSize = Math.floor(sizeX / value) === 0? Math.ceil(sizeX / value)/10: Math.floor(sizeX / value);

		//the current hp
		this.value = value;

	}

	render(): void {
		Engine.getCanvasContext().fillStyle = "red";
		Engine.getCanvasContext().fillRect(this.pozX, this.pozY, this.hpSize * this.value , this.sizeY);
	}

	updatePosition(enemy: Enemy): void {
		this.pozX = enemy.px;
		this.pozY = enemy.py - 10;
	}
}
