import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Bullet extends Sprite {
	angle: any;
	speed: number;
	effect: number;
	effect_duration: any;
	dmg: any;
	centerX: number;
	centerY: number;

	range: number;
	fps: number;
	ticks: number;

	constructor(image: any, spSizeX:number, spSizeY: number, sizeX: number, sizeY: number, px:number,
				py: number, angle: any, speed: number, dmg: any, range: number, effect: any, effect_duration: any,
				fps: number) {

		super(image, 0, 0, spSizeX, spSizeY, px, py, sizeX, sizeY);

		this.angle = angle;
		this.speed = speed;
		this.effect = effect;
		this.effect_duration = effect_duration;
		this.dmg = dmg;

		this.centerX = px;
		this.centerY = py;
		this.range = range;

		this.fps = fps;
		this.ticks = 0;
	}

	move(): void {
		this.px += Math.cos(this.angle) * this.speed;
		this.py += Math.sin(this.angle) * this.speed;
	}

	render(list: Bullet[]): void {
		for (let i = 0; i < list.length; i++) {
			const {image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY} = list[i];
			Engine.getCanvasContext().drawImage(image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY);
		}
	}

	renderRange(list: any) {
		for (let i = 0; i < list.length; i++) {
			const X = list[i].pozX + list[i].sizeX / 2;
			const Y = list[i].pozY + list[i].sizeY / 2;

			Engine.getCanvasContext().beginPath();
			Engine.getCanvasContext().arc(X, Y, list[i].sizeX/2, 0, 2 * Math.PI, false);
			Engine.getCanvasContext().stroke();
		}
	}

	moveBullets(list: Bullet[]) {
		for(let i = 0; i < list.length; i++) {
			list[i].move();
		}
	}

	removeBullets(list: Bullet[], width: number, height: number): Bullet[] {
		for(let i = 0; i < list.length; i++) {
			const rx = Math.pow(list[i].px - list[i].centerX, 2);
			const ry = Math.pow(list[i].py - list[i].centerY, 2);
			if(list[i].py > height || list[i].py < 0 ||
			   list[i].px > width || list[i].px < 0  ||
			   rx + ry > Math.pow(list[i].range,2 )) {
			 	list.splice(i, 1);
			}
		}
		return list;
	}

	applyLogic(list: Bullet[]) {
		this.moveBullets(list);
		this.render(list);
	}
}

