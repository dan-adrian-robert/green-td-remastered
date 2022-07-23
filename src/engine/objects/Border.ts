/**
 * @description Border Constructor
 * @param {*} image_menu_src border sprite sheet path
 * @param {*} image_game_src game sprite sheet path
 * @param {*} image_width width value
 * @param {*} image_height height value
 * @param {*} sx size x
 * @param {*} sy size y
 */
import {Engine} from "../Engine.";


export class Border {
	borderMenu: any;
	borderGame: any;
	sizeX: number;
	sizeY: number;

	sx: number;
	sy: number;

	constructor (borderMenuImage: any, borderGameImage: any, sizeX: number, sizeY: number, sx: number, sy: number) {
		this.borderMenu = borderMenuImage;
		this.borderGame = borderGameImage;

		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.sx = sx;
		this.sy = sy;
	}

	renderInMenu() {
		// Engine.draw(this.borderMenu, 0, 0, this.sizeX, this.sizeY, 0, 0, Engine.getCanvas().width, Engine.getCanvas().height);
		Engine.drawSimple(this.borderMenu,0,0,this.sizeX,this.sizeY);
	};

	renderInGame() {
		Engine.drawSimple(this.borderGame,0,0,this.sizeX,this.sizeY);
		//Engine.draw(this.borderGame, 0, 0, this.sizeX, this.sizeY, 0, 0, Engine.getCanvas().width, Engine.getCanvas().height);
	};
}