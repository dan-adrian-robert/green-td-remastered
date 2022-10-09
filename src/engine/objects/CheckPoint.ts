import {Engine} from "../Engine.";
import {Direction} from "../../types/types";

export class CheckPoint {
	x: number;
	y: number;
	size: number;
	dir: Direction;
	final: boolean;
	id: number;

	constructor(px: number, py: number, size: any, direction: Direction, id: number = 0, final: boolean = false) {
		this.x = px;
		this.y = py;
		this.size = size;
		this.dir = direction;
		this.final = final;
		this.id = id;
	}

	render(index: number): void {
		Engine.getCanvasContext().fillStyle = 'red';
		Engine.getCanvasContext().fillRect(this.x, this.y, this.size, this.size);
		Engine.getCanvasContext().fillStyle = 'black';
		Engine.getCanvasContext().fillText(`${index}`, this.x, this.y + 20);
	}
}
