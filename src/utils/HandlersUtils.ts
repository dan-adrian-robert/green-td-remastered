import {Engine} from "../Engine.";
import {FPS} from "../config/Globals";
import {MousePosition} from "../types/types";
import {roadAttributes} from "../objects/GameMap";
import {BuildingPlace} from "../objects/BuildingPlace";
import {Kamikaze} from "../objects/Kamikaze";
import {resetGame} from "./EngineSetup";

export const returnSelectedButton = (mousePos: any, list: any): number => {
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

export const upgradeSelectedTower = (mousePos: any) => {
    // const size = Engine.getUpgradeTower().upgradeCollisionBox.length;
    const l = Engine.getUpgradeTower().upgradeCollisionBox;

    for(let i = 0 ; i < 4; i++) {
        if(mouseInsideObject(mousePos, l[i].x, l[i].y, l[i].size, l[i].size )) {
            Engine.getUpgradeTower().applyUpgrade(i);
            Engine.getGameStateSystem().upgradeMode = false;
            break;
        }
    }

    //if we do not click on any upgrade buttons
    if(Engine.getGameStateSystem().upgradeMode)
        Engine.getGameStateSystem().upgradeMode = false;
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

    if (Engine.getGameStateSystem().buildMode) {
        Engine.getGameStateSystem().buildMode = false;
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

    if (Engine.getGameStateSystem().buildTrap) {
        Engine.getGameStateSystem().buildTrap = false;
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
            Engine.getGameStateSystem().buildTrap = true;
        }
    }

    const boxList: BuildingPlace[] =  Engine.getBoxList();

    for (let i = 0; i < Engine.getBoxList().length; i++) {
        const {px, py, sizeX, sizeY} = boxList[i];

        if (mouseInsideObject(mousePos, px, py, sizeX, sizeY)) {
            console.log('inside');
            Engine.getBuildSystem().updatePozition(Engine.getBoxList()[i], i);
            Engine.getGameStateSystem().buildMode = true;
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
            Engine.getUpgradeTower().updatePozition(listTowers[i], i);
            Engine.getGameStateSystem().upgradeMode = true;
        }
    }
}

export const applyButtonFunctionality = (index: number) => {
    if (Engine.getGameStateSystem().isMenu()) {
        switch(index) {
            case 0:
                Engine.getGameStateSystem().startGame();
                break;

            case 1:
                // TODO CHANGE THIS
                // Engine.getGameState().setDifficultyState();
                break;
        }
    } else if (Engine.getGameStateSystem().isSetDifficulty()) {
        Engine.getMenu().selectedDifficulty = index;
        Engine.getGameStateSystem().menuState();
    }

    if (Engine.getGameStateSystem().isGameStarted()) {
        switch(index) {
            case 1:
                if(Engine.getMoney() >= 30) {
                    Engine.decreaseMoney(30);
                    Engine.addAlly(new Kamikaze(620, 220, 'left', 8));
                }
                break;
        }
    }

    if(Engine.getGameStateSystem().isGameOver()){
        switch(index) {
            case 0:
                resetGame();
                Engine.getGameStateSystem().menuState();
                break;
        }
    }
}