import {Level} from "../objects/Level";
import {GAME_STATE, GameTypes} from "../types/types";
import {Engine} from "../Engine.";
import {LEVELS_CONFIG} from "../config/Level";

export class GameStateSystem {
	states: GAME_STATE[];
	stateSelected: GAME_STATE;

	buildMode: boolean;
	upgradeMode: boolean;
	renderRange: boolean;
	buildTrap: boolean;
	placeSpell: boolean;

	clickSound: any;
	bgSound: any;
	loseSound: any;

	constructor(clickSound: any, bgSound: any, loseSound: any) {
		this.states = [GAME_STATE.Menu, GAME_STATE.GamePlay, GAME_STATE.Pause, GAME_STATE.GameOver, GAME_STATE.Difficulty];

		this.stateSelected = GAME_STATE.Menu;

		this.buildMode = false;
		this.upgradeMode = false;
		this.renderRange = false;
		this.buildTrap = false;
		this.placeSpell = false;

		this.clickSound = clickSound;
		this.bgSound = bgSound;
		this.loseSound = loseSound;
	}

	setLevels(difficulty:GameTypes): void {
		const staticLevels: Level[] = [];

		LEVELS_CONFIG.map((levelConfig) => {
			const {numLevel, numberEnemies, typeEnemies, isBoss, spawnPoints}= levelConfig;
			staticLevels.push(new Level(numLevel, difficulty, numberEnemies, typeEnemies, isBoss, spawnPoints));
			return null;
		})

		Engine.setStaticLevels(staticLevels);
	}

	startGame (): void {
		let difficulty = Engine.getMenu().getCurrentDifficulty();

		if (difficulty == null) {
			difficulty = GameTypes.Easy;
		}

		this.setLevels(difficulty);

		this.stateSelected = GAME_STATE.GamePlay;
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
		this.stateSelected = GAME_STATE.Pause;
	};

	loseGame(): void {
		this.stateSelected = GAME_STATE.GameOver;
	};

	menuState(): void {
		this.stateSelected = GAME_STATE.Menu;
	};

	setDifficultyStat () {
		this.stateSelected = GAME_STATE.Difficulty;
	}


	isGameStarted(): boolean {
		return this.stateSelected === GAME_STATE.GamePlay;
	};

	isGamePaused(): boolean {
		return this.stateSelected === GAME_STATE.Pause;
	};

	isGameOver(): boolean {
		return this.stateSelected === GAME_STATE.GameOver;
	};

	isMenu(): boolean  {
		return (this.stateSelected === GAME_STATE.Menu);
	};

	isSetDifficulty(): boolean  {
		return this.stateSelected === GAME_STATE.Difficulty;
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
