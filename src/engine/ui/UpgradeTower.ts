import {Engine} from "../Engine.";
import {FOLDER_PATHS} from "../../imageTypes";

export class UpgradeTower {
	upMenuImage: any;

	buildMenuImage: any;
	sizeX: number;
	sizeY: number;

	sw: number;
	sh: number;

	spriteSizeX: number;
	spriteSizeY: number;

	startX: number;
	startY: number;

	upgradeImageSize: any;
	imagePozList: any;
	priceList: any;
	upgradeCollisionBox: any[];
	indexTowerUpgraded: number;

	noGold: any;

	constructor(image: any, sw: number, sh: number, sizeX: number, sizeY: number) {
		//build Menu Image image
		this.upMenuImage = image;
		this.sizeX = sizeX ;
		this.sizeY = sizeY;
		this.sw = sw ;
		this.sh = sh;

		//the sprite image
		this.spriteSizeX = 450;
		this.spriteSizeY = 550;

		//the start position of the upgrade menu
		this.startX = 0;
		this.startY = 0;

		//upgrades image size
		this.upgradeImageSize = 0;

		//The position list  of the upgrades images
		this.imagePozList = [];

		//The upgrade price list.
		this.priceList = [];

		this.upgradeCollisionBox = [];
		this.indexTowerUpgraded = -1;

		this.noGold = new Audio();
		this.noGold.volume = 0.3;
		this.noGold.src = 'sound/ui/humanNoGold.wav';

		this.init();
	}

	applySoundLogic() {
		this.noGold.volume = Engine.getSound().on ? 0.3 : 0;
		this.noGold.play();
	}

	//Sets the position of the upgrade menu and upgrade images.
	init () {
		this.imagePozList = [
			{pozX: 0, pozY: 0, sx: 230, sy :229, image: null},
			{pozX: 0, pozY: 0, sx: 128, sy :128, image: null},
			{pozX: 0, pozY: 0, sx: 128, sy: 128, image: null},
			{pozX: 0, pozY: 0, sx: 250, sy :279, image: null}
		];

		this.priceList = [
			{pozX: 0, pozY: 0, value: 25},
			{pozX: 0, pozY: 0, value: 45},
			{pozX: 0, pozY: 0, value: 50},
			{pozX: 0, pozY: 0, value: 100}
		];

		const range = Engine.getImageMap()[FOLDER_PATHS.UPGRADES].range;
		const firerate = Engine.getImageMap()[FOLDER_PATHS.UPGRADES].firerate;
		const dmg = Engine.getImageMap()[FOLDER_PATHS.UPGRADES].dmg;
		const effect = Engine.getImageMap()[FOLDER_PATHS.UPGRADES].effect;

		this.imagePozList[0].image = range;
		this.imagePozList[1].image = firerate;
		this.imagePozList[2].image = dmg;
		this.imagePozList[3].image = effect;
	}

	updatePozition(tower: any, index: number) {
		this.indexTowerUpgraded = index;
		const x = (this.sizeX - tower.sizeX) / 2;
		const y = (this.sizeY - tower.sizeY) / 2;

		this.startX = tower.pozX - x;
		this.startY = tower.pozY - y;

		this.updateUpgradeImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList(index);
	}

	render() {
		Engine.getCanvasContext().drawImage(this.upMenuImage,
								0, 0, this.sw, this.sh,
								this.startX, this.startY, this.sizeX, this.sizeY);

		//draw the images for the upgrades
		for(let i = 0; i < 4; i++ ) {
			Engine.getCanvasContext().drawImage(this.imagePozList[i].image,
									0, 0,
									this.imagePozList[i].sx, this.imagePozList[i].sy,
									this.imagePozList[i].pozX, this.imagePozList[i].pozY,
									this.upgradeImageSize, this.upgradeImageSize);
			Engine.getCanvasContext().font = "10px Arial";
			Engine.getCanvasContext().fillText(this.priceList[i].value,
								   this.priceList[i].pozX,
								   this.priceList[i].pozY);
		}
	}

	//update the upgrade images position based on the upgrade menu position
	updateUpgradeImagesPozition() {
		this.upgradeImageSize = this.sizeX / 100 * 15;
		//______________________________________________________________
		const ox = this.sizeX / 100; // 1% of the x size of the upgrade Menu
		const oy = this.sizeY / 100; // 1% of the y size of the upgrade Menu

		const sx = this.startX; //the x start point of the calculation
		const sy = this.startY; //the y start point of the calculation

		//range poz
		this.imagePozList[0].pozX = sx + ox * 11;
		this.imagePozList[0].pozY = sy + oy * 8;

		//firerate poz
		this.imagePozList[1].pozX = sx + ox * 73;
		this.imagePozList[1].pozY = sy + oy * 9;

		//dmg poz
		this.imagePozList[2].pozX = sx + ox * 12;
		this.imagePozList[2].pozY = sy + oy * 67;

		//effect poz
		this.imagePozList[3].pozX = sx + ox  * 73;
		this.imagePozList[3].pozY = sy + oy  * 67;
		//_________________________________________|

		//__________________________________________
		//range price poz
		this.priceList[0].pozX = sx + ox  * 13;
		this.priceList[0].pozY = sy + oy * 36;

		//firerate poz
		this.priceList[1].pozX = sx + ox  * 73;
		this.priceList[1].pozY = sy + oy  * 36;

		//effect poz
		this.priceList[2].pozX = sx + ox  * 12;
		this.priceList[2].pozY = sy + oy  * 95;

		//effect poz
		this.priceList[3].pozX = sx + ox  * 73;
		this.priceList[3].pozY = sy + oy * 95;
		//______________________________________|
	}

	updateCollisionBoxPozition() {
		const ox = this.sizeX / 100; // 1% of the x size of the upgrade Menu
		const oy = this.sizeY / 100; // 1% of the y size of the upgrade Menu

		const sx = this.startX; //the x start point of the calculation
		const sy = this.startY; //the y start point of the calculation

		this.upgradeCollisionBox = [
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

	updatePriceList (index: number) {
		const tower = Engine.getTowerList()[index];
		for(let i = 0; i < 4; i++) {
			this.priceList[i].value = tower.upgradeTypes[i].price;
		}
	}

	applyUpgrade(index: number) {
		if(this.priceList[index].value <= Engine.getMoney()) {
			Engine.decreaseMoney(this.priceList[index].value);
			switch(index) {
				case 0:
					Engine.getTowerList()[this.indexTowerUpgraded].upgradeRange();
					break;

				case 1:
					Engine.getTowerList()[this.indexTowerUpgraded].upgradeFireRate();
					break;

				case 2:
					Engine.getTowerList()[this.indexTowerUpgraded].upgradeDmg();
					break;

				case 3:
					Engine.getTowerList()[this.indexTowerUpgraded].upgradeEffect();
					break;
			}
		}else {
			this.applySoundLogic();
		}
	}
}
