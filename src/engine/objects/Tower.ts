/**
 * @description Tower Constructor
 * @param {*} type tower type
 * @param {*} startX x poz
 * @param {*} startY y poz
 * @param {*} sizeX tower x size
 * @param {*} sizeY tower y size
 * @param {*} fps the current game frame per second
 */
import {Bullet} from "./Bullet";
import {Engine} from "../Engine.";
import {FOLDER_PATHS} from "../../imageTypes";
import {Enemy} from "./Enemy";

export class Tower {

	towerType: any;
	pozX: number;
	pozY: number;
	sizeX: number;
	sizeY: number;

	indX: number;
	indY: number;

	spriteIndex: number;

	image_height: number;
	image_width: number;
	image: any;

	sw: number;
	sh: number;

	upgradeTypes: any[];

	fireSound: any;
	rangeImage: any;
	fps: number;
	dmg: number;
	fireRate: number;
	range: any;
	bulletType: any;
	tick: any;
	angle: any;
	enemysInRange: any;
	bulletSpeed: any;


	constructor(type: any, spr: any, startX: number, startY: number, sizeX: number, sizeY: number, fps: number) {
		this.towerType = type;

		//tower position
		this.pozX = startX;
		this.pozY = startY;

		//tower size
		this.sizeX = sizeX;
		this.sizeY = sizeY;

		//sprite position inside the image
		this.indX = 0;
		this.indY = 0;

		//position of the current sprite along the x axis
		this.spriteIndex = 0;

		this.image_height = towerTypes[this.towerType]['image-height'];
		this.image_width = towerTypes[this.towerType]['image-width'];

		switch (this.towerType) {
			case 'magma-tower':
				this.image = Engine.getImageMap()[FOLDER_PATHS.TOWERS].towersV1;
				break;
			case 'frost-tower':
				this.image = Engine.getImageMap()[FOLDER_PATHS.TOWERS].frostTower;
				break;
			case 'cannon-tower':
				this.image = Engine.getImageMap()[FOLDER_PATHS.TOWERS].cannonTower;
				break;
			case 'boulder-tower':
				this.image = Engine.getImageMap()[FOLDER_PATHS.TOWERS].boulderTower;
				break;
		}

		// this.image = new Image(this.image_width, this.image_height);
		// this.image.src = towerTypes[this.towerType]['image-src'];

		//sizes for a single sprite
		this.sw = towerTypes[this.towerType]['sprite-width'];
		this.sh = towerTypes[this.towerType]['sprite-height'];

		// firate/10 = nr sec until u can shoot again
		this.fireRate =  towerTypes[this.towerType]['fire-rate'];

		//tower shooting range
		this.range =  towerTypes[this.towerType]['range'];

		this.bulletType = towerTypes[this.towerType]['bullet-type'];
		this.tick = 0;
		this.angle = 0;
		this.enemysInRange = [];
		this.bulletSpeed = bulletTypes[this.bulletType]['bullet-speed'];
		this.fps = fps;
		this.dmg = bulletTypes[this.bulletType]['damage'];


		this.rangeImage = new Image(230,230);
		this.rangeImage.src = ('images/ui/range.png');

		this.fireSound = new Audio();
		this.fireSound.volume = 0.1;
		this.fireSound.src = 'sound/towers/ArcherShoot.wav';

		this.upgradeTypes = [
			{type:'range',    price: 25,  cost:17,  value: 10, lvl:1, maxLvl:10},
			{type:'firerate', price: 45,  cost:15,  value:  3, lvl:1, maxLvl:5},
			{type:'dmg',      price: 50,  cost:45,  value:  1, lvl:1, maxLvl:10},
			{type:'effect',   price: 100, cost:100, value:  0, lvl:1, maxLvl:3}
		];

	}

	//Function that changes the tower image
	upgrade() {
		this.spriteIndex += 1;
		this.indX = this.sw * this.spriteIndex;
		if (this.indX >= 270) {
			this.spriteIndex = 0;
			this.indX = 0;
			this.indY += this.sh;
		}
	}

