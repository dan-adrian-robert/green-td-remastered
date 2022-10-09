import {Hp} from "./Hp";
import {Direction, MOB_TYPE} from "../../types/types";
import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";
import {enemyTypes, getEnemyBounty, getEnemyDamange, getEnemyHp} from "../../config/Enemies";
import {GameMap} from "./GameMap";

export class Enemy extends Sprite {
	debuffs: any[];
	healLeft: any;
	enemyType: MOB_TYPE;
	active_debuffs: any;
	dir: Direction;
	speed: number;
	hp: Hp;
	currentCp: number;
	animationIndex: number;
	ticks: number;
	maxTicks: number;

	bounty: number;
	dmg: number;

	dieSound: any;
	healCD: any;

	constructor(startX:number, startY:number, direction: Direction, indexCp: any,
				type: MOB_TYPE, hpMultiplier:number, dmgMultiplier:number, dieSound: any) {
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
				"duration": 0,
				value: 0
			},
			poison: {
				"duration": 0,
				"slow_value": 0,
				"dmg_value": 0
			},
			last_tick: 0
		};

		this.dir = direction;
		this.speed = enemyTypes[this.enemyType]['speed'];
		this.hp = new Hp(this.px, this.py - 10, 40, 5, enemyTypes[this.enemyType]['hp'] * hpMultiplier);

		switch (this.enemyType) {
			case MOB_TYPE.footman:
				this.image = Engine.getImageMap().MOBS.footman;
				break
			case MOB_TYPE.orcGrunt:
				this.image = Engine.getImageMap().MOBS.grunt;
				break
			case MOB_TYPE.demolitionSquad:
				this.image = Engine.getImageMap().MOBS.dwarvenDemolitionSquad;
				break
			case MOB_TYPE.knight:
				this.image = Engine.getImageMap().MOBS.knight;
				break
			case MOB_TYPE.dragon:
				this.image = Engine.getImageMap().MOBS.dragonBoss;
				break
			case MOB_TYPE.mage:
				this.image = Engine.getImageMap().MOBS.mage;
				break
			case MOB_TYPE.orcRider:
				this.image = Engine.getImageMap().MOBS.ogre;
				break
			case MOB_TYPE.gryphon:
				this.image = Engine.getImageMap().MOBS.grifon;
				break
			case MOB_TYPE.archer:
				this.image = Engine.getImageMap().MOBS.archer;
				break
			case MOB_TYPE.ogre:
				this.image = Engine.getImageMap().MOBS.ogre;
				break
			default:
				this.image = Engine.getImageMap().MOBS.footman;
		}
		this.currentCp = indexCp;

		this.animationIndex = 0;
		this.ticks = 0;
		this.maxTicks = 5;

		this.bounty = getEnemyBounty(this.enemyType);
		this.dmg = getEnemyDamange(this.enemyType) * dmgMultiplier;
		this.dieSound = dieSound;
		// this.dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, enemyTypes[this.enemyType].dieSound)
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

	collideWithCheckPoint(map: GameMap) {
		const cp = map.getCp(this.currentCp);

		if (Math.abs(this.px - cp.x) < this.sizeX &&
		   Math.abs(this.py - cp.y) < this.sizeY ) {
			this.dir = cp.dir;
			this.currentCp += 1;
			this.changeSpriteDir(this.dir);
		}
	}

	changeSpriteDir(dir: Direction) {
		switch (dir) {
			case (Direction.right):
				this.spy = 3 * this.spSizeY;
				this.spx = 0;
				break;
			case (Direction.left):
				this.spy = this.spSizeY;
				this.spx = 0;
				break;
			case (Direction.down):
				this.spy = 0;
				this.spx = 0;
				break;
			case (Direction.up):
				this.spy = 2 * this.spSizeY;
				this.spx = 0;
				break;
		}
	}

	updateSprite(): void {
		if (this.ticks > this.maxTicks) {
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

		if (this.active_debuffs.burn["duration"] === 0){
			this.active_debuffs.burn["damage"] = 0;
		}
		if (this.active_debuffs.stun["duration"] === 0){
			this.active_debuffs.stun["value"] = 0;
		}
		if (this.active_debuffs.slow["duration"] === 0){
			this.active_debuffs.slow["value"] = 0;
		}
		if (this.active_debuffs.poison["duration"] === 0){
			this.active_debuffs.slow["slow_value"] = 0;
			this.active_debuffs.slow["dmg_value"] = 0;
		}
	}

	castHeal(list: any, currentEnemy: any) {
		function randomIntFromInterval(min: number,max: number) {
			return Math.floor(Math.random() * (max - min + 1) + min);
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
		} else {
			this.dieSound.volume = 0;
		}
		this.dieSound.play();
	}
}
