import {Tower} from "../objects/Tower";
import {Engine} from "../Engine.";
import {FOLDER_PATHS} from "../../types/imageTypes";
import {BuildingPlace} from "../objects/BuildingPlace";
import {BuildTowerMetaData, MousePosition, TOWER_TYPE, UI_SOUNDS} from "../../types/types";
import {towerTypes} from "../../config/Towers";
import {SOUND_FOLDER_PATHS} from "../../types/SoundTypes";

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
	imagePozList: BuildTowerMetaData[];
	priceList: {pozX: number, pozY: number, value: number}[];
	buildCollisionBox: {x: number, y: number, size: number}[];

	indexTowerBuilded: number;
	noGold: any;
	indexBuildingPlace: number;

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

		this.noGold = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.UI, UI_SOUNDS.HUMAN_NO_GOLD);
		this.indexBuildingPlace = 0;
		this.init();
	}

	init(): void {
		this.priceList = [
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0},
			{pozX: 0, pozY: 0, value: 0}
		];

		const magmaTower = Engine.getImageMap()[FOLDER_PATHS.TOWERS].fireTower;
		const frostTower = Engine.getImageMap()[FOLDER_PATHS.TOWERS].frostTower;
		const cannonTower =  Engine.getImageMap()[FOLDER_PATHS.TOWERS].cannonTower;
		const boulderTower =  Engine.getImageMap()[FOLDER_PATHS.TOWERS].boulderTower;

		// this.imagePozList[0].image = magmaTower;
		// this.imagePozList[1].image = frostTower;
		// this.imagePozList[2].image = cannonTower;
		// this.imagePozList[3].image = boulderTower;
		// this.imagePozList[0].type = TOWER_TYPE.FIRE;
		// this.imagePozList[1].type = TOWER_TYPE.FROST;
		// this.imagePozList[2].type = TOWER_TYPE.CANNON;
		// this.imagePozList[3].type = TOWER_TYPE.BOULDER;

		this.imagePozList = [
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: TOWER_TYPE.FIRE, image: magmaTower},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: TOWER_TYPE.FROST, image: frostTower},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: TOWER_TYPE.CANNON, image: cannonTower},
			{pozX: 0, pozY: 0, sx: 90, sy : 110, type: TOWER_TYPE.BOULDER, image: boulderTower}
		];
	}

	updatePozition(buildingPlace: BuildingPlace, index: number): void {
		this.indexBuildingPlace = index;
		this.startX = buildingPlace.px - this.sw / 3.2;
		this.startY = buildingPlace.py - this.sh / 3.5;

		// Update the towers images position
		this.updateBuildImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList();
	}

	render(condition: boolean): void {
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

	updateBuildImagesPozition(): void {
		this.buildImageSize = this.sizeX / 100 * 15;
		const ox = this.sizeX / 100; // 1% of the x size of the build Menu
		const oy = this.sizeY / 100; // 1% of the y size of the build Menu

		const sx = this.startX;
		const sy = this.startY;

		this.imagePozList[0].pozX = sx + ox * 11;
		this.imagePozList[0].pozY = sy + oy * 8;

		this.imagePozList[1].pozX = sx + ox * 73;
		this.imagePozList[1].pozY = sy + oy * 9;

		this.imagePozList[2].pozX = sx + ox * 12;
		this.imagePozList[2].pozY = sy + oy * 67;

		this.imagePozList[3].pozX = sx + ox  * 73;
		this.imagePozList[3].pozY = sy + oy  * 67;

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
	}

	updateCollisionBoxPozition(): void {
		const ox = this.sizeX / 100; // 1% of the x size of the build Menu
		const oy = this.sizeY / 100; // 1% of the y size of the build Menu

		const sx = this.startX;
		const sy = this.startY;

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
			this.priceList[i].value = towerTypes[this.imagePozList[i].type]['cost'];
		}
	}

	buildTower(index: number, mousePoz: MousePosition, fps: number): void {
		const b: BuildingPlace = Engine.getBoxList()[this.indexBuildingPlace];

		if (Engine.getMoney() >= this.priceList[index].value) {
			Engine.decreaseMoney(this.priceList[index].value);
			Engine.getGameState().reset();

			const TowerTypeList: TOWER_TYPE[] = [TOWER_TYPE.FIRE, TOWER_TYPE.FROST, TOWER_TYPE.CANNON, TOWER_TYPE.BOULDER];
			const towerType:TOWER_TYPE = TowerTypeList[index];

			Engine.addTower(new Tower(towerType, 5, b.px, b.py, b.sizeX, b.sizeY, fps));
			Engine.removeBox(this.indexBuildingPlace);
		} else {
			this.applySoundLogic();
		}
	}

	applySoundLogic(): void {
		if (Engine.getSound().on) {
			this.noGold.volume = 0.3;
		} else {
			this.noGold.volume = 0;
		}
		this.noGold.play();
	}
}
