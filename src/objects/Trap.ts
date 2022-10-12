import {Engine} from "../Engine.";
import {getTrapImages, getTrapMetadataData} from "../config/Traps";
import {TRAP_METADATA, TRAP_TYPE} from "../types/types";
import {Sprite} from "./Sprite";
import {Enemy} from "./Enemy";

export class Trap extends Sprite {
	type: TRAP_TYPE;
	ticks: number;
	maxTicks: number;
	effect: any;
	damage: number;
	state: any;
	effectDuration: number;
	enemies: Enemy[];
	numberOfEnemies: number;
	animated: boolean;
	endAnimation: boolean;

	constructor(type: TRAP_TYPE, spr: any, px: number, py: number, sizeX: number, sizeY: number) {
		const trapMetadata:TRAP_METADATA = getTrapMetadataData(type);
		const image =getTrapImages(Engine.getImageMap(), trapMetadata.imageType);
		super(image,0,0 , trapMetadata.spriteWidth, trapMetadata.spriteHeight, px, py, sizeX, sizeY );

		this.type = type;
		this.ticks = 0;
		this.maxTicks = 1;

		this.effect = trapMetadata.effect;
		this.damage = trapMetadata.damage;
		this.state = trapMetadata.state;
		this.effectDuration = trapMetadata.timeEffect;
		this.numberOfEnemies = trapMetadata.numberOfEnemies;
		this.animated = trapMetadata.animated;

		this.endAnimation = trapMetadata.endAnimation;
		this.enemies = [];
	}

	render(): void {
		Engine.getCanvasContext().drawImage(
			this.image, this.spx, this.spy, this.spSizeX, this.spSizeY, this.px, this.py, this.sizeX, this.sizeY
		);
	}

	updateSprite() {
		if (this.animated) {
			this.ticks += 1;
			if (this.ticks > this.maxTicks) {
				this.ticks = 0;
				this.spx += this.spSizeX;
				this.spx %= this.image.width;
			}
		}
	}

	applyLogic(list: any) {
		for (let i = 0; i < list.length; i++) {
				list[i].updateSprite();
				list[i].render();
		}
	}
}