import {GameTypes} from "../../types";

const randomIntFromInterval = (min:number,max: number) => {
	return Math.floor(Math.random()*(max-min+1)+min);
};

export class Level {
	difficulty: any;
	level: number;
	multiplier: number;
	numberEnemies: number;
	typeEnemies: string[];
	spawnPoints: any;
	enemyList: any[];
	bossLVL: any;

	constructor(numLevel: number, difficulty:any, numberEnemies: number, typeEnemies: string[], isBoss: any, spawnPoints: any) {
		if( difficulty === GameTypes.Easy ) {
			this.difficulty = 1;
		}
		else if( difficulty === GameTypes.Medium) {
			this.difficulty = 2;
		}
		else if( difficulty === GameTypes.Hard) {
			this.difficulty = 3;
		}else {
			this.difficulty = 0;
		}

		this.level = numLevel;
		this.multiplier = this.difficulty * this.level;
		this.numberEnemies = numberEnemies;
		this.typeEnemies = typeEnemies;

		if (Array.isArray(typeEnemies)) {
			this.typeEnemies = typeEnemies;
		} else {
			this.typeEnemies = [typeEnemies];
		}

		this.spawnPoints = spawnPoints;

		if(Array.isArray(spawnPoints)) {
			this.spawnPoints = spawnPoints;
		}
		else {
			this.spawnPoints = [spawnPoints];
		}

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