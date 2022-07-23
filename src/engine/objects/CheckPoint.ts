/**
 * @description Tower CheckPoints
 * @param {*} px position on Ox
 * @param {*} py position on Oy
 * @param {*} size size
 * @param {*} direction direction of checkpoint when activated
 * @param {*} final ?? why is this here?
 */
import {Engine} from "../Engine.";


export class CheckPoint {
	x: number;
	y: number;
	size: number;
	dir: any;
	final: any;
	id: any;

	constructor(px: number, py: number, size: any, direction: any, id: any, final: any = null) {
		this.x = px;
		this.y = py;
		this.size = size;
		this.dir = direction;
		this.final = final;
		this.id = id;
	}

	render(index: number) {
		Engine.getCanvasContext().fillStyle = 'red';
		Engine.getCanvasContext().fillRect(this.x, this.y, this.size, this.size);
		Engine.getCanvasContext().fillStyle = 'black';
		Engine.getCanvasContext().fillText(`${index}`, this.x, this.y + 20);
	}
}