	render(condition: boolean) {
		if(condition) {
			Engine.getCanvasContext().drawImage(this.image,
				this.indX ,this.indY, this.sw, this.sh,
				this.pozX, this.pozY, this.sizeX, this.sizeY);
		}
	}

	updateTowerShootingAngle() {
		if (this.enemysInRange.length > 0) {
			const enemy = this.enemysInRange[0];
			this.angle = Math.atan2(enemy.pozY - this.pozY, enemy.pozX - this.pozX);
		}
	}

	renderRange(condition: boolean) {
		const X = this.pozX +this.sizeX/2
		const Y = this.pozY +this.sizeY/2;
		if(condition) {
			Engine.getCanvasContext().beginPath();
			Engine.getCanvasContext().arc(X, Y, this.range, 0, 2*Math.PI, false);
			Engine.getCanvasContext().stroke();
		}
	}

	//check if we need to shoot
	shoot() {
		if(this.enemysInRange.length > 0) {
			this.tick += 1;
			if(this.tick >= this.fireRate) {
				this.tick = 0;

				// const imageSrc = bulletTypes[this.bulletType]['image-src'];
				let image;

				switch (this.bulletType) {
					case 'fire':
						image = Engine.getImageMap()[FOLDER_PATHS.BULLETS].fire;
						break;
					case 'boulder':
						image = Engine.getImageMap()[FOLDER_PATHS.BULLETS].boulder;
						break;
					case 'cannon':
						image = Engine.getImageMap()[FOLDER_PATHS.BULLETS].cannonball;
						break;
					case 'poison':
						image = Engine.getImageMap()[FOLDER_PATHS.BULLETS].poisonOrb;
						break;
					case 'frost':
						image = Engine.getImageMap()[FOLDER_PATHS.BULLETS].frostOrb;
						break;
				}
				const effect = bulletTypes[this.bulletType]['effect'];
				const effectDuration = bulletTypes[this.bulletType]['time-effect'];

				//apply the sound logic
				Engine.addBullet(
					new Bullet(image, 13, 13,
								12, 12, this.pozX + this.sizeX / 2, this.pozY + this.sizeY / 2,
								this.angle, this.bulletSpeed, this.dmg , this.range, effect, effectDuration,
								this.fps));
					this.applySoundLogic();
			}
		}else {
			this.tick = this.fireRate;
		}
	}

	setPosition(poz: any) {
		this.pozX = poz.x - this.sizeX/2;
		this.pozY = poz.y - this.sizeY/2;
	}

	//calls all the logic behind the tower
	applyLogic(list: Tower[], enemyList: Enemy[]) {
		for(let i = 0; i < list.length; i++) {
			list[i].getEnemyInRange(enemyList);
			list[i].updateTowerShootingAngle();
			list[i].shoot();
			list[i].renderRange(Engine.getGameState().renderRange);
		}
	}

	applySoundLogic() {
		this.fireSound.volume = Engine.getSound().on? 0.1 : 0;
		this.fireSound.play();
	}

	//Get the current enemies in range
	getEnemyInRange(enemyList: any) {
		const rez = [];
		for(let i = 0; i < enemyList.length; i++) {
			const ex = enemyList[i].pozX;
			const ey = enemyList[i].pozY;
			const x = ex - this.pozX;
			const y = ey - this.pozY;

			if(x * x + y * y <= this.range * this.range) {
				rez.push(enemyList[i]);
			}
		}
		this.enemysInRange = rez;
	}

	//upgrades the range of the tower
	upgradeRange() {
		if(this.upgradeTypes[0].lvl < this.upgradeTypes[0].maxLvl) {
			//increase lvl
			this.upgradeTypes[0].lvl += 1;
			//increase range
			this.range += this.upgradeTypes[0].value;
			//upgrade the cost for the upgrade
			this.upgradeTypes[0].price += this.upgradeTypes[0].cost;
		}
	}

