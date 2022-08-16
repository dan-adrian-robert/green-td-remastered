import {Border} from "./objects/Border";
import {Engine} from "./Engine.";
import { FOLDER_PATHS } from "../imageTypes";
import {MousePosition} from "../types";
import {Enemy} from "./objects/Enemy";

export const calculateMousePos = (evt: any): MousePosition => {
	const rect = Engine.getCanvas().getBoundingClientRect();
	const root = document.documentElement;
	const mouseX = evt.clientX - rect.left - root.scrollLeft;
	const mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX,
		y:mouseY
	};
}

export const collideBulletsEnemies = () => {
	const listEnemy = Engine.getEnemyList();
	const listBullets = Engine.getBulletList();

	for (let i = 0; i < listEnemy.length; i++) {
		for (let j = 0; j < listBullets.length; j++) {
				const ex = listEnemy[i].px + listEnemy[i].sizeX / 2;
				const ey = listEnemy[i].py + listEnemy[i].sizeY / 2;

				const bx = listBullets[j].px + listBullets[j].sizeX / 2;
				const by = listBullets[j].py + listBullets[j].sizeY / 2;

				const rx = (listEnemy[i].sizeX + listBullets[j].sizeY) / 2;
				const ry = (listEnemy[i].sizeY + listBullets[j].sizeY) / 2;

				 //collision happens
				if(Math.abs(ex - bx) < rx &&
				   Math.abs(ey - by) < ry) {
						listEnemy[i].hp.value -= listBullets[j].dmg;

						// add bullet de-buff
						listEnemy[i].addEffect({effect: listBullets[j].effect,
													duration: listBullets[j].effectDuration,
													damage: listBullets[j].dmg,
												});
						listBullets.splice(j,1);
				}
		}
	}
}

export const collideAlliesEnemies = () => {
	const listEnemy = Engine.getEnemyList();
	const listAlly = Engine.getAllyList();

 	for (let i = 0; i < listEnemy.length; i++) {
 		for (let j = 0; j < listAlly.length; j++) {
 				const ex = listEnemy[i].px + listEnemy[i].sizeX / 2;
 				const ey = listEnemy[i].py + listEnemy[i].sizeY / 2;

 				const bx = listAlly[j].px + listAlly[j].sizeX / 2;
 				const by = listAlly[j].py + listAlly[j].sizeY / 2;

 				const rx = (listEnemy[i].sizeX + listAlly[j].sizeY - 60) / 2;
 				const ry = (listEnemy[i].sizeY + listAlly[j].sizeY - 30) / 2;

 				if (Math.abs(ex - bx) < rx && Math.abs(ey - by) < ry) {
 						listEnemy[i].hp.value -= listAlly[j].damage;
 						listAlly[j].hp = -1;
 						listAlly.splice(j,1);
 				}
 		}
 	}
 }

export const collideTrapsEnemies = () => {
	const listEnemy: Enemy[] = Engine.getEnemyList();
	const listTraps = Engine.getAllyList();

	for (let i = 0; i < listEnemy.length; i++) {
		for (let j = 0; j < listTraps.length; j++) {
			const ex = listEnemy[i].px + listEnemy[i].sizeX / 2;
			const ey = listEnemy[i].py + listEnemy[i].sizeY / 2;

			const bx = listTraps[j].px + listTraps[j].sizeX / 2;
			const by = listTraps[j].py + listTraps[j].sizeY / 2;

			const rx = (listEnemy[i].sizeX + listTraps[j].sizeX - 80) / 2;
			const ry = (listEnemy[i].sizeY + listTraps[j].sizeY - 20) / 2;

			/*
			if (listTraps[j].enemies.includes(i + listEnemy[i].enemyType) === false &&
				 		listTraps[j].enemies.length < listTraps[j].numberOfEnemies) {
				 //collision happens
				if(Math.abs(ex - bx) < rx &&
				   Math.abs(ey - by) < ry) {
						listEnemy[i].debuffs.push({"effect": listTraps[j].effect,
													"effect_duration": listTraps[j].effectDuration,
													"dmg": listTraps[j].damage,
												})
					 listTraps[j].enemies.push(i + listEnemy[i].enemyType);
				}
			}
			*/
		}
	}
}

