import {Engine} from "../Engine.";
import {Enemy} from "./Enemy";

export class Hp {
	pozX: number;
	pozY: number;
	sizeX: number;
	sizeY: number;
	value: number;
	maxHpValue: number;
	hpUnit: number;

	constructor(px: number, py: number, sizeX: number, sizeY:number, value: number) {
		this.pozX = px;
		this.pozY = py;

		this.sizeX = sizeX;
		this.sizeY = sizeY;

		// the size of 5% of your hp
		this.hpUnit = this.sizeX / 20;

		this.value = value;
		this.maxHpValue = value;

		this.sizeX = sizeX;
		this.sizeY = sizeY;

		//the size of 1 hp
		this.maxHpValue = value

		this.value = value;

	}

	render(): void {
		Engine.getCanvasContext().fillStyle = "blue";
		Engine.getCanvasContext().fillRect(this.pozX, this.pozY, this.sizeX, this.sizeY);

		Engine.getCanvasContext().fillStyle = "red";
		Engine.getCanvasContext().fillRect(this.pozX, this.pozY, Math.floor((this.value / this.maxHpValue) * 20) * this.hpUnit, this.sizeY);
	}

	updatePosition(enemy: Enemy): void {
		this.pozX = enemy.px;
		this.pozY = enemy.py - 10;
	}
}
