import {Level} from "../objects/Level";
import {AMBIENT_SOUNDS, GameTypes, MOB_TYPE, UI_SOUNDS} from "../../types";
import {Engine} from "../Engine.";
import {SOUND_FOLDER_PATHS} from "../../SoundTypes";

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

	startGame (): void {
		let difficulty = Engine.getMenu().getCurrentDifficulty();

		if (difficulty == null) {
			difficulty = GameTypes.Easy;
		}

		const staticLevels = [];
		staticLevels.push(new Level(1, difficulty, 6, [MOB_TYPE.footman], false, 0));
		staticLevels.push(new Level(2, difficulty, 7, [MOB_TYPE.orcGrunt], false, 0));
		staticLevels.push(new Level(3, difficulty, 5, [MOB_TYPE.demolitionSquad], false, 0));
		staticLevels.push(new Level(4, difficulty, 8, [MOB_TYPE.knight], false, 0));
		staticLevels.push(new Level(5, difficulty, 1, [MOB_TYPE.dragon], true, 0));
		staticLevels.push(new Level(6, difficulty, 8, [MOB_TYPE.mage], false, 0));
		staticLevels.push(new Level(7, difficulty, 10, [MOB_TYPE.orcRider], false, 0));
		staticLevels.push(new Level(8, difficulty, 12, [MOB_TYPE.gryphon], false, 0));
		staticLevels.push(new Level(9, difficulty, 10, [MOB_TYPE.archer], false, 0));
		staticLevels.push(new Level(10, difficulty, 1, [MOB_TYPE.ogre], true, 0));
		Engine.setStaticLevels(staticLevels);
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
