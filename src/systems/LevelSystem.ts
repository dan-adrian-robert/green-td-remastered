import {Enemy} from "../objects/Enemy";
import {Engine} from "../Engine.";
import {ENEMY_SOUNDS, LEVEL_SYSTEM_STATE, MOB_TYPE} from "../types/types";
import {SOUND_FOLDER_PATHS} from "../types/SoundTypes";
import {DIFFICULTY_MULTIPLIER, LEVEL_SYSTEM_CONFIG} from "../config/Level";
import {Level} from "../objects/Level";

export class LevelSystem {
	state: LEVEL_SYSTEM_STATE;

	spawnPerSecond: number;
	secondsBetweenLevels: number;
	secondsBeforeSpawning: number;

	fps: number;

	levels: Level[];
	activeLevel: number;

	enemyTypes: MOB_TYPE[];
	spawnPointsIndexes: number[];

	tick: number;


	constructor(fps: number) {
		this.state = LEVEL_SYSTEM_STATE.BEFORE_LEVELS;
		this.tick = 0;
		this.fps = fps;

		this.spawnPerSecond = LEVEL_SYSTEM_CONFIG.spawnPerSecond;
		this.secondsBeforeSpawning = LEVEL_SYSTEM_CONFIG.secondsBeforeSpawning;
		this.secondsBetweenLevels = LEVEL_SYSTEM_CONFIG.secondsBetweenLevels;

		this.levels = []
		this.activeLevel = 0;

		this.enemyTypes = [];
		this.spawnPointsIndexes = [];
	}

	getCurrentLevelText(): string {
		return `Level: ${this.activeLevel + 1}`;
	}

	setLevels(): void {
		this.levels = Engine.getStaticLevels();
		this.activeLevel = 0;

		const level = this.getActiveLevel();
		this.enemyTypes = level.enemyList;
		this.spawnPointsIndexes = level.spawnPoints;
	}

	getActiveLevel(): Level {
		return this.levels[this.activeLevel];
	}

	spawnEnemyInLevel(): void {
		const enemyType: MOB_TYPE = this.enemyTypes.shift() || MOB_TYPE.footman;
		const level: Level = this.getActiveLevel();
		const difficulty: number = DIFFICULTY_MULTIPLIER[level.difficulty];

		let selectedCP_index;

		const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
		const startCp = Engine.getMap().checkPoints[this.spawnPointsIndexes[0]];
		selectedCP_index = this.spawnPointsIndexes[0];
		const enemy: Enemy = new Enemy(startCp.x, startCp.y, startCp.dir, selectedCP_index, enemyType, difficulty, difficulty, dieSound);
		Engine.addEnemy(enemy);
	};

	addNewLevel(): void {
		const level: Level = this.getActiveLevel();

		if (this.levels.length > 0) {
			this.activeLevel += 1;
			this.enemyTypes = level.enemyList;
			this.spawnPointsIndexes = level.spawnPoints;
		}
	};

	applyLogic(): void {
		switch (this.state) {
			case LEVEL_SYSTEM_STATE.BEFORE_LEVELS:
				this.tickBeforeStart();
				break;
			case LEVEL_SYSTEM_STATE.LEVEL_STARTED:
				this.spawnEnemy();
				break;
			case LEVEL_SYSTEM_STATE.BETWEEN_LEVELS:
				this.tickBetweenLevels();
				break;
		}
	}

	tickBeforeStart(): void {
		this.tick += 1;

		if (this.tick === this.fps) {
			this.tick = 0;
			this.secondsBeforeSpawning -= 1;
			console.log('tick game before start: ', this.secondsBeforeSpawning);
		}

		if (this.secondsBeforeSpawning === 0) {
			this.state = LEVEL_SYSTEM_STATE.LEVEL_STARTED;
			this.setLevels();
		}
	}

	tickBetweenLevels(): void {
		this.tick += 1;

		if (this.tick === this.fps) {
			this.tick = 0;
			this.secondsBetweenLevels -= 1;
			console.log('tick game between levels: ', this.secondsBetweenLevels);
		}

		if (this.secondsBetweenLevels === 0) {
			this.state = LEVEL_SYSTEM_STATE.LEVEL_STARTED;
			this.secondsBetweenLevels = LEVEL_SYSTEM_CONFIG.secondsBetweenLevels;
		}
	}

