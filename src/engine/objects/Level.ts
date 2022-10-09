import {GameTypes, MOB_TYPE} from "../../types/types";

const randomIntFromInterval = (min:number,max: number) => {
	return Math.floor(Math.random()*(max-min+1)+min);
};

export class Level {
	difficulty: GameTypes;
	level: number;
	multiplier: number;
	numberEnemies: number;
	typeEnemies: MOB_TYPE[];
	spawnPoints: number[];
	enemyList: MOB_TYPE[];
	bossLVL: boolean;

	constructor(numLevel: number, difficulty:GameTypes, numberEnemies: number, typeEnemies: MOB_TYPE[], isBoss: any, spawnPoints: number[]) {
		this.difficulty = difficulty;
		this.level = numLevel;
		//TODO take difficulty into account here
		this.multiplier = this.level;
		this.numberEnemies = numberEnemies;
		this.typeEnemies = typeEnemies;
		this.spawnPoints = spawnPoints;

		this.enemyList = [];
		this.bossLVL = isBoss;

		this.populateEnemyList();
	}

	populateEnemyList(): void {
		for (let i = 0; i < this.numberEnemies; i++) {
			const randType = randomIntFromInterval(0, this.typeEnemies.length-1);
			const selectType = this.typeEnemies[randType];
			this.enemyList.push(selectType);
		}
	}
}