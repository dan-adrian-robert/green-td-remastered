import {Bullet} from "./Bullet";
import {Engine} from "../Engine.";
import {Enemy} from "./Enemy";
import {BULLET_TYPE, TOWER_TYPE, UPGRADE_TYPE, UpgradeMetaData} from "../../types/types";
import {Sprite} from "./Sprite";
import {bulletTypes, getBulletImage} from "../../config/Bulltes";
import {getTowerImage, towerTypes} from "../../config/Towers";
import {SOUND_FOLDER_PATHS} from "../../types/SoundTypes";

export class Tower extends Sprite {
	towerType: TOWER_TYPE;
	spriteIndex: number;
	upgradeTypes: UpgradeMetaData[];

	fireSound: any;
	rangeImage: any;
	fps: number;
	dmg: number;
	fireRate: number;
	range: any;
	bulletType: BULLET_TYPE;
	tick: any;
	angle: any;
	enemysInRange: Enemy[];
	bulletSpeed: any;

	constructor(type: TOWER_TYPE, spr: any, startX: number, startY: number, sizeX: number, sizeY: number, fps: number) {

		super(
			getTowerImage(type),
			0,0,
			towerTypes[type]['sprite-width'],
			towerTypes[type]['sprite-height'],
			startX,
			startY,
			sizeX,
			sizeY
		);

		this.towerType = type;
		this.spriteIndex = 0;

		// fire-rate / 10 = nr sec until u can shoot again
		this.fireRate =  towerTypes[this.towerType]['fire-rate'];

		//tower shooting range
		this.range =  towerTypes[this.towerType]['range'];

		this.bulletType = towerTypes[this.towerType].bulletType;
		this.tick = 0;
		this.angle = 0;
		this.enemysInRange = [];
		this.bulletSpeed = bulletTypes[this.bulletType]['bullet-speed'];
		this.fps = fps;
		this.dmg = bulletTypes[this.bulletType]['damage'];

		this.rangeImage = new Image(230,230);
		this.rangeImage.src = ('images/ui/range.png');

		this.fireSound = Engine.getSoundMap()[SOUND_FOLDER_PATHS.TOWERS].towerShoot;

		this.upgradeTypes = [
			{type: UPGRADE_TYPE.RANGE, price: 25, cost:17, value: 10, lvl:1, maxLvl:10},
			{type: UPGRADE_TYPE.FIRE_RATE, price: 45, cost:15, value:  3, lvl:1, maxLvl:5},
			{type: UPGRADE_TYPE.DAMAGE, price: 50, cost:45, value: 1, lvl:1, maxLvl:10},
			{type: UPGRADE_TYPE.EFFECT, price: 100, cost:100, value: 0, lvl:1, maxLvl:3}
		];
	}

	setEnemiesInRange = (newEnemiesInRange: Enemy[]): void => {
		this.enemysInRange = newEnemiesInRange;
	}

	upgrade(): void {
		this.spriteIndex += 1;
		this.spx = this.spSizeX * this.spriteIndex;
		if (this.spx >= 270) {
			this.spriteIndex = 0;
			this.spx = 0;
			this.spy += this.spSizeY;
		}
	}

	render(condition: boolean): void {
		if(condition) {
			Engine.getCanvasContext().drawImage(this.image,
				this.spx ,this.spy, this.spSizeX, this.spSizeY,
				this.px, this.py, this.sizeX, this.sizeY);
		}
	}

	updateTowerShootingAngle() {
		if (this.enemysInRange.length > 0) {
			const enemy = this.enemysInRange[0];
			this.angle = Math.atan2(enemy.py - this.py, enemy.px - this.px);
		}
	}

	renderRange(condition: boolean) {
		const X = this.px +this.sizeX/2
		const Y = this.py +this.sizeY/2;
		if (condition) {
			Engine.getCanvasContext().beginPath();
			Engine.getCanvasContext().arc(X, Y, this.range, 0, 2*Math.PI, false);
			Engine.getCanvasContext().stroke();
		}
	}

	shoot(): void {
		if (this.enemysInRange.length > 0) {
			this.tick += 1;
			if (this.tick >= this.fireRate) {
				this.tick = 0;

				const image = getBulletImage(this.bulletType);
				const effect = bulletTypes[this.bulletType]['effect'];
				const effectDuration = bulletTypes[this.bulletType]['time-effect'];

				Engine.addBullet(
					new Bullet(image, 26, 26,
								13, 13, this.px + this.sizeX / 2, this.py + this.sizeY / 2,
								this.angle, this.bulletSpeed, this.dmg , this.range, effect, effectDuration));
				this.applySoundLogic();
			}
		} else {
			this.tick = this.fireRate;
		}
	}

	// setPosition(poz: any) {
	// 	this.pozX = poz.x - this.sizeX/2;
	// 	this.pozY = poz.y - this.sizeY/2;
	// }

	applySoundLogic() {
		this.fireSound.volume = Engine.getSound().on? 0.1 : 0;
		this.fireSound.play();
	}

	upgradeRange(): void {
		if (this.upgradeTypes[0].lvl < this.upgradeTypes[0].maxLvl) {
			//increase lvl
			this.upgradeTypes[0].lvl += 1;
			//increase range
			this.range += this.upgradeTypes[0].value;
			//upgrade the cost for the upgrade
			this.upgradeTypes[0].price += this.upgradeTypes[0].cost;
		}
	}

	upgradeFireRate(): void {
		if (this.upgradeTypes[1].lvl < this.upgradeTypes[1].maxLvl) {
			this.upgradeTypes[1].lvl += 1;

			//upgrade the fire-rate
			this.fireRate -= this.upgradeTypes[1].value;

			//upgrade the cost for the upgrade
			this.upgradeTypes[1].price += this.upgradeTypes[1].cost;
		}
	}

	upgradeDmg(): void {
		if (this.upgradeTypes[2].lvl < this.upgradeTypes[2].maxLvl) {
			this.upgradeTypes[2].lvl += 1;
			this.dmg += this.upgradeTypes[2].value;
			this.upgradeTypes[2].price += this.upgradeTypes[2].cost;
		}
	}

	upgradeEffect(): void {
		if (this.upgradeTypes[3].lvl < this.upgradeTypes[3].maxLvl) {
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