	spawnEnemy(): void {
		this.tick += 1;

		if (this.tick === this.fps / this.spawnPerSecond) {
			this.spawnEnemyInLevel();
			this.tick = 0;
		}

		if (this.enemyTypes.length === 0) {
			this.state = LEVEL_SYSTEM_STATE.BETWEEN_LEVELS;
			console.log('switch to state ', this.state);
			this.addNewLevel();
		}
	}

}
//
// export class LevelSystem {
// 	tick: number;
// 	spawnPerSecond: number;
// 	fps: number;
// 	levels: Level[];
// 	currentLVL: number;
// 	lvl: Level;
// 	enemies: MOB_TYPE[];
// 	spawn: number[];
//
// 	specialLevelTypes: any[];
// 	tick_between_levels: number;
// 	customHpMultiplier: number;
// 	customDmgMultiplier: number;
//
// 	lastTenLevels: any[];
// 	protect_change: boolean;
// 	alternateSpawn: boolean;
//
// 	constructor(fps: number, levels: Level[]) {
// 		// used for spawns/sec
// 		this.tick = 0;
// 		this.spawnPerSecond = 1;
// 		this.fps = fps;
//
// 		this.levels = levels;
// 		this.currentLVL = 1;
// 		this.lvl = this.levels[0];
//
// 		this.levels.splice(0, 1);
// 		console.log(this.lvl);
// 		console.log(this.lvl);
// 		this.enemies = this.lvl.enemyList;
// 		this.spawn = this.lvl.spawnPoints;
//
// 		// time between levels
// 		this.tick_between_levels = 5;
//
// 		// handles the next level generations (after the first ten), each adds something more
// 		// doublePath - opens up the second path and doubles enemies
// 		// buffUp - doubles the hp and dmg multipliers
// 		// doubleEnemy - 2 times the nr of enemies
// 		// ARMAGEDON - if you reach this, this will keep adding itself to the array after "buffingUP" and doubling
// 		// nr of enemies
// 		this.specialLevelTypes = [
// 			'doublePath',
// 			'buffUP',
// 			'doubleEnemy',
// 			'ARMAGEDON'];
// 		// used by the specialLevelTypes
// 		this.customHpMultiplier = 1;
// 		this.customDmgMultiplier = 1;
//
// 		// saves the static ten levels and is updated when specialLevelTypes is involved
// 		this.lastTenLevels = [];
// 		this.protect_change = false;
// 		this.alternateSpawn = false;
// 	}
//
// 	spawnFunction () {
// 		const enemyType = this.enemies[0];
// 		this.enemies.splice(0, 1);
//
// 		const difficulty = this.lvl?.difficulty;
// 		let hpMult, dmgMult;
//
// 		// handle different difficulty
// 		if (difficulty === 3) {
// 			hpMult = (difficulty - 1) + this.customHpMultiplier;
// 			dmgMult = (difficulty - 1) + this.customDmgMultiplier;
// 		} else {
// 			hpMult = (difficulty - 1) + this.customHpMultiplier;
// 			dmgMult = (difficulty - 1) + this.customDmgMultiplier;
// 		}
//
// 		// handle multiple spawnPoints
// 		let selectedCP_index;
// 		const activeEffects = Engine.getEnemySystem().getDefaultActiveEffectsConfig();
// 		if (this.spawn.length > 1) {
// 			let startCp
// 			if (!this.alternateSpawn) {
// 				startCp = Engine.getMap().checkPoints[this.spawn[0]];
// 				this.alternateSpawn = !this.alternateSpawn;
// 				selectedCP_index = this.spawn[0];
// 			} else {
// 				startCp = Engine.getMap().checkPoints[this.spawn[1]];
// 				this.alternateSpawn = !this.alternateSpawn;
// 				selectedCP_index = this.spawn[1];
// 			}
//
// 			const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
// 			Engine.addEnemy(new Enemy(startCp.x, startCp.y, startCp.dir, selectedCP_index, enemyType, hpMult, dmgMult, dieSound, activeEffects));
// 		} else {
// 			const startCp = Engine.getMap().checkPoints[this.spawn[0]];
// 			selectedCP_index = this.spawn[0];
// 			const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
// 			Engine.addEnemy(new Enemy(startCp.x, startCp.y, startCp.dir, selectedCP_index, enemyType, hpMult, dmgMult, dieSound, activeEffects));
// 		}
// 	};
//
// 	// if out of levels, adds special level, otherwise, iterates over the current levels
// 	addNewLevel() {
// 		if (this.levels.length > 0) {
// 			this.currentLVL += 1;
// 			this.lvl = this.levels[0];
// 			this.levels.splice(0, 1);
// 			this.enemies = Array.from(this.lvl.enemyList);
// 			this.spawn = Array.from(this.lvl.spawnPoints);
// 			this.tick_between_levels = 10;
// 			this.alternateSpawn = false;
// 		}
// 		else {
// 			if (!this.protect_change) {
// 				this.addSpecialLevel();
// 				this.currentLVL += 1;
// 				this.lvl = this.levels[0];
// 				this.levels.splice(0, 1);
// 				this.enemies = Array.from(this.lvl.enemyList);
// 				this.spawn = Array.from(this.lvl.spawnPoints);
// 				this.tick_between_levels = 10;
// 				this.alternateSpawn = false;
// 				this.protect_change = !this.protect_change;
// 			}
// 		}
// 	};
//
// 	// main function for spawning enemies
// 	spawnEnemy() {
// 		this.tick += 1;
//
// 		if (this.tick === this.fps / this.spawnPerSecond) {
// 			 const startCp = Engine.getMap().checkPoints[this.spawn[1]];
// 			 const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
// 			 let enemyObject = new Enemy(startCp.x, startCp.y, Direction.right, 5, MOB_TYPE.footman, 1, 1, dieSound,  Engine.getEnemySystem().getDefaultActiveEffectsConfig());
// 			 Engine.addEnemy(enemyObject);
// 		}
//
// 		// if it's a tick ( spawn per second )
// 		if (this.tick === this.fps / this.spawnPerSecond) {
// 			if (this.tick_between_levels === 0) {
// 				if (this.enemies.length > 0) {
// 					if (!this.lvl.bossLVL) {
// 						this.spawnFunction();
// 					}
// 					else {
// 						// in case of boss level wait until all enemies are done to spawn the boss
// 						if(Engine.getEnemyList().length === 0) {
// 							this.spawnFunction();
// 						}
// 					}
// 				}
//
// 			} else {
// 				this.tick_between_levels -= 1;
// 			}
// 			this.tick = 0;
//
// 			if (this.enemies.length === 0) {
//
// 				if (!this.lvl.bossLVL) {
// 					this.addNewLevel();
//
// 				}
// 				else {
// 					if (Engine.getEnemyList().length === 0) {
// 						this.addNewLevel();
// 					}
// 				}
// 			}
// 		}
// 	}
//
// 	addSpecialLevel(): void {
// 		let lvlType;
// 		if (this.specialLevelTypes.length > 0) {
// 			lvlType = this.specialLevelTypes[0];
// 			this.specialLevelTypes.splice(0, 1);
// 			if (lvlType === "doublePath") {
// 				this.lastTenLevels.forEach(function(element) {
// 					element.numberEnemies *= 2;
// 					element.enemyList = [];
// 					element.populateEnemyList();
// 					// 16 is second spawnpoint ( from the checkpoints list)
// 					element.spawnPoints.push(16);
//
// 				}, this);
//
//
// 			}
// 			if (lvlType === "buffUP") {
// 				this.customHpMultiplier += 1;
// 				this.customDmgMultiplier += 1;
//
// 			}
// 			if (lvlType === "doubleEnemy") {
// 				this.lastTenLevels.forEach(function(element) {
// 					element.numberEnemies *= 2;
// 					element.enemyList = [];
// 					element.populateEnemyList();
// 				}, this);
//
//
// 			}
// 			if (lvlType === "ARMAGEDON") {
// 				this.lastTenLevels.forEach(function(element) {
// 					element.numberEnemies *= 2;
// 					element.enemyList = [];
// 					element.populateEnemyList();
// 				}, this);
// 				this.customHpMultiplier += 2;
// 				this.customDmgMultiplier += 2;
// 				this.specialLevelTypes.push("ARMAGEDON");
// 			}
// 		}
// 		this.protect_change = !this.protect_change;
// 		// update levels
// 		this.levels = Array.from(this.lastTenLevels);
// 	}
// }

