import {Engine} from "../Engine.";
import {FOLDER_PATHS} from "../../imageTypes";
import {ImageMetaData, UI_SOUNDS} from "../../types";
import {Tower} from "../objects/Tower";
import {SOUND_FOLDER_PATHS} from "../../SoundTypes";

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

	upgradeImageSize: number;
	imagePozList: ImageMetaData[];
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
		this.priceList = [];
		this.upgradeCollisionBox = [];
		this.indexTowerUpgraded = -1;

		this.noGold = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.UI, UI_SOUNDS.HUMAN_NO_GOLD);

		this.init();
	}

	applySoundLogic() {
		this.noGold.volume = Engine.getSound().on ? 0.3 : 0;
		this.noGold.play();
	}

	init () {
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

		this.imagePozList = [
			{pozX: 0, pozY: 0, sx: 230, sy :229, image: range},
			{pozX: 0, pozY: 0, sx: 128, sy :128, image: firerate},
			{pozX: 0, pozY: 0, sx: 128, sy: 128, image: dmg},
			{pozX: 0, pozY: 0, sx: 250, sy :279, image: effect}
		];
	}

	updatePozition(tower: Tower, index: number) {
		this.indexTowerUpgraded = index;
		const x = (this.sizeX - tower.sizeX) / 2;
		const y = (this.sizeY - tower.sizeY) / 2;

		this.startX = tower.px - x;
		this.startY = tower.py - y;

		this.updateUpgradeImagesPozition();
		this.updateCollisionBoxPozition();
		this.updatePriceList(index);
	}

	render() {
		Engine.getCanvasContext().drawImage(this.upMenuImage,
								0, 0, this.sw, this.sh,
								this.startX, this.startY, this.sizeX, this.sizeY);

		for (let i = 0; i < 4; i++ ) {
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

		const sx = this.startX;
		const sy = this.startY;

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
	}

	updateCollisionBoxPozition() {
		const ox = this.sizeX / 100; // 1% of the x size of the upgrade Menu
		const oy = this.sizeY / 100; // 1% of the y size of the upgrade Menu

		const sx = this.startX;
		const sy = this.startY;

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
		for (let i = 0; i < 4; i++) {
			this.priceList[i].value = tower.upgradeTypes[i].price;
		}
	}

	applyUpgrade(index: number): void {
		if (this.priceList[index].value <= Engine.getMoney()) {
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
		} else {
			this.applySoundLogic();
		}
	}
}
