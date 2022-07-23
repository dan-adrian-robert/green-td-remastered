/**
 * @description Bullet Constructor
 * @param {*} image_src source to the sprite sheet
 * @param {*} image_width sprite sheet width
 * @param {*} image_height sprite sheet height
 * @param {*} sizeX x size
 * @param {*} sizeY y size
 * @param {*} startX  x position
 * @param {*} startY y position
 * @param {*} angle bullet angle
 * @param {*} speed bullet speed
 * @param {*} dmg damage
 * @param {*} range range
 * @param {*} effect effect to add on bullet
 * @param {*} effect_duration duration of the effect
 * @param {*} fps number of frames per second
 */
import {Engine} from "../Engine.";


export class Bullet {
	pozX: number;
	pozY: number;
	sizeX: number;
	sizeY: number;
	angle: any;
	speed: number;
	effect: number;
	effect_duration: any;
	dmg: any;
	image: any;
	centerX: number;
	centerY: number;

	range: number;
	fps: number;
	ticks: number;

	constructor(image: any, image_width:number, image_height: number, sizeX: number, sizeY: number, startX:number,
				startY: number, angle: any, speed: number, dmg: any, range: number, effect: any, effect_duration: any,
				fps: number) {
		//position
		this.pozX = startX;
		this.pozY = startY;

		//size
		this.sizeX = sizeX;
		this.sizeY = sizeY;

		//attributes
		this.angle = angle;
		this.speed = speed;
		this.effect = effect;
		this.effect_duration = effect_duration;
		this.dmg = dmg;

		this.image = image;

		this.sizeX = image_width;
		this.sizeY = image_height;

		this.centerX = startX;
		this.centerY = startY;
		this.range = range;

		this.fps = fps;
		this.ticks = 0;
	}

	//updates the current position of the enemy
	move() {
		this.pozX += Math.cos(this.angle) * this.speed;
		this.pozY += Math.sin(this.angle) * this.speed;
	}

	render(list: any) {
		for (let i = 0; i < list.length; i++) {
			Engine.getCanvasContext().drawImage(list[i].image, list[i].pozX, list[i].pozY, list[i].sizeX, list[i].sizeY);
		}
	}

	//render the collision range of the bullet
	renderRange(list: any) {
		for(var i = 0; i < list.length; i++){
			var X = list[i].pozX + list[i].sizeX / 2;
			var Y = list[i].pozY + list[i].sizeY / 2;

			Engine.getCanvasContext().beginPath();
			Engine.getCanvasContext().arc(X, Y, list[i].sizeX/2, 0, 2 * Math.PI, false);
			Engine.getCanvasContext().stroke();
		}
	}

	//calls the move function to each bullet in the list
	moveBullets(list: any) {
		for(let i = 0; i < list.length; i++) {
			list[i].move();
		}
	}

	/* Removes the bullets if they are outside the canvas 
	 * @list - bullet list
	 * @width - canvas width
	 * @height - canvas height
	 */
	removeBullets(list: any, width: number, height: number) {
		for(let i = 0; i < list.length; i++) {
			const rx = Math.pow(list[i].pozX - list[i].centerX, 2);
			const ry = Math.pow(list[i].pozY - list[i].centerY, 2);
			if(list[i].pozY > height || list[i].pozY < 0 ||
			   list[i].pozX > width || list[i].pozX < 0  || 
			   rx + ry > Math.pow(list[i].range,2 )) {
			 	list.splice(i, 1);
			}
		}
		return list;
	}

	//applies all the logic behind the bullets in the list
	applyLogic(list: any) {
		this.moveBullets(list);
		this.render(list);
	}
}

