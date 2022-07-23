/**
 * @description BuildingPlace Constructor
 * @param {*} image_src source to the sprite sheet
 * @param {*} image_width sprite sheet width
 * @param {*} image_height sprite sheet height
 * @param {*} px position x
 * @param {*} py position y
 * @param {*} size size of the building place
 */
import {Engine} from "../Engine.";


export class BuildingPlace {
	pozX: number;
	pozY: number;
	size: any;
	image: any;

	constructor (image: any, px: number, py: number, size: any) {
		this.pozX = px;
		this.pozY = py;
		this.size = size;
		this.image = image;
	}

	render() {
		Engine.getCanvasContext().globalAlpha = 0.5;
		Engine.getCanvasContext().drawImage(this.image,
								0 ,0, 46, 46, 
								this.pozX, this.pozY, this.size, this.size);
		Engine.getCanvasContext().globalAlpha = 1;
	}
}

