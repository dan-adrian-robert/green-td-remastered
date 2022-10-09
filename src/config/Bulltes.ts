import {BULLET_EFFECT, BULLET_TYPE, BulletConfig} from "../types/types";
import {Engine} from "../engine/Engine.";
import {FOLDER_PATHS} from "../types/imageTypes";

export const bulletTypes: BulletConfig = {
    [BULLET_TYPE.FIRE]: {
        "bullet-speed": 15,
        damage: 12,
        effect: BULLET_EFFECT.BURN,
        "time-effect": 8,
    },
    [BULLET_TYPE.FROST]: {
        "bullet-speed": 10,
        damage: 10,
        effect: BULLET_EFFECT.SLOW,
        "time-effect": 3,
    },
    [BULLET_TYPE.POISON]: {
        "bullet-speed": 20,
        damage: 8,
        effect: BULLET_EFFECT.POISON,
        "time-effect": 2,
    },
    [BULLET_TYPE.CANNON]: {
        "bullet-speed": 15,
        damage: 15,
        effect: BULLET_EFFECT.NONE,
        "time-effect": 0,
    },
    [BULLET_TYPE.BOULDER]: {
        "bullet-speed": 20,
        damage: 10,
        effect: BULLET_EFFECT.STUN,
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