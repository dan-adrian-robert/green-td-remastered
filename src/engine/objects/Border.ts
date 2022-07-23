import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Border extends Sprite {
	borderMenu: any;

	constructor (borderMenuImage: any, borderGameImage: any, sWidth: number, sHeight: number, dx: number, dy: number) {
		super(borderGameImage,0,0, sWidth, sHeight, dx, dy, sWidth, sHeight);
		this.borderMenu = borderMenuImage;
	}

	renderInMenu() {
		// Engine.draw(this.borderMenu, 0, 0, this.sizeX, this.sizeY, 0, 0, Engine.getCanvas().width, Engine.getCanvas().height);
		Engine.drawSimple(this.borderMenu,0,0, this.sizeX, this.sizeY);
	};

	renderInGame() {
		Engine.drawSimple(this.image,0,0, this.sizeX, this.sizeY);
		//Engine.draw(this.borderGame, 0, 0, this.sizeX, this.sizeY, 0, 0, Engine.getCanvas().width, Engine.getCanvas().height);
	};
}