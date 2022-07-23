import {calculateMousePos} from './UserActions';
import {FPS} from "../config/globals";
import {Kamikaze} from "./objects/Kamikaze";
import {roadAttributes} from "./objects/GameMap";
import {Engine} from "./Engine.";
import {resetGame} from "./objects/EngineSetup";
import {MousePosition} from "../types";
import {BuildingPlace} from "./objects/BuildingPlace";

export const handleMouseMove = (evt: any) => {
	const mousePos = calculateMousePos(evt);

	if (Engine.getGameState().isMenu()) {
		Engine.getMenu().optionSelected = returnSelectedButton(mousePos, Engine.getMenu().buttonPoz);
	}

	if (Engine.getGameState().isGameOver()) {
		Engine.getMenu().gameOverOptionSelected = returnSelectedButton(mousePos,Engine.getMenu().gameOverButtons);
	}

	Engine.getSpell().setAoePoz(mousePos);
}

export const handleMouseClick = (evt: any) => {
	const mousePos: MousePosition = calculateMousePos(evt);

	if (mouseInsideObject(mousePos, Engine.getSound().pozX,  Engine.getSound().pozY, Engine.getSound().sizeX, Engine.getSound().sizeY)) {
		Engine.getSound().clickSound();
	}

	if(Engine.getGameState().isSetDifficulty()) {
		applyButtonFunctionality(returnSelectedButton(mousePos, Engine.getMenu().diffPoz));
	}else if(Engine.getGameState().isMenu()) {
		applyButtonFunctionality(returnSelectedButton(mousePos, Engine.getMenu().buttonPoz));
	}

	if (Engine.getGameState().placeSpell) {
		Engine.getGameState().placeSpell = false;
		Engine.getSpell().cast();
	} else if (Engine.getGameState().buildTrap) {
		buildSelectedTrap(mousePos);
	} else if (Engine.getGameState().buildMode) {
		buildSelectedTower(mousePos);
	} else if (Engine.getGameState().upgradeMode) {
		upgradeSelectedTower(mousePos);
	} else if (Engine.getGameState().isGameStarted()) {
		if( (mousePos.x >= 790 && mousePos.x <= 842) &&
			(mousePos.y >= 180 && mousePos.y <= 235)) {
				applyButtonFunctionality(1);
			}
		displaySelectedObject(mousePos);
	}

	if (Engine.getGameState().isGameOver()) {
		applyButtonFunctionality(returnSelectedButton(mousePos,Engine.getMenu().gameOverButtons));
	}
}

export const upgradeSelectedTower = (mousePos: any) => {
	// const size = Engine.getUpgradeTower().upgradeCollisionBox.length;
	const l = Engine.getUpgradeTower().upgradeCollisionBox;

	for(let i = 0 ; i < 4; i++) {
		if(mouseInsideObject(mousePos, l[i].x, l[i].y, l[i].size, l[i].size )) {
			Engine.getUpgradeTower().applyUpgrade(i);
			Engine.getGameState().upgradeMode = false;
			break;
		}
	}

	//if we do not click on any upgrade buttons
	if(Engine.getGameState().upgradeMode)
		Engine.getGameState().upgradeMode = false;
}

export const buildSelectedTower = (mousePos: any) => {
	// const size = Engine.getBuildSystem().buildCollisionBox.length;
	const l = Engine.getBuildSystem().buildCollisionBox;
	console.log(l);

	for (let i = 0 ; i < 4; i++) {
		if (mouseInsideObject(mousePos, l[i].x, l[i].y, l[i].size, l[i].size )) {
			Engine.getBuildSystem().buildTower(i, mousePos, FPS);
			break;
		}
	}

	if (Engine.getGameState().buildMode) {
		Engine.getGameState().buildMode = false;
	}
}

export const buildSelectedTrap = (mousePos: any) => {
	// const size = Engine.getPlaceTrap().buildCollisionBox.length;
	const l = Engine.getPlaceTrap().buildCollisionBox;

	for (let i = 0 ; i < 4; i++) {
		if (mouseInsideObject(mousePos, l[i].x, l[i].y, l[i].size, l[i].size )) {
			Engine.getPlaceTrap().buildChosenTrap(i, mousePos, FPS);
			break;
		}
	}

	if (Engine.getGameState().buildTrap) {
		Engine.getGameState().buildTrap = false;
	}
}

