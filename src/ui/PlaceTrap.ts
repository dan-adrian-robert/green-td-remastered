import {Trap} from "../objects/Trap";
import {Engine} from "../Engine.";
import {MousePosition, TRAP_TYPE, UI_SOUNDS} from "../types/types";
import {Sprite} from "../objects/Sprite";
import {SOUND_FOLDER_PATHS} from "../types/SoundTypes";
import {TrapTypes} from "../config/Traps";

export class PlaceTrap extends Sprite {
	buildMenuImage: any;
	buildImageSize: number;
	trapPozX: number;
	trapPozY: number;
	imagePozList: {pozX: number, pozY: number, sx: number, sy : number, type: TRAP_TYPE, image: any}[];
	priceList: any[];
	buildCollisionBox: {x: number, y: number, size: number}[];
	indexTowerBuilded: number;
	noGold: any;

	constructor (image: any, sw: number, sh: number, sizeX: number, sizeY: number) {
		super(image, 0,0,100,100,0, 0, sizeX, sizeY);

		this.buildMenuImage = image;
		this.buildImageSize = 0;

		this.trapPozX = 0;
		this.trapPozY = 0;

		// The position list  of the trap option images
		this.imagePozList = [];

		// The trap options price list.
		this.priceList = [];

		this.buildCollisionBox = [];
		this.indexTowerBuilded = -1;

		this.noGold = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.UI, UI_SOUNDS.HUMAN_NO_GOLD);
		this.init();
	}

	init(): void {
		this.imagePozList = [
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: TRAP_TYPE.MINE, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: TRAP_TYPE.FIRE, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: TRAP_TYPE.ICE_SPIKE, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: TRAP_TYPE.POISON, image: null}
		];

		this.priceList = [
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0}
		];

		// the mine trap image
		const explosion = new Image(this.imagePozList[0].sx, this.imagePozList[0].sy);
		explosion.src = "images/traps/mine.png";

		// the fire trap image
		const fire = new Image(this.imagePozList[1].sx, this.imagePozList[1].sy);
		fire.src = "images/traps/fire.png";

		// the ice spikes trap image
		const iceSpikes = new Image(this.imagePozList[2].sx, this.imagePozList[2].sy);
		iceSpikes.src = "images/traps/ice_spikes.png";

		// the poison trap image
		const poison = new Image(this.imagePozList[3].sx, this.imagePozList[3].sy);
		poison.src = "images/traps/poison.png";

		this.imagePozList[0].image = explosion;
		this.imagePozList[1].image = fire;
		this.imagePozList[2].image = iceSpikes;
		this.imagePozList[3].image = poison;
		this.imagePozList[0].type = TRAP_TYPE.MINE;
		this.imagePozList[1].type = TRAP_TYPE.FIRE;
		this.imagePozList[2].type = TRAP_TYPE.ICE_SPIKE;
		this.imagePozList[3].type = TRAP_TYPE.POISON;
  }

	updatePozition(mousePos: MousePosition): void {
		this.px = mousePos.x - this.spSizeX / 2.1;
		this.py = mousePos.y - this.spSizeY / 2.1;
		this.trapPozX = mousePos.x - 25;
		this.trapPozY = mousePos.y - 25;

		// Update the trap images position
		this.updateTrapImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList();
	}

	render(condition: boolean): void {
		if (condition) {
			Engine.getCanvasContext().drawImage(this.buildMenuImage,
									0, 0, this.spSizeX, this.spSizeY,
									this.px, this.py, this.sizeX, this.sizeY);

			for (let i = 0; i < 4; i++ ) {
				Engine.getCanvasContext().drawImage(this.imagePozList[i].image,
										0, 0,
										this.imagePozList[i].sx, this.imagePozList[i].sy,
										this.imagePozList[i].pozX, this.imagePozList[i].pozY,
										this.buildImageSize, this.buildImageSize);
				Engine.getCanvasContext().font = "10px Arial";
				Engine.getCanvasContext().fillText(this.priceList[i].value,
									   this.priceList[i].pozX,
									   this.priceList[i].pozY);
			}
		}
	}

	updateTrapImagesPozition(): void {
  	this.buildImageSize = this.sizeX / 100 * 15;
  	//______________________________________________________________
  	const ox = this.sizeX / 100; // 1% of the x size of the trap menu
  	const oy = this.sizeY / 100; // 1% of the y size of the trap menu

	const sx = this.px; //the x start point of the calculation
	const sy = this.py; //the y start point of the calculation

  	// Fire trap poz
  	this.imagePozList[0].pozX = sx + ox * 11;
  	this.imagePozList[0].pozY = sy + oy * 8;

  	// Mine trap poz
  	this.imagePozList[1].pozX = sx + ox * 73;
  	this.imagePozList[1].pozY = sy + oy * 9;

  	// Ice spikes trap poz
  	this.imagePozList[2].pozX = sx + ox * 12;
  	this.imagePozList[2].pozY = sy + oy * 67;

  	// Poison trap poz
  	this.imagePozList[3].pozX = sx + ox  * 73;
  	this.imagePozList[3].pozY = sy + oy  * 67;
  	//_________________________________________|

  	//__________________________________________
  	// Fire trap price poz
  	this.priceList[0].pozX = sx + ox  * 13;
  	this.priceList[0].pozY = sy + oy * 36;

  	// Mine trap price poz
  	this.priceList[1].pozX = sx + ox  * 73;
  	this.priceList[1].pozY = sy + oy  * 36;

  	// Ice spikes price poz
  	this.priceList[2].pozX = sx + ox  * 12;
  	this.priceList[2].pozY = sy + oy  * 95;

  	// Poison trap price poz
  	this.priceList[3].pozX = sx + ox  * 73;
  	this.priceList[3].pozY = sy + oy * 95;
  	//______________________________________|
  }

	updateCollisionBoxPozition(): void {
		const ox = this.sizeX / 100; // 1% of the x size of the build Menu
		const oy = this.sizeY / 100; // 1% of the y size of the build Menu
		const sx = this.px;
		const sy = this.py;

		this.buildCollisionBox = [
			{x: sx + ox * 11,
			 y: sy + oy * 8,
			 size: ox * 25
			},

			{x: sx + ox * 73,
			 y: sy + oy * 9,
			 size: ox * 25
			},

			{x: sx + ox * 12,
				y: sy + oy * 67,
				size: ox * 25
			},

			{x: sx + ox * 73,
				y: sy + oy * 67,
				size: ox * 25
			},
		];
	}

	updatePriceList(): void {
		for (let i = 0; i < 4; i++) {
			this.priceList[i].value = TrapTypes[this.imagePozList[i].type]["price"];
		}
	}

	buildChosenTrap(index: number, mousePoz: MousePosition, fps : number): void {
		if (Engine.getMoney() >= this.priceList[index].value) {
			Engine.decreaseMoney(this.priceList[index].value);
			Engine.getGameStateSystem().reset();

			switch(index) {
				case 0:
					Engine.getTrapList().push(new Trap(TRAP_TYPE.MINE, 20, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 1:
					Engine.getTrapList().push(new Trap(TRAP_TYPE.FIRE, 10, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 2:
					Engine.getTrapList().push(new Trap(TRAP_TYPE.ICE_SPIKE, 5, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 3:
					Engine.getTrapList().push(new Trap(TRAP_TYPE.POISON, 5, this.trapPozX, this.trapPozY, 50, 50));
					break;
			}
		} else {
			this.applySoundLogic();
		}
	}

	applySoundLogic(): void {
		this.noGold.volume = Engine.getSound().on? 0.3 : 0;
		this.noGold.play();
	}
}
