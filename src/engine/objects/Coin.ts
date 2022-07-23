/**
 * @description Coin object
 * @param {*} image_src file path to image source
 * @param {*} image_width image width
 * @param {*} image_height image height
 * @param {*} sprite_width sprite width from the image
 * @param {*} sprite_height sprite height from the image
 * @param {*} sizeX sizeX of sprite
 * @param {*} sizeY sizeY of sprite
 * @param {*} startX where to start from on Ox
 * @param {*} startY where to start from on Oy
 */
import {Engine} from "../Engine.";

export class Coin {
	image: any;
	sw: number;
	sh: number;

	sizeX: number;
	sizeY: number;
	startX: number;
	startY: number;
	indX: number;
	indY: number;

	last_tick: number;

	constructor(image: any, sprite_width: number, sprite_height: number, sizeX: number, sizeY: number, startX:number, startY: number) {
		this.image = image;

		this.sw = sprite_width;
		this.sh = sprite_height;

		this.sizeX = sizeX;
		this.sizeY = sizeY;

		this.startX = startX;
		this.startY = startY;

		this.indX = 0;
		this.indY = 0;

		this.last_tick = performance.now() / 1000;
	}
    spin() {
        const current_tick = performance.now() / 1000;
        const last_tick = this.last_tick;

        if (current_tick - last_tick > 0.1) {
            this.indX += this.sw;
            this.indX %= this.image.width;
            this.last_tick = current_tick;
        }
    }
	
	render() {
		Engine.getCanvasContext().drawImage(this.image,
								this.indX ,this.indY, this.sw, this.sh,
								this.startX, this.startY, this.sizeX, this.sizeY);
	}

	applyLogic () {
		this.spin();
		this.render();
	}
}