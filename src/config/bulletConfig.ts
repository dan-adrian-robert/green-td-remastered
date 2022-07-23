import {BULLET_TYPE, BulletConfig} from "../types";
import {Engine} from "../engine/Engine.";
import {FOLDER_PATHS} from "../imageTypes";

export const bulletTypes: BulletConfig = {
    [BULLET_TYPE.FIRE]: {
        "bullet-speed": 15,
        damage: 12,
        effect: "burn",
        "time-effect": 8,
    },
    [BULLET_TYPE.FROST]: {
        "bullet-speed": 10,
        damage: 10,
        effect: "slow",
        "time-effect": 3,
    },
    [BULLET_TYPE.POISON]: {
        "bullet-speed": 20,
        damage: 8,
        effect: "poison",
        "time-effect": 2,
    },
    [BULLET_TYPE.CANNON]: {
        "bullet-speed": 15,
        damage: 15,
        effect: "none",
        "time-effect": 0,
    },
    [BULLET_TYPE.BOULDER]: {
        "bullet-speed": 20,
        damage: 10,
        effect: "stun",
        "time-effect": 2,
    }
};

export const getBulletImage = (bulletType: BULLET_TYPE): any => {
    switch (bulletType) {
        case BULLET_TYPE.FIRE:
            return Engine.getImageMap()[FOLDER_PATHS.BULLETS].fire;
        case BULLET_TYPE.BOULDER:
            return Engine.getImageMap()[FOLDER_PATHS.BULLETS].boulder;
        case BULLET_TYPE.CANNON:
            return Engine.getImageMap()[FOLDER_PATHS.BULLETS].cannonball;
        case BULLET_TYPE.POISON:
            return Engine.getImageMap()[FOLDER_PATHS.BULLETS].poisonOrb;
        case BULLET_TYPE.FROST:
            return Engine.getImageMap()[FOLDER_PATHS.BULLETS].frostOrb;
    }
}