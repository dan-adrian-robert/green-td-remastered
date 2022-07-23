import {Tower, towerTypes} from "../objects/Tower";
import {Engine} from "../Engine.";
import {FOLDER_PATHS} from "../../imageTypes";

export class BuildSystem {
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
	imagePozList: any[];
	priceList: any[];
	buildCollisionBox: any[];

	indexTowerBuilded: number;
	noGold: any;
	indexBuildingPlace: any;

	constructor (image: any, sw: number, sh: number, sizeX:number, sizeY: number) {
		// Build Menu Image
		this.buildMenuImage = image;

		this.sizeX = sizeX ;
		this.sizeY = sizeY;
		this.sw = sw ;
		this.sh = sh;

		// The sprite image
		this.spriteSizeX = 90;
		this.spriteSizeY = 110;

		// The start position of the build menu
		this.startX = 0;
		this.startY = 0;

		// Build option image size
		this.buildImageSize = 0;

		// The position list  of the build option images
		this.imagePozList = [];

		// The build option price list.
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
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: null, image: null},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: null, image: null}
		];

		this.priceList = [
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0}
		];

		const magmaTower = Engine.getImageMap()[FOLDER_PATHS.TOWERS].towersV1;
		const frostTower = Engine.getImageMap()[FOLDER_PATHS.TOWERS].frostTower;
		const cannonTower =  Engine.getImageMap()[FOLDER_PATHS.TOWERS].cannonTower;
		const boulderTower =  Engine.getImageMap()[FOLDER_PATHS.TOWERS].boulderTower;

		console.log(magmaTower);

		this.imagePozList[0].image = magmaTower;
		this.imagePozList[1].image = frostTower;
		this.imagePozList[2].image = cannonTower;
		this.imagePozList[3].image = boulderTower;
		this.imagePozList[0].type = "magma-tower";
		this.imagePozList[1].type = "frost-tower";
		this.imagePozList[2].type = "cannon-tower";
		this.imagePozList[3].type = "boulder-tower";
	}

	updatePozition(buildingPlace: any, index: number) {
		this.indexBuildingPlace = index;
		this.startX = buildingPlace.pozX - this.sw / 3.2;
		this.startY = buildingPlace.pozY - this.sh / 3.5;

		// Update the towers images position
		this.updateBuildImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList();
	}

	// Render function for the Build Menu.
	// Render the menu image and also the tower images.
	render(condition: boolean) {
		if (condition) {
			Engine.getCanvasContext().drawImage(this.buildMenuImage,
									0, 0, this.sw, this.sh,
									this.startX, this.startY, this.sizeX, this.sizeY);

			//draw the images for the tower
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


  // Update the tower images position based on the build menu position
  updateBuildImagesPozition() {
  	this.buildImageSize = this.sizeX / 100 * 15;
  	//______________________________________________________________
  	var ox = this.sizeX / 100; // 1% of the x size of the build Menu
  	var oy = this.sizeY / 100; // 1% of the y size of the build Menu

  	var sx = this.startX; //the x start point of the calculation
  	var sy = this.startY; //the y start point of the calculation

  	// Magma tower poz
  	this.imagePozList[0].pozX = sx + ox * 11;
  	this.imagePozList[0].pozY = sy + oy * 8;

  	// Frost tower poz
  	this.imagePozList[1].pozX = sx + ox * 73;
  	this.imagePozList[1].pozY = sy + oy * 9;

  	// Cannon tower poz
  	this.imagePozList[2].pozX = sx + ox * 12;
  	this.imagePozList[2].pozY = sy + oy * 67;

  	// boulder tower poz
  	this.imagePozList[3].pozX = sx + ox  * 73;
  	this.imagePozList[3].pozY = sy + oy  * 67;
  	//_________________________________________|

  	//__________________________________________
  	// Magma tower price poz
  	this.priceList[0].pozX = sx + ox  * 13;
  	this.priceList[0].pozY = sy + oy * 36;

  	// Frost tower price poz
  	this.priceList[1].pozX = sx + ox  * 73;
  	this.priceList[1].pozY = sy + oy  * 36;

  	// Cannon tower price poz
  	this.priceList[2].pozX = sx + ox  * 12;
  	this.priceList[2].pozY = sy + oy  * 95;

  	// boulder tower price poz
  	this.priceList[3].pozX = sx + ox  * 73;
  	this.priceList[3].pozY = sy + oy * 95;
  	//______________________________________|
  }//updateTowerImagesPozition

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
			this.priceList[i].value = towerTypes[this.imagePozList[i].type]['cost'];
		}
	}

	/**
	 * @description Check if we clicked on a building place.Place a new tower (must be in building mode).
	 * @param {*} mousePoz mouse position
	 * @param {*} fps number of frames per second
	 */
	buildTower(index: number, mousePoz: any, fps: number) {
		const b = Engine.getBoxList()[this.indexBuildingPlace];
		if(Engine.getMoney() >= this.priceList[index].value) {
			Engine.decreaseMoney(this.priceList[index].value);
			Engine.getGameState().reset();

			switch(index) {
				case 0:
					Engine.addTower(new Tower('magma-tower', 5, b.pozX, b.pozY, b.size, b.size,fps));
					break;

				case 1:
					Engine.addTower(new Tower('frost-tower', 5, b.pozX, b.pozY, b.size, b.size,fps));
					break;

				case 2:
					Engine.addTower(new Tower('cannon-tower', 5, b.pozX, b.pozY, b.size, b.size,fps));
					break;

				case 3:
					Engine.addTower(new Tower('boulder-tower', 5, b.pozX, b.pozY, b.size, b.size,fps));
					break;
			}

			Engine.removeBox(this.indexBuildingPlace);
		} else {
			this.applySoundLogic();
		}
	}

	applySoundLogic() {
		if(Engine.getSound().on) {
			this.noGold.volume = 0.3;
		}else {
			this.noGold.volume = 0;
		}
		this.noGold.play();
	}
}