export const mouseInsideObject = (mousePos: MousePosition, x: number, y: number, sizeX: number, sizeY: number): boolean => {
	return mousePos.x > x && mousePos.x < x + sizeX &&
		mousePos.y > y && mousePos.y < y + sizeY;
}

export const displaySelectedObject = (mousePos: MousePosition): void => {
	for (let i = 0; i < roadAttributes.length; i++) {
		const {x, y, sizeX, sizeY} =  roadAttributes[i];

		if(mouseInsideObject(mousePos, x, y, sizeX, sizeY)) {
			Engine.getPlaceTrap().updatePozition(mousePos);
			Engine.getGameState().buildTrap = true;
		}
	}

	const boxList: BuildingPlace[] =  Engine.getBoxList();

	console.log(mousePos);

	for (let i = 0; i < Engine.getBoxList().length; i++) {
		const {px, py, sizeX, sizeY} = boxList[i];

		if (mouseInsideObject(mousePos, px, py, sizeX, sizeY)) {
			console.log('inside');
			Engine.getBuildSystem().updatePozition(Engine.getBoxList()[i], i);
			Engine.getGameState().buildMode = true;
		}
	}

	const listTowers = Engine.getTowerList();
	console.log(listTowers);
	//Tower clicks
	for (let i = 0; i < listTowers.length; i++) {
		const x = listTowers[i].px;
		const y = listTowers[i].py;
		const sizeX = listTowers[i].sizeX;
		const sizeY = listTowers[i].sizeY;

		if(mouseInsideObject(mousePos, x, y, sizeX, sizeY)) {
			console.log('inside tower boy');
			Engine.getUpgradeTower().updatePozition(listTowers[i], i);
			Engine.getGameState().upgradeMode = true;
		}
	}
}

export const returnSelectedButton = (mousePos: any, list: any) => {
	for(let i = 0; i < list.length; i++) {
		const x = list[i].x;
		const y = list[i].y;
		const sizeX = list[i].sizeX;
		const sizeY = list[i].sizeY;

		if(mouseInsideObject(mousePos, x, y, sizeX, sizeY)) {
			return i;
		}
	}
	return -1;
}

export const applyButtonFunctionality = (index: number) => {
	if (Engine.getGameState().isMenu()) {
		switch(index) {
			case 0:
				Engine.getGameState().startGame();
				break;

			case 1:
				// TODO CHANGE THIS
				// Engine.getGameState().setDifficultyState();
				break;
		}
	} else if (Engine.getGameState().isSetDifficulty()) {
		Engine.getMenu().selectedDifficulty = index;
		Engine.getGameState().menuState();
	}

	if (Engine.getGameState().isGameStarted()) {
		switch(index) {
			case 1:
				if(Engine.getMoney() >= 30) {
					Engine.decreaseMoney(30);
					Engine.addAlly(new Kamikaze(620, 220, 'left', 8));
				}
				break;
		}
	}

	if(Engine.getGameState().isGameOver()){
		switch(index) {
			case 0:
				resetGame();
				Engine.getGameState().menuState();
				break;
		}
	}
}

export const handleKeyPressed = (event: any) => {
	const code = event.keyCode;
	Engine.getGameState().reset();
	switch (code) {
		// TODO CHANGE THIS
		// case 76:
		// 	if(Engine.getGameState().isGameStarted())
		// 		tower.upgradeTower();
		// 	break;
		// //A
		// case 65:
		// 	if(gameState.isGameStarted())
		// 		Engine.addEnemy(new Enemy( 210, 140, 35, 35, 35, 35, 0, 60, 'right', 2, 5));
		// 	break;

		case 82:
			if (Engine.getGameState().isGameStarted()) {
				Engine.getGameState().setRenderState();
			}
			break;

		case 83:
			if (!Engine.getGameState().buildTrap && !Engine.getGameState().buildMode && !Engine.getGameState().upgradeMode) {
				Engine.getGameState().placeSpell = true;
			}
			break;

		case 88:
			if (Engine.getGameState().isGameStarted()) {
				Engine.getGameState().applySoundLogic();
				Engine.getGameState().loseGame();
			}
			break;

		default:
			Engine.getGameState().reset();
			break;
	}
}
