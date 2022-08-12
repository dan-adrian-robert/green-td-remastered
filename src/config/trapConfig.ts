import {TRAP_CONFIG, TRAP_METADATA, TRAP_TYPE} from "../types";
import {FOLDER_PATHS, GAME_ASSET_FORMAT} from "../imageTypes";

export const TrapTypes: TRAP_CONFIG = {
    [TRAP_TYPE.FIRE]: {
        price: 25,
        damage: 10,
        numberOfEnemies: 3,
        range: 20,
        effect: "burn",
        timeEffect: 5,
        state : "active",
        imageHeight: 100,
        imageWidth: 1000,
        spriteHeight: 100,
        spriteWidth: 100,
        animated: true,
        endAnimation: false,
        imageType: 'fire'
    },
    [TRAP_TYPE.MINE]: {
        price: 25,
        damage: 20,
        numberOfEnemies: 1,
        range: 50,
        effect: "none",
        timeEffect: 1,
        state : "off",
        imageHeight: 500,
        imageWidth: 400,
        spriteHeight: 100,
        spriteWidth: 100,
        animated: true,
        endAnimation: true,
        imageType: 'mine'
    },
    [TRAP_TYPE.ICE_SPIKE]: {
        price: 50,
        damage: 15,
        numberOfEnemies: 6,
        range: 25,
        effect: "slow",
        timeEffect: 10,
        state : "active",
        imageHeight: 100,
        imageWidth: 500,
        spriteHeight: 100,
        spriteWidth: 100,
        animated: false,
        endAnimation: true,
        imageType: 'iceSpikes'
    },
    [TRAP_TYPE.POISON]: {
        price: 40,
        damage: 10,
        numberOfEnemies: 3,
        range: 20,
        effect: "poison",
        timeEffect: 10,
        state : "active",
        imageHeight: 100,
        imageWidth: 500,
        spriteHeight: 100,
        spriteWidth: 100,
        animated: true,
        endAnimation: false,
        imageType: 'poison'
    }
};

export const getTrapMetadataData = (key: TRAP_TYPE): TRAP_METADATA => {
    return TrapTypes[key];
}

export const getTrapImages = (imageMap:GAME_ASSET_FORMAT, key: string) => {
    switch (key) {
        case 'fire':
            return imageMap[FOLDER_PATHS.TRAPS].fire
        case 'mine':
            return imageMap[FOLDER_PATHS.TRAPS].mine
        case 'poison':
            return imageMap[FOLDER_PATHS.TRAPS].poison
        case 'iceSpikes':
            return imageMap[FOLDER_PATHS.TRAPS].iceSpikes
        default:
            return imageMap[FOLDER_PATHS.TRAPS].fire
    }
}