/**
 * @description Enemy constructor
 * @param {*} type type of trap
 * @param {*} startX x position
 * @param {*} startY y position
 * @param {*} sizeX x image size
 * @param {*} sizeY y image size
 */
import {Engine} from "../Engine.";

export class Trap {
	pozX: number;
	pozY: number;
	trapType: any;

	imageWidth: number;
	imageHeight: number;
	image: any;

	sw: number;
	sh: number;

	sizeX: number;
	sizeY: number;

	indX: number;
	indY: number;

	ticks: number;
	maxTicks: number;

	effect: any;
	damage: number;
	state: any;
	effectDuration: any;
	enemies: any;
	numberOfEnemies:any;
	animated: any;
	endAnimation: any;

	constructor(type: any, spr: any, startX: number, startY: number, sizeX: number, sizeY: number) {
		// position
		this.pozX = startX;
		this.pozY = startY;

		// trap type
		this.trapType = type;

		// image
		this.imageWidth = trapTypes[this.trapType]['imageWidth'];
		this.imageHeight = trapTypes[this.trapType]['imageHeight'];
		this.image = new Image(this.imageWidth, this.imageHeight);
		this.image.src = trapTypes[this.trapType]['imageSrc'];

		// sizes for a single sprite
		this.sw = trapTypes[this.trapType]['spriteWidth'];
		this.sh = trapTypes[this.trapType]['spriteHeight'];

		// trap size
		this.sizeX = sizeX;
		this.sizeY = sizeY;

		// sprite position inside the image
		this.indX = 0;
		this.indY = 0;

		this.ticks = 0;
		this.maxTicks = 1;

		this.effect = trapTypes[this.trapType]['effect'];

		this.damage = trapTypes[this.trapType]['damage'];

		this.state = trapTypes[this.trapType]['state'];

		this.effectDuration = trapTypes[this.trapType]['timeEffect'];

		this.enemies = [];

		this.numberOfEnemies = trapTypes[this.trapType]['numberOfEnemies'];

		this.animated = trapTypes[this.trapType]['animated'];

		this.endAnimation = trapTypes[this.trapType]['endAnimation'];
	}

	render() {
		Engine.getCanvasContext().drawImage(this.image,
								this.indX, this.indY, this.sw, this.sh,
								this.pozX, this.pozY, this.sizeX, this.sizeY);
	}

	//animate the trap
	updateSprite() {
		if (this.animated) {
			this.ticks += 1;
			if(this.ticks > this.maxTicks) {
				this.ticks = 0;
				this.indX += this.sw;
				this.indX %= this.image.width;
			}
		}
	}

	//applies the logic behind each trap in the current list, on the current map
	applyLogic(list: any) {
		for(let i = 0; i < list.length; i++) {
				list[i].updateSprite();
				list[i].render();
		}
	}
}

export const trapTypes: any = {
  "fire": {
    "price": 25,
    "damage": 10,
    "numberOfEnemies": 3,
    "range": 20,
    "effect": "burn",
		"timeEffect": 5,
		"state" : "active",
    "imageHeight": 100,
    "imageWidth": 1000,
    "spriteHeight": 100,
    "spriteWidth": 100,
		"animated": true,
		"endAnimation": false,
    "imageSrc": "images/traps/fire.png"
  },
  "mine": {
    "price": 25,
    "damage": 20,
    "numberOfEnemies": 1,
    "range": 50,
    "effect": "none",
		"timeEffect": 1,
		"state" : "off",
    "imageHeight": 500,
    "imageWidth": 400,
    "spriteHeight": 100,
    "spriteWidth": 100,
		"animated": true,
		"endAnimation": true,
    "imageSrc": "images/traps/mine.png"
  },
  "ice-spikes": {
    "price": 50,
    "damage": 15,
    "numberOfEnemies": 6,
    "range": 25,
    "effect": "slow",
		"timeEffect": 10,
		"state" : "active",
    "imageHeight": 100,
    "imageWidth": 500,
    "spriteHeight": 100,
    "spriteWidth": 100,
		"animated": false,
		"endAnimation": true,
    "imageSrc": "images/traps/ice_spikes.png"
  },
  "poison": {
    "price": 40,
    "damage": 10,
    "numberOfEnemies": 3,
    "range": 20,
    "effect": "poison",
		"timeEffect": 10,
		"state" : "active",
		"imageHeight": 100,
    "imageWidth": 500,
    "spriteHeight": 100,
    "spriteWidth": 100,
		"animated": true,
		"endAnimation": false,
    "imageSrc": "images/traps/poison.png"
  }
};
