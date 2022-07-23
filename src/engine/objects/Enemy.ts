import {Hp} from "./Hp";
import {Direction, ENEMY_CONFIG, MOB_TYPE} from "../../types";
import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Enemy extends Sprite {
	debuffs: any[];
	healLeft: any;
	enemyType: MOB_TYPE;
	active_debuffs: any;
	dir: Direction;
	speed: any;
	hp: any;
	currentCp: any;
	animationIndex: number;
	ticks: number;
	maxTicks: number;

	bounty: any
	dmg: any

	dieSound: any;
	healCD: any;

	constructor(startX:number, startY:number, direction: Direction, indexCp: any, type: MOB_TYPE, hpMultiplier:number, dmgMultiplier:number) {
		const image = {}
		super(image,0,0, enemyTypes[type].spriteWidth, enemyTypes[type].spriteHeight,
			startX, startY,  enemyTypes[type].sizeX,  enemyTypes[type].sizeY);

		this.debuffs = [];
		this.healLeft = 2;
		this.enemyType = type;

		this.active_debuffs = {
			none: 0,
			slow: {
				"duration": 0,  // for ice
				value: 0
			},
			burn: {
				"duration": 0, // for fire
				damage: 0
			},
			stun: {
				"duration": 0, // for boulder
				value: 0
			},
			poison: {
				"duration": 0, // for poison (deals dmg and slow)
				"slow_value": 0,
				"dmg_value": 0
			},
			last_tick: 0
		};

		this.dir = direction;
		this.speed = enemyTypes[this.enemyType]['speed'];
		this.hp = new Hp(this.px, this.py - 10, 20, 5, enemyTypes[this.enemyType]['hp'] * hpMultiplier);

		switch (this.enemyType) {
			case MOB_TYPE.footman:
				this.image = Engine.getImageMap().MOBS.footman;
				break
		}
		this.currentCp = indexCp;

		this.animationIndex = 0;
		this.ticks = 0;
		this.maxTicks = 5;

		this.bounty = getEnemyBounty(this.enemyType);
		this.dmg = getEnemyDamange(this.enemyType) * dmgMultiplier;

		this.dieSound = new Audio();
		this.dieSound.volume = 0.1;
		this.dieSound.src = enemyTypes[this.enemyType].dieSound;
	}

	move() {
		this.ticks += 1;
		const slow_total = this.active_debuffs.slow["value"] + this.active_debuffs.stun["value"] + this.active_debuffs.poison["slow_value"];

		switch (this.dir) {
			case Direction.right:
				this.px += Math.max(this.speed - slow_total, 0);
				break;

			case Direction.left:
				this.px -= Math.max(this.speed - slow_total, 0);
				break;

			case Direction.up:
				this.py -= Math.max(this.speed - slow_total, 0);
				break;

			case Direction.down:
				this.py += Math.max(this.speed - slow_total, 0);
				break;
		}
	}

	render () {
		Engine.getCanvasContext().drawImage(this.image, this.spx, this.spy, this.spSizeX, this.spSizeY,
												this.px, this.py, this.sizeX, this.sizeY);
	}

	//collide with the checkpoints and change the direction if needed
	colideWithCheckPoint(map: any) {
		const cp = map.getCp(this.currentCp);

		if(Math.abs(this.px - cp.x) < this.sizeX &&
		   Math.abs(this.py - cp.y) < this.sizeY ) {
			this.dir = cp.dir;
			this.currentCp += 1;
			this.changeSpriteDir(this.dir);
		}
	}

	changeSpriteDir(dir: Direction) {
		if (dir === Direction.right) {
			this.spy = 3 * this.spSizeY;
			this.spx = 0;
		}else if(dir === Direction.left) {
			this.spy = 1 * this.spSizeY;
			this.spx = 0;
		} else if(dir === Direction.down) {
			this.spy = 0;
			this.spx = 0;
		}else if(dir === Direction.up) {
			this.spy = 2 * this.spSizeY;
			this.spx = 0;
		}
	}

	updateSprite() {
		if(this.ticks > this.maxTicks) {
			this.ticks = 0;
			this.spx += this.spSizeX;
			this.spx %= this.image.width;

			// console.log('end', this.indX);
			// if(this.active_debuffs.stun["duration"] > 0) {
			// 	console.log(this.indX);
			// 	this.ticks = 0;
			// 	this.indX += this.sw;
			// 	this.indX %= this.image.width;
			// }
		}
	}

	//render the collision range for the enemy
	renderRange(): void {
		const X = this.px + this.sizeX / 2
		const Y = this.py + this.sizeY / 2;

		Engine.getCanvasContext().beginPath();
		Engine.getCanvasContext().arc(X, Y, this.sizeX / 2, 0, 2 * Math.PI, false);
		Engine.getCanvasContext().stroke();
	}

	applyDebuffs(): void {
		this.debuffs.forEach((debuff: any) => {
			// extract variables from current debuff
			const effect = debuff["effect"];
			const duration = debuff["effect_duration"];
			const damage = debuff["dmg"];

			//treat depending on case (here you can change the multiplier for a specific debuff)
			if (effect === "none") {
					this.active_debuffs.burn["duration"] = duration;
					this.active_debuffs.burn["damage"] = damage;
			}
			else if (effect === "burn") {
				this.active_debuffs.burn["duration"] = duration;
				this.active_debuffs.burn["damage"] = Math.floor(damage * 0.3)
			}
			else if(effect === "slow") {
				this.active_debuffs.slow["duration"] = duration;
				this.active_debuffs.slow["value"] = this.speed * 0.3;
			}
			else if(effect === "stun") {
				this.active_debuffs.stun["duration"] = duration;
				this.active_debuffs.stun["value"] = this.speed;
			}
			else if(effect === "poison") {
				this.active_debuffs.poison["duration"] = duration;
				this.active_debuffs.poison["slow_value"] = this.speed * 0.15;
				this.active_debuffs.poison["dmg_value"] = Math.floor(damage * 0.3)
			}
			//calculates current tick (used for damage over time(Dot) and duration calculation / ticking seconds)
			this.active_debuffs.last_tick = performance.now() / 1000;

		}, this);
		this.debuffs = [];
	}

	tick_debuffs(): void {
		const current_tick = performance.now() / 1000;
		const last_tick = this.active_debuffs.last_tick;


		// if it's at least 1 second
		if (current_tick - last_tick > 1){
			this.healCD -= 1;
			// reduce duration
			this.active_debuffs.burn["duration"] = Math.max(this.active_debuffs.burn["duration"] - 1, 0);
			this.active_debuffs.stun["duration"] = Math.max(this.active_debuffs.stun["duration"] - 1, 0);
			this.active_debuffs.slow["duration"] = Math.max(this.active_debuffs.slow["duration"] - 1, 0);
			this.active_debuffs.poison["duration"] = Math.max(this.active_debuffs.poison["duration"] - 1, 0);

			const total_damage_per_tick = this.active_debuffs.burn["damage"] + this.active_debuffs.poison["dmg_value"];
			this.hp.value = this.hp.value - total_damage_per_tick;

			this.active_debuffs.last_tick = current_tick;
		}

		if(this.active_debuffs.burn["duration"] === 0){
			this.active_debuffs.burn["damage"] = 0;
		}
		if(this.active_debuffs.stun["duration"] === 0){
			this.active_debuffs.stun["value"] = 0;
		}
		if(this.active_debuffs.slow["duration"] === 0){
			this.active_debuffs.slow["value"] = 0;
		}
		if(this.active_debuffs.poison["duration"] === 0){
			this.active_debuffs.slow["slow_value"] = 0;
			this.active_debuffs.slow["dmg_value"] = 0;
		}
	}

	castHeal(list: any, currentEnemy: any) {
		function randomIntFromInterval(min: number,max: number)
		{
			return Math.floor(Math.random()*(max-min+1)+min);
		}

		// actual chance of this triggering 30%
		const chance = 30
		const tryChance = randomIntFromInterval(0,100);

		if (tryChance <= chance) {
			const listDamagedEnemies: any = [];
			list.forEach(function(enemy: any) {
				if(enemy.hp.value < getEnemyHp(enemy.enemyType))
					listDamagedEnemies.push(enemy);
			}, this);
			
			if (listDamagedEnemies.length > 0 ) {
				const randomEnemyIndex = randomIntFromInterval(0, listDamagedEnemies.length - 1);
				const randomEnemy = listDamagedEnemies[randomEnemyIndex];
				randomEnemy.hp.value += 15; 
			}
		}
	};

	applySoundLogic(): void {
		if (Engine.getSound().on) {
			this.dieSound.volume = 0.1;
		}else {
			this.dieSound.volume = 0;
		}
		this.dieSound.play();
	}
}

