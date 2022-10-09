import {Enemy} from "../objects/Enemy";
import {Engine} from "../Engine.";
import {ENEMY_SOUNDS, LEVEL_SYSTEM_STATE, MOB_TYPE} from "../../types/types";
import {SOUND_FOLDER_PATHS} from "../../types/SoundTypes";
import {DIFFICULTY_MULTIPLIER, LEVEL_SYSTEM_CONFIG} from "../../config/Level";
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

	applyLogic(): void  {
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

