//Menu GameState Constructor
import {Level} from "../objects/Level";
import {GameTypes, MOB_TYPE} from "../../types";
import {Engine} from "../Engine.";

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

	constructor() {
		//The possible game states
		this.states = ['Menu', 'GamePlay', 'Pause', 'GameOver', 'Difficulty'];

		//Current state
		this.stateSelected = 0;

		//when u press the buildMode, it is activated
		this.buildMode = false;
		this.upgradeMode = false;
		this.renderRange = false;
		this.buildTrap = false;
		this.placeSpell = false;

		this.clickSound = new Audio();
		this.clickSound.volume = 0.15;
		this.clickSound.src = "sound/ui/buttonClick.wav";

		this.bgSound = new Audio();
		this.bgSound.volume = 0.8;
		this.bgSound.loop = true;
		this.bgSound.src = 'sound/ambient/nightElf.mp3';


		this.loseSound = new Audio();
		this.loseSound.volume = 0.8;
		this.loseSound.src = 'sound/ambient/defeated.wav';

		//init the menu Buttons
		this.menuState();
	}

	startGame () {
		// get difficulty and set static levels
		let difficulty = Engine.getMenu().getCurrentDifficulty();

		if (difficulty == null){
			difficulty = GameTypes.Easy;
		}

		const staticLevels = [];
		staticLevels.push(new Level(1, difficulty, 6, [MOB_TYPE.footman], false, 0));
		staticLevels.push(new Level(2, difficulty, 7, ['orc_grunt'], false, 0));
		staticLevels.push(new Level(3, difficulty, 5, ['dwarven-demolition-squad'], false, 0));
		staticLevels.push(new Level(4, difficulty, 8, ['human_knight'], false, 0));
		staticLevels.push(new Level(5, difficulty, 1, ['dragon_boss'], true, 0));
		staticLevels.push(new Level(6, difficulty, 8, ['mage'], false, 0));
		staticLevels.push(new Level(7, difficulty, 10, ['orc_rider'], false, 0));
		staticLevels.push(new Level(8, difficulty, 12, ['gryphon'], false, 0));
		staticLevels.push(new Level(9, difficulty, 10, ['archer'], false, 0));
		staticLevels.push(new Level(10, difficulty, 1, ['ogre'], true, 0));
		Engine.setStaticLevels(staticLevels);
		this.stateSelected = 1;
	};

	applySoundLogic() {
		if(Engine.getSound().on) {
			this.bgSound.volume = 0.8;
			this.loseSound.volume = 0.8;

			if(this.isGameStarted()) {
				this.bgSound.play();
			}
			else if(this.isGameOver()) {
				this.loseSound.play();
			}

		} else {
			this.bgSound.volume = 0;
			this.loseSound.volume = 0;
		}

	}

	pauseGame() {
		this.stateSelected = 2;
	};

	loseGame() {
		this.stateSelected = 3;
	};

	menuState() {
		this.stateSelected = 0;
	};

	setDifficultyStat () {
		this.stateSelected = 4;
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~//

	//State getter
	getCurrentState() {
		return this.states[this.stateSelected];
	};

	isGameStarted() {
		return (this.stateSelected === 1);
	};

	isGamePaused() {
		return (this.stateSelected === 2);
	};

	isGameOver() {
		return (this.stateSelected === 3);
	};

	isMenu() {
		return (this.stateSelected === 0);
	};

	isSetDifficulty() {
		return (this.stateSelected === 4);
	}

	reset() {
		this.buildMode = false;
		this.upgradeMode = false;
		this.buildTrap = false;
		this.placeSpell = false;
	}

	setRenderState() {
		this.renderRange = !this.renderRange;
	}
}
