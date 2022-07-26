import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";


export class BuildingPlace extends Sprite {
	constructor (image: any, spSize:number, px: number, py: number, size: number) {
		super(image, 0, 0, spSize, spSize, px, py, size, size);
	}

	render(): void {
		Engine.getCanvasContext().globalAlpha = 0.5;
		Engine.getCanvasContext().drawImage(this.image, 0 ,0, 46, 46, this.px, this.py, this.sizeX, this.sizeY);
		Engine.getCanvasContext().globalAlpha = 1;
	}
}

