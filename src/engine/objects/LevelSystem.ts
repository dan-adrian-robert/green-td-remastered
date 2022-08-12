/**
 * @description LevelSystem Constructor
 * @param {*} fps number of frames per second
 */
import {Enemy} from "./Enemy";
import {Engine} from "../Engine.";
import {Direction, ENEMY_SOUNDS, MOB_TYPE} from "../../types";
import {SOUND_FOLDER_PATHS} from "../../SoundTypes";

export class LevelSystem {
	tick: number;
	spawnPerSecond: number;
	fps: number;
	justSet: boolean;
	levels: any;
	currentLVL: number;
	lvl: any;
	enemies: any;
	spawn: any;

	specialLevelTypes: any[];
	tick_between_levels: number;
	customHpMultiplier: number;
	customDmgMultiplier: number;

	lastTenLevels: any[];
	protect_change: boolean;
	alternateSpawn: boolean;

	constructor(fps: number) {
		// used for spawns/sec
		this.tick = 0;
		this.spawnPerSecond = 1;
		this.fps = fps;
		// if it's not the first lvl
		this.justSet = false;


		this.levels = null;
		// currentLVL will keep the lvl number only
		this.currentLVL = 0;
		this.lvl = null;
		this.enemies = null;
		// will take the array of spawnpoints from the current parsed lvl
		this.spawn = null;

		// time between levels
		this.tick_between_levels = 5;

		// handles the next level generations (after the first ten), each adds something more
		// doublePath - opens up the second path and doubles enemies
		// buffUp - doubles the hp and dmg multipliers
		// doubleEnemy - 2 times the nr of enemies
		// ARMAGEDON - if you reach this, this will keep adding itself to the array after "buffingUP" and doubling
		// nr of enemies
		this.specialLevelTypes = [
			'doublePath',
			'buffUP',
			'doubleEnemy',
			'ARMAGEDON'];
		// used by the specialLevelTypes
		this.customHpMultiplier = 1;
		this.customDmgMultiplier = 1;

		// saves the static ten levels and is updated when specialLevelTypes is involved
		this.lastTenLevels = [];
		this.protect_change = false;

		// if needed to alternate spawnPoint
		this.alternateSpawn = false;
	}

	spawnFunction () {
		const enemyType = this.enemies[0];
		this.enemies.splice(0, 1);

		const difficulty = this.lvl.difficulty;
		var hpMult, dmgMult;

		// handle different difficulty
		if (difficulty === 3) {
			hpMult = (difficulty - 1) + this.customHpMultiplier;
			dmgMult = (difficulty - 1) + this.customDmgMultiplier;
		} else {
			hpMult = (difficulty - 1) + this.customHpMultiplier;
			dmgMult = (difficulty - 1) + this.customDmgMultiplier;
		}

		// handle multiple spawnPoints
		var selectedCP_index;
		if (this.spawn.length > 1) {
			let startCp
			if (!this.alternateSpawn) {
				startCp = Engine.getMap().checkPoints[this.spawn[0]];
				this.alternateSpawn = !this.alternateSpawn;
				selectedCP_index = this.spawn[0];
			} else {
				startCp = Engine.getMap().checkPoints[this.spawn[1]];
				this.alternateSpawn = !this.alternateSpawn;
				selectedCP_index = this.spawn[1];
			}

			const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
			Engine.addEnemy(new Enemy(startCp.x, startCp.y, startCp.dir, selectedCP_index, enemyType, hpMult, dmgMult, dieSound));
		} else {
			const startCp = Engine.getMap().checkPoints[this.spawn[0]];
			selectedCP_index = this.spawn[0];
			const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
			Engine.addEnemy(new Enemy(startCp.x, startCp.y, startCp.dir, selectedCP_index, enemyType, hpMult, dmgMult, dieSound));
		}
	};

	// if out of levels, adds special level, otherwise, iterates over the current levels
	addNewLevel() {
		if (this.levels.length > 0) {
			this.currentLVL += 1;
			this.lvl = this.levels[0];
			this.levels.splice(0, 1);
			this.enemies = Array.from(this.lvl.enemyList);
			this.spawn = Array.from(this.lvl.spawnPoints);
			this.tick_between_levels = 10;
			this.alternateSpawn = false;
		}
		else {
			if (!this.protect_change) {
				this.addSpecialLevel();
				this.currentLVL += 1;
				this.lvl = this.levels[0];
				this.levels.splice(0, 1);
				this.enemies = Array.from(this.lvl.enemyList);
				this.spawn = Array.from(this.lvl.spawnPoints);
				this.tick_between_levels = 10;
				this.alternateSpawn = false;
				this.protect_change = !this.protect_change;
			}
		}
	};
	
	// main function for spawning enemies
	spawnEnemy() {
		// if it's first level
		if (!this.justSet) {
			this.levels = Array.from(Engine.getStaticLevels());
			this.currentLVL = 1;
			this.lastTenLevels = Array.from(this.levels);
			
			this.lvl = this.levels[this.currentLVL - 1];
			this.levels.splice(0, 1);
			this.enemies = Array.from(this.lvl.enemyList);
			this.spawn = Array.from(this.lvl.spawnPoints);
			this.justSet = true;
		}

		this.tick += 1;
		if (this.tick === this.fps / this.spawnPerSecond) {
			 const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
			 let enemyObject = new Enemy(35, 35, Direction.right, 5, MOB_TYPE.footman, 1, 1, dieSound);
			 Engine.addEnemy(enemyObject);
		}

		// if it's a tick ( spawn per second )
		if (this.tick === this.fps / this.spawnPerSecond) {
			if (this.tick_between_levels === 0) {
				if (this.enemies.length > 0) {
					if (!this.lvl.bossLVL) {
						this.spawnFunction();
					}
					else {
						// in case of boss level wait until all enemies are done to spawn the boss
						if(Engine.getEnemyList().length === 0) {
							this.spawnFunction();
						}
					}
				}
				
			} else {
				this.tick_between_levels -= 1;
			}
			this.tick = 0;

			if (this.enemies.length === 0) {
				
				if (!this.lvl.bossLVL) {
					this.addNewLevel();
					
				}
				else {
					if (Engine.getEnemyList().length === 0) {
						this.addNewLevel();
					}
				}
			}
		}
	}

	addSpecialLevel() {
		let lvlType;
		if (this.specialLevelTypes.length > 0) {
			lvlType = this.specialLevelTypes[0];
			this.specialLevelTypes.splice(0, 1);
			if (lvlType === "doublePath") {
				this.lastTenLevels.forEach(function(element) {
					element.numberEnemies *= 2;
					element.enemyList = [];
					element.populateEnemyList();
					// 16 is second spawnpoint ( from the checkpoints list)
					element.spawnPoints.push(16);
					
				}, this);
				
				
			}
			if (lvlType === "buffUP") {
				this.customHpMultiplier += 1;
				this.customDmgMultiplier += 1;
				
			}
			if (lvlType === "doubleEnemy") {
				this.lastTenLevels.forEach(function(element) {
					element.numberEnemies *= 2;
					element.enemyList = [];
					element.populateEnemyList();
				}, this);
				

			}
			if (lvlType === "ARMAGEDON") {
				this.lastTenLevels.forEach(function(element) {
					element.numberEnemies *= 2;
					element.enemyList = [];
					element.populateEnemyList();
				}, this);
				this.customHpMultiplier += 2;
				this.customDmgMultiplier += 2;
				this.specialLevelTypes.push("ARMAGEDON");
			}
		}
		this.protect_change = !this.protect_change;
		// update levels
		this.levels = Array.from(this.lastTenLevels);
	}
}

