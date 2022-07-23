import {Trap, trapTypes} from "../objects/Trap";
import {Engine} from "../Engine.";

export class PlaceTrap {

	buildMenuImage: any;
	sizeX: number;
	sizeY: number;

	sw: number;
	sh: number;

	spriteSizeX: number;
	spriteSizeY: number;

	startX: number;
	startY: number;

	buildImageSize: number;
	trapPozX: number;
	trapPozY: number;
	imagePozList: any[];
	priceList: any[];
	buildCollisionBox: any[];
	indexTowerBuilded: number;

	noGold: any;

	constructor (image: any, sw: number, sh: number, sizeX: number, sizeY: number) {
		this.buildMenuImage = image;
		this.sizeX = sizeX ;
		this.sizeY = sizeY;
		this.sw = sw ;
		this.sh = sh;

		// The sprite image
		this.spriteSizeX = 100;
		this.spriteSizeY = 100;

		// The start position of the trap menu
		this.startX = 0;
		this.startY = 0;

		// Build option image size
		this.buildImageSize = 0;

		this.trapPozX = 0;
		this.trapPozY = 0;

		// The position list  of the trap option images
		this.imagePozList = [];

		// The trap options price list.
		this.priceList = [];

		this.buildCollisionBox = [];
		this.indexTowerBuilded = -1;

		this.noGold = new Audio();
		this.noGold.volume = 0.3;
		this.noGold.src = 'sound/ui/humanNoGold.wav';

		this.init();
	}

	init() {
		this.imagePozList = [
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 100, sy : 100, type: null, image: null}
		];

		this.priceList = [
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0}
		];

		// the mine trap image
		var explosion = new Image(this.imagePozList[0].sx,
							  this.imagePozList[0].sy);
		explosion.src = "images/traps/mine.png";

		// the fire trap image
		var fire = new Image(this.imagePozList[1].sx,
							  this.imagePozList[1].sy);
		fire.src = "images/traps/fire.png";

		// the ice spikes trap image
		var iceSpikes = new Image(this.imagePozList[2].sx,
							  this.imagePozList[2].sy);
		iceSpikes.src = "images/traps/ice_spikes.png";

		// the poison trap image
		var poison = new Image(this.imagePozList[3].sx,
							  this.imagePozList[3].sy);
		poison.src = "images/traps/poison.png";

		this.imagePozList[0].image = explosion;
		this.imagePozList[1].image = fire;
		this.imagePozList[2].image = iceSpikes;
		this.imagePozList[3].image = poison;
		this.imagePozList[0].type = "mine";
		this.imagePozList[1].type = "fire";
		this.imagePozList[2].type = "ice-spikes";
		this.imagePozList[3].type = "poison";
  }

  // Update the position of the trap menu.
	updatePozition(mousePos: any) {
		this.startX = mousePos.x - this.sw / 2.1;
		this.startY = mousePos.y - this.sh / 2.1;
		this.trapPozX = mousePos.x - 25;
		this.trapPozY = mousePos.y - 25;

		// Update the trap images position
		this.updateTrapImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList();
	}//updatePozition

	// Render function for the trap menu.
	// Render the menu image and also the trap images.
	render(condition: boolean) {
    if (condition) {
		Engine.getCanvasContext().drawImage(this.buildMenuImage,
								0, 0, this.sw, this.sh,
								this.startX, this.startY, this.sizeX, this.sizeY);

		//draw the images for the traps
		for(let i = 0; i < 4; i++ ) {
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

  // Update the trap images position based on the build menu position
  updateTrapImagesPozition() {
  	this.buildImageSize = this.sizeX / 100 * 15;
  	//______________________________________________________________
  	var ox = this.sizeX / 100; // 1% of the x size of the trap menu
  	var oy = this.sizeY / 100; // 1% of the y size of the trap menu

  	var sx = this.startX; //the x start point of the calculation
  	var sy = this.startY; //the y start point of the calculation

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

  updateCollisionBoxPozition() {
		var ox = this.sizeX / 100; // 1% of the x size of the build Menu
		var oy = this.sizeY / 100; // 1% of the y size of the build Menu

		var sx = this.startX; //the x start point of the calculation
		var sy = this.startY; //the y start point of the calculation

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

	updatePriceList() {
		for(let i = 0; i < 4; i++) {
			this.priceList[i].value = trapTypes[this.imagePozList[i].type]["price"];
		}
	}

	/**
	 * @description Check if we clicked on a building place.Place a new tower (must be in building mode).
	 * @param {*} mousePoz mouse position
	 * @param {*} fps number of frames per second
	 */
	buildChosenTrap(index: number, mousePoz: any, fps : number) {

		if(Engine.getMoney() >= this.priceList[index].value) {
			Engine.decreaseMoney(this.priceList[index].value);
			Engine.getGameState().reset();

			switch(index) {
				case 0:
					Engine.getTrapList().push(new Trap('mine', 20, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 1:
					Engine.getTrapList().push(new Trap('fire', 10, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 2:
					Engine.getTrapList().push(new Trap('ice-spikes', 5, this.trapPozX, this.trapPozY, 50, 50));
					break;

				case 3:
					Engine.getTrapList().push(new Trap('poison', 5, this.trapPozX, this.trapPozY, 50, 50));
					break;
			}
		} else {
			this.applySoundLogic();
		}
	}

	applySoundLogic() {
		this.noGold.volume = Engine.getSound().on? 0.3 : 0;
		this.noGold.play();
	}
}
