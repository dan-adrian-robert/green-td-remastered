import {Hp} from "./Hp";
import {ACTIVE_EFFECTS, BULLET_EFFECT, DEBUFF, Direction, MOB_TYPE} from "../types/types";
import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";
import {enemyTypes, getEnemyBounty, getEnemyDamange, getEnemyHp} from "../config/Enemies";

export class Enemy extends Sprite {
	healLeft: any;
	enemyType: MOB_TYPE;
	effectList: DEBUFF[];
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

	activeEffects: ACTIVE_EFFECTS;
	lastEffectTick: number;

	constructor(startX:number, startY:number, direction: Direction, indexCp: any,
				type: MOB_TYPE, hpMultiplier:number, dmgMultiplier:number, dieSound: any) {
		const image = {}
		super(image,0,0, enemyTypes[type].spriteWidth, enemyTypes[type].spriteHeight,
			startX, startY,  enemyTypes[type].sizeX,  enemyTypes[type].sizeY);

		this.healLeft = 2;
		this.enemyType = type;

		this.dir = direction;
		this.speed = enemyTypes[this.enemyType]['speed'];
		this.hp = new Hp(this.px, this.py - 10, 40, 5, enemyTypes[this.enemyType]['hp'] * hpMultiplier);
		this.effectList = [];

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

		this.lastEffectTick = performance.now();
		this.activeEffects = {
			[BULLET_EFFECT.BURN] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
			[BULLET_EFFECT.SLOW] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
			[BULLET_EFFECT.STUN] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
			[BULLET_EFFECT.POISON] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
			[BULLET_EFFECT.BURN] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
			[BULLET_EFFECT.NONE] : {
				duration: 0,
				damage: 0,
				slow: 0,
				stun: 0
			},
		}
	}

	move() {
		this.ticks += 1;
		const slow_total = this.getTotalSlow();

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

	getTotalSlow(): number {
		return 0;
		// return this.activeEffects.SLOW.slow + this.activeEffects.STUN.stun + this.activeEffects.POISON.slow
	}

	render () {
		Engine.getCanvasContext().drawImage(this.image, this.spx, this.spy, this.spSizeX, this.spSizeY,
												this.px, this.py, this.sizeX, this.sizeY);
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

	renderRange(): void {
		const X = this.px + this.sizeX / 2
		const Y = this.py + this.sizeY / 2;

		Engine.getCanvasContext().beginPath();
		Engine.getCanvasContext().arc(X, Y, this.sizeX / 2, 0, 2 * Math.PI, false);
		Engine.getCanvasContext().stroke();
	}

	addEffect(debuff: DEBUFF): void {
		this.effectList.push(debuff);
	}

	applyEffects(): void {
		this.effectList.forEach((debuff: DEBUFF) => {
			const {effect, duration, damage} = debuff;

			switch (effect) {
				case(BULLET_EFFECT.NONE):
					this.activeEffects.BURN.duration = duration;
					this.activeEffects.BURN.damage = damage;
					break;
				case(BULLET_EFFECT.BURN):
					this.activeEffects.BURN.duration  = duration;
					this.activeEffects.BURN.damage = Math.floor(damage * 0.3);
					break;
				case(BULLET_EFFECT.SLOW):
					this.activeEffects.SLOW.duration  = duration;
					this.activeEffects.SLOW.slow = this.speed * 0.3;
					break;
				case(BULLET_EFFECT.STUN):
					this.activeEffects.STUN.duration  = duration;
					this.activeEffects.STUN.stun = this.speed;
					break;
				case(BULLET_EFFECT.POISON):
					this.activeEffects.POISON.duration  = duration;
					this.activeEffects.POISON.slow = this.speed * 0.15;
					this.activeEffects.POISON.damage = Math.floor(damage * 0.3);
					break;
			}
			this.lastEffectTick = performance.now() / 1000;

		}, this);
		this.effectList = [];
	}

	tickEffects(): void {
		const current_tick = performance.now() / 1000;

		if (current_tick - this.lastEffectTick > 1) {
			this.healCD -= 1;
			this.activeEffects.BURN.duration = Math.max(this.activeEffects.BURN.duration - 1, 0);
			this.activeEffects.STUN.duration = Math.max(this.activeEffects.STUN.duration - 1, 0);
			this.activeEffects.SLOW.duration = Math.max(this.activeEffects.SLOW.duration - 1, 0);
			this.activeEffects.POISON.duration = Math.max(this.activeEffects.POISON.duration - 1, 0);

			const totalDamagePerTick = this.activeEffects.BURN.damage + this.activeEffects.POISON.damage;
			this.hp.value = this.hp.value - (totalDamagePerTick ? totalDamagePerTick : 0);
			this.lastEffectTick = current_tick;
		}

		if (this.activeEffects.BURN.duration === 0) {
			this.activeEffects.BURN.damage = 0;
		}

		if (this.activeEffects.STUN.duration === 0){
			this.activeEffects.STUN.stun = 0;
		}

		if (this.activeEffects.SLOW.duration === 0) {
			this.activeEffects.SLOW.slow = 0;
		}

		if (this.activeEffects.POISON.duration === 0) {
			this.activeEffects.POISON.slow = 0;
			this.activeEffects.POISON.damage = 0;
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
