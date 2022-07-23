/**
 * @description HP Constructor
 * @param {*} px position Ox
 * @param {*} py position Oy
 * @param {*} sizeX Size for Ox
 * @param {*} sizeY Size for Oy
 * @param {*} value Hp value
 */
import {Engine} from "../Engine.";

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

	//render the hp bar
	render() {
		Engine.getCanvasContext().fillStyle = "red";
		Engine.getCanvasContext().fillRect(this.pozX, this.pozY, this.hpSize * this.value , this.sizeY);
	}

	//place the hp bar above the enemy with 10 px
	updatePosition(enemy: any) {
		this.pozX = enemy.pozX;
		this.pozY = enemy.pozY - 10;
	}
}
