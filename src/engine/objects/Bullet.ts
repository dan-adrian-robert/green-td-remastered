import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";
import {BULLET_EFFECT} from "../../types";

export class Bullet extends Sprite {
	angle: number;
	speed: number;
	effect: BULLET_EFFECT;
	effectDuration: number;
	dmg: number;
	centerX: number;
	centerY: number;

	range: number;
	ticks: number;

	constructor(image: any, spSizeX:number, spSizeY: number, sizeX: number, sizeY: number, px:number,
				py: number, angle: number, speed: number, dmg: number, range: number, effect: BULLET_EFFECT,
				effectDuration: number) {

		super(image, 0, 0, spSizeX, spSizeY, px, py, sizeX, sizeY);

		this.angle = angle;
		this.speed = speed;
		this.effect = effect;
		this.effectDuration = effectDuration;
		this.dmg = dmg;

		this.centerX = px;
		this.centerY = py;
		this.range = range;

		this.ticks = 0;
	}

	move(): void {
		this.px += Math.cos(this.angle) * this.speed;
		this.py += Math.sin(this.angle) * this.speed;
	}

	render(): void {
		const {image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY} = this;
		Engine.getCanvasContext().drawImage(image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY);
	}
}

