import {Level} from "../objects/Level";
import {GameTypes} from "../../types/types";
import {Engine} from "../Engine.";
import {LEVELS_CONFIG} from "../../config/Level";

export class GameState {
	states: any[];
	stateSelected: number;

	buildMode: boolean;
	upgradeMode: boolean;
	renderRange: boolean;
	buildTrap: boolean;
	placeSpell: boolean;

	clickSound: any;
	bgSound: any;
	loseSound: any;

	constructor(clickSound: any, bgSound: any, loseSound: any) {
		this.states = ['Menu', 'GamePlay', 'Pause', 'GameOver', 'Difficulty'];

		this.stateSelected = 0;

		this.buildMode = false;
		this.upgradeMode = false;
		this.renderRange = false;
		this.buildTrap = false;
		this.placeSpell = false;

		this.clickSound = clickSound;
		this.bgSound = bgSound;
		this.loseSound = loseSound;
		this.menuState();
	}

	setLevels(difficulty:GameTypes): void {
		const staticLevels: Level[] = [];

		LEVELS_CONFIG.map((levelConfig) => {
			const {numLevel, numberEnemies, typeEnemies, isBoss, spawnPoints}= levelConfig;
			staticLevels.push(new Level(numLevel, difficulty, numberEnemies, typeEnemies, isBoss, spawnPoints));
		})

		Engine.setStaticLevels(staticLevels);
	}

	startGame (): void {
		let difficulty = Engine.getMenu().getCurrentDifficulty();

		if (difficulty == null) {
			difficulty = GameTypes.Easy;
		}

		console.log('test levels',difficulty);
		this.setLevels(difficulty);

		this.stateSelected = 1;
	};

	applySoundLogic() {
		if (Engine.getSound().on) {
			this.bgSound.volume = 0.8;
			this.loseSound.volume = 0.8;

			if (this.isGameStarted()) {
				this.bgSound.play();
			}
			else if (this.isGameOver()) {
				this.loseSound.play();
			}
		} else {
			this.bgSound.volume = 0;
			this.loseSound.volume = 0;
		}
	}

	pauseGame(): void {
		this.stateSelected = 2;
	};

	loseGame(): void {
		this.stateSelected = 3;
	};

	menuState(): void {
		this.stateSelected = 0;
	};

	setDifficultyStat () {
		this.stateSelected = 4;
	}

	getCurrentState(): void {
		return this.states[this.stateSelected];
	};

	isGameStarted(): boolean {
		return this.stateSelected === 1;
	};

	isGamePaused(): boolean {
		return this.stateSelected === 2;
	};

	isGameOver(): boolean {
		return this.stateSelected === 3;
	};

	isMenu(): boolean  {
		return (this.stateSelected === 0);
	};

	isSetDifficulty(): boolean  {
		return this.stateSelected === 4;
	}

	reset(): void {
		this.buildMode = false;
		this.upgradeMode = false;
		this.buildTrap = false;
		this.placeSpell = false;
	}

	setRenderState(): void {
		this.renderRange = !this.renderRange;
	}
}