export const enemyTypes: ENEMY_CONFIG = {
	[MOB_TYPE.demolitionSquad]: {
		hp: 80,
		speed: 1,
		damage: 25,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 15,
		dieSound:'sound/enemies/MortarDead.wav'
	},
	[MOB_TYPE.footman]: {
		hp: 40,
		speed: 2,
		damage: 10,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 5,
		dieSound:'sound/enemies/HumanDead.wav'
	},
	[MOB_TYPE.orcGrunt]: {
		hp: 50,
		speed: 2.1,
		damage: 10,
		image_width: 374,
		image_height: 298,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 7,
		dieSound:'sound/enemies/OrcDead.wav'
	},
	[MOB_TYPE.knight]: {
		hp: 70,
		speed: 3,
		damage: 10,
		image_width: 375,
		image_height: 299,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 17,
		dieSound:'sound/enemies/KnightDead.wav'
	},
	[MOB_TYPE.orcRider]: {
		hp: 65,
		speed: 3,
		damage: 20,
		image_width: 374,
		image_height: 298,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 15,
		dieSound:'sound/enemies/RiderDead.wav'
	},
	[MOB_TYPE.dragon]: {
		hp: 400,
		speed: 1.5,
		damage: 25,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 30,
		dieSound:'sound/enemies/DragonDeath1.wav'
	},
	[MOB_TYPE.gryphon]: {
		hp: 50,
		speed: 2.5,
		damage: 10,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 12,
		dieSound:'sound/enemies/Grifon.wav'
	},
	[MOB_TYPE.archer]: {
		hp: 20,
		speed: 2.2,
		damage: 15,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 7,
		dieSound:'sound/enemies/Archer.wav'
	},
	[MOB_TYPE.ogre]: {
		hp: 350,
		speed: 2.3,
		damage: 30,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 20,
		dieSound:'sound/enemies/Ogre.wav'
	},
	[MOB_TYPE.mage]: {
		hp: 35,
		speed: 1.8,
		damage: 25,
		image_width: 375,
		image_height: 300,
		spriteWidth: 75,
		spriteHeight: 75,
		sizeX: 75,
		sizeY: 75,
		gold: 10,
		dieSound:'sound/enemies/Mage.wav'
	},
};

export const getEnemyHp = (type: MOB_TYPE) => {
	return enemyTypes[type].hp;
}
export const getEnemyBounty = (type: MOB_TYPE) => {
	return enemyTypes[type].gold;
}
export const getEnemyDamange = (type: MOB_TYPE) => {
	return enemyTypes[type].damage;
}