	upgradeFireRate() {
		if(this.upgradeTypes[1].lvl < this.upgradeTypes[1].maxLvl) {
			//increase lvl
			this.upgradeTypes[1].lvl += 1;

			//upgrade the firerate
			this.fireRate -= this.upgradeTypes[1].value;
			//console.log(this.fireRate);

			//upgrade the cost for the upgrade
			this.upgradeTypes[1].price += this.upgradeTypes[1].cost;
		}

	}

	upgradeDmg() {
		if(this.upgradeTypes[2].lvl < this.upgradeTypes[2].maxLvl) {
			//increase lvl
			this.upgradeTypes[2].lvl += 1;
			//increase dmg
			this.dmg += this.upgradeTypes[2].value;
			//upgrade the cost for the upgrade
			this.upgradeTypes[2].price += this.upgradeTypes[2].cost;
		}
	}

	upgradeEffect() {
		if(this.upgradeTypes[3].lvl < this.upgradeTypes[3].maxLvl) {
			//increase lvl
			this.upgradeTypes[3].lvl += 1;
			//upgrade animation
			this.upgrade();
			//increase dmg
			this.dmg += this.upgradeTypes[2].value;
			//increase range
			this.range += this.upgradeTypes[0].value;
		}
	}
}

//type of tower, useful for selecting the bullet type
//static towerType
export const towerTypes: any = {
	"magma-tower": { 								  							  // type
		"hp": 30,
		"cost": 70,
		"range": 150,
		"bullet-type": "fire",                          // bullet type
		"fire-rate": 15,
		"image-width": 450,
		"image-height": 550,
		"sprite-width": 90,
		"sprite-height": 110,
		"image-src": "images/towers/magma_tower.png"		// tower image path
	},
	"frost-tower": {
		"hp": 40,
		"cost": 60,
		"range": 250,
		"bullet-type": "frost",										     // bullet type
		"fire-rate": 30,
		"image-width": 450,
		"image-height": 550,
		"sprite-width": 90,
		"sprite-height": 110,
		"image-src": "images/towers/frost_tower.png"		// tower image path
	},
	"cannon-tower": {
		"hp": 50,
		"cost": 50,
		"range": 300,
		"bullet-type": "cannon",											  // bullet type
		"fire-rate": 25,
		"image-width": 450,
		"image-height": 550,
		"sprite-width": 90,
		"sprite-height": 110,
		"image-src": "images/towers/cannon_tower.png"		// tower image path
	},
	"boulder-tower": {
		"hp": 40,
		"cost": 30,
		"range": 400,
		"bullet-type": "boulder", 										  // bullet type
		"fire-rate": 150,
		"image-width": 450,
		"image-height": 550,
		"sprite-width": 90,
		"sprite-height": 110,
		"image-src": "images/towers/boulder_tower.png"		// tower image path
	}
};

//static bullet types and parameters
export const bulletTypes: any = {
	"fire": { 											  // type
		"bullet-speed": 15,
		"damage": 12,									  // damage for bullet type
		"effect": "burn",								// effect type
		"time-effect": 8,								// effect duration
		"image-src": "images/bullets/fire-ball.png"		// projectile image path
	},
	"frost": {
		"bullet-speed": 10,
		"damage": 10,
		"effect": "slow",
		"time-effect": 3,
		"image-src": "images/bullets/frost-orb.png"
	},
	"poison": {
		"bullet-speed": 20,
		"damage": 8,
		"effect": "poison",
		"time-effect": 2,
		"image-src": "images/bullets/poison-blob.png"
	},
	"cannon": {
		"bullet-speed": 15,
		"damage": 15,
		"effect": "none",
		"time-effect": 0,
		"image-src": "images/bullets/cannonball.png"
	},
	"boulder": {
		"bullet-speed": 20,
		"damage": 10,
		"effect": "stun",
		"time-effect": 2,
		"image-src": "images/bullets/boulder.png"
	}
};
