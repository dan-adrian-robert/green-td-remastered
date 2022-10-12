import {Engine} from "../Engine.";
import {RoadAttribute} from "../types/types";
import {CheckPoint} from "./CheckPoint";

export class GameMap {
	image: any;
	checkPoints: CheckPoint[];

	constructor(mapImage:any, image_width: number, image_height:number) {
		this.image = mapImage;
		this.checkPoints = [];
	}

	render() {
		const sx = Engine.getBorder().px;
		const sy = Engine.getBorder().py;
		const fx = Engine.getCanvas().width / 100 * 78 - 2 * sx;
		const fy = Engine.getCanvas().height - 2 * sy;
		Engine.getCanvasContext().drawImage(this.image, 0, 0, this.image.width, this.image.height, sx, sy, fx, fy);
	}

	getCheckPoints():CheckPoint[] {
		return this.checkPoints;
	}

	addCheckPoints(cp: CheckPoint) {
		this.checkPoints.push(cp);
	}

	renderCheckPoints() {
		for (let i = 0; i < this.checkPoints.length; i++) {
			this.checkPoints[i].render(i);
		}
	}

	getCp(index: number): CheckPoint {
		//TODO add check for index out of bounds
		return this.checkPoints[index];
	}
}

export const roadAttributes: RoadAttribute[] = [
	{x: 70,   y: 138,  sizeX: 221, sizeY: 30},
	{x: 264,  y: 180,  sizeX: 28,  sizeY: 80},
	{x: 306,  y: 235,  sizeX: 110, sizeY: 29},
	{x: 391,  y: 75,   sizeX: 30,  sizeY: 135},
	{x: 435,  y: 75,   sizeX: 110, sizeY: 30},
	{x: 520,  y: 120,  sizeX: 30,  sizeY: 115},
	{x: 560,  y: 199,  sizeX: 60,  sizeY:  30},
	{x: 140,  y: 330,  sizeX: 30,  sizeY: 120},
	{x: 171,  y: 331,  sizeX: 190, sizeY: 28},
	{x: 335,  y: 365,  sizeX: 30,  sizeY: 80},
	{x: 380,  y: 415,  sizeX: 155, sizeY: 30},
	{x: 520,  y: 245,  sizeX: 28,  sizeY: 135}
];
