import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Coin extends Sprite  {
	last_tick: number;

	constructor(image: any, sWidth: number, sHeight: number, sizeX: number, sizeY: number, px:number, py: number) {
		super(image,0,0, sWidth, sHeight, px, py, sizeX, sizeY);
		this.last_tick = performance.now() / 1000;
	}

    spin(): void {
        const current_tick = performance.now() / 1000;
        const last_tick = this.last_tick;

        if (current_tick - last_tick > 0.1) {
            this.spx += this.spSizeX;
            this.spx %= this.image.width;
            this.last_tick = current_tick;
        }
    }
	
	render(): void {
		Engine.getCanvasContext().drawImage(this.image, this.spx ,this.spy, this.spSizeX, this.spSizeX,
								this.px, this.py, this.sizeX, this.sizeY);
	}

	applyLogic(): void {
		this.spin();
		this.render();
	}
}