export const checkIfAllyOnFinalCp = (): void => {
	const listAlly = Engine.getAllyList();
	for (let i = 0; i < listAlly.length; i++) {
		if (listAlly[i].px < 20) {
			listAlly.splice(i, 1);
		}
	}
}

export const eraseEnemies = (): void => {
	const listEnemy = Engine.getEnemyList();

	for (let i = 0; i < listEnemy.length; i++) {
		if (listEnemy[i].hp.value <= 0) {
			listEnemy[i].applySoundLogic();
			Engine.addMoney(listEnemy[i].bounty);
			listEnemy.splice(i,1);
		}
	}
}

export const eraseTraps = () => {
	const listTraps = Engine.getTrapList();

	for(let i = 0; i < listTraps.length; i++) {
		if(listTraps[i].enemies.length === listTraps[i].numberOfEnemies) {
			listTraps.splice(i,1);
		}
	}
}

export const eraseAllies = () => {
	const listAlly = Engine.getAllyList();

	for(let i = 0; i < listAlly.length; i++) {
		if(listAlly[i].hp <= 0) {
			listAlly.splice(i, 1);
		}
	}
}

//Collission between enemies and base
export const collideEnemiesBase = () => {
	//the last Checkpoint will be inside the base
	const baseCp = Engine.getMap().checkPoints[Engine.getMap().checkPoints.length - 1];

	//the checkpoint middle coordinates
	const bx = baseCp.x + baseCp.size/2;
	const by = baseCp.y + baseCp.size/2;

	const listEnemy: Enemy[] = Engine.getEnemyList();
	for (let i = 0; i < listEnemy.length; i++) {
		const ex = listEnemy[i].px + listEnemy[i].sizeX / 2;
		const ey = listEnemy[i].py + listEnemy[i].sizeY / 2;

		const rx = (listEnemy[i].sizeX + baseCp.size) / 2;
		const ry = (listEnemy[i].sizeY + baseCp.size) / 2;


		if(Math.abs(ex - bx) < rx &&
		   Math.abs(ey - by) < ry) {
		   		Engine.getBase().hp.value -= listEnemy[i].dmg;
				listEnemy.splice(i,1);
		}
	}

	if (Engine.getBase().hp.value <= 0) {
		Engine.getGameState().loseGame();
	}
};


export const initGame = () => {
	const border: Border = new Border(
		Engine.getImageMap()[FOLDER_PATHS.UI].border,
		Engine.getImageMap()[FOLDER_PATHS.UI].border,
		500, 500,25,27);

	Engine.setBorder(border);
	// const borderMenu = new Image(100, 100);
	// borderMenu.src = "images/ui/menuBorder.png";
	//
	// Engine.draw(boder.borderMenu, 1,2,15,15,15,15,15,15);
	//
	//
	//
	const imageMap = Engine.getImageMap();

	// Engine.setBorder( new Border(imageMap.ui.menuBorder, imageMap.ui.border, 500, 500,25,27))

	// Engine.setMenu(new Menu("images/ui/menu.png", 999, 712,
	// 				"images/ui/option.png", 300, 90,
	// 				"images/ui/border.png", 230, 190,
	// 				"images/ui/gameoVER.png", 640, 419));
	// Engine.setSound(new Sound("images/sound/sound.png", "images/sound/noSound.png", 30, 30, 30, 25, 30, 30));
	// Engine.setSpell(new Spell("images/spells/aoe.png", 550, 550,
	// 	"images/spells/thunder.png", 228, 215,
	// 	150, 150,
	// 	150, 150,
	// 	76, 215,
	// 	75, 150,
	// 	300, 200,'sound/spells/thunder.wav'));
	//
	// Engine.setGameState(new GameState());
	//
	// initEntities();
	// initWorld();
	// Engine.setLevel(new Level(1, "Easy", 10, ['footman', 'grunt'], 1, 0));
}

