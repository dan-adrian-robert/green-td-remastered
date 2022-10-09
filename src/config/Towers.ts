import {BULLET_TYPE, TOWER_TYPE, TowerConfig} from "../types/types";
import {Engine} from "../engine/Engine.";
import {FOLDER_PATHS} from "../types/imageTypes";

export const towerTypes: TowerConfig = {
    [TOWER_TYPE.FIRE]: {
        "hp": 30,
        "cost": 70,
        "range": 150,
        bulletType: BULLET_TYPE.FIRE,
        "fire-rate": 15,
        "image-width": 450,
        "image-height": 550,
        "sprite-width": 90,
        "sprite-height": 110,
    },
    [TOWER_TYPE.FROST]: {
        "hp": 40,
        "cost": 60,
        "range": 250,
        bulletType: BULLET_TYPE.FROST,
        "fire-rate": 30,
        "image-width": 450,
        "image-height": 550,
        "sprite-width": 90,
        "sprite-height": 110,
    },
    [TOWER_TYPE.CANNON]: {
        "hp": 50,
        "cost": 50,
        "range": 300,
        bulletType: BULLET_TYPE.CANNON,
        "fire-rate": 25,
        "image-width": 450,
        "image-height": 550,
        "sprite-width": 90,
        "sprite-height": 110,
    },
    [TOWER_TYPE.BOULDER]: {
        "hp": 40,
        "cost": 30,
        "range": 400,
        bulletType: BULLET_TYPE.BOULDER,
        "fire-rate": 150,
        "image-width": 450,
        "image-height": 550,
        "sprite-width": 90,
        "sprite-height": 110,
    }
};

export const getTowerImage = (towerType: TOWER_TYPE): any => {
    switch (towerType) {
        case TOWER_TYPE.FIRE:
            return Engine.getImageMap()[FOLDER_PATHS.TOWERS].fireTower;
        case TOWER_TYPE.FROST:
            return Engine.getImageMap()[FOLDER_PATHS.TOWERS].frostTower;
        case TOWER_TYPE.CANNON:
            return Engine.getImageMap()[FOLDER_PATHS.TOWERS].cannonTower;
        case TOWER_TYPE.BOULDER:
            return Engine.getImageMap()[FOLDER_PATHS.TOWERS].boulderTower;
        default:
            console.log('[ERROR] while getting tower type');
            return Engine.getImageMap()[FOLDER_PATHS.TOWERS].fireTower;
    }
}