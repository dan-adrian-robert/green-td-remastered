import {ENEMY_CONFIG, MOB_TYPE} from "../types";

export const enemyTypes: ENEMY_CONFIG = {
    [MOB_TYPE.demolitionSquad]: {
        hp: 80,
        speed: 1,
        damage: 25,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 15,
        dieSound:'sound/enemies/mortarDead.wav'
    },
    [MOB_TYPE.footman]: {
        hp: 40,
        speed: 2,
        damage: 10,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 5,
        dieSound:'sound/enemies/humanDead.wav'
    },
    [MOB_TYPE.orcGrunt]: {
        hp: 50,
        speed: 2.1,
        damage: 10,
        image_width: 374,
        image_height: 298,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 7,
        dieSound:'sound/enemies/orcDead.wav'
    },
    [MOB_TYPE.knight]: {
        hp: 70,
        speed: 3,
        damage: 10,
        image_width: 375,
        image_height: 299,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 17,
        dieSound:'sound/enemies/knightDead.wav'
    },
    [MOB_TYPE.orcRider]: {
        hp: 65,
        speed: 3,
        damage: 20,
        image_width: 374,
        image_height: 298,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 15,
        dieSound:'sound/enemies/riderDead.wav'
    },
    [MOB_TYPE.dragon]: {
        hp: 400,
        speed: 1.5,
        damage: 25,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 30,
        dieSound:'sound/enemies/dragonDeath1.wav'
    },
    [MOB_TYPE.gryphon]: {
        hp: 50,
        speed: 2.5,
        damage: 10,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 12,
        dieSound:'sound/enemies/grifon.wav'
    },
    [MOB_TYPE.archer]: {
        hp: 20,
        speed: 2.2,
        damage: 15,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 7,
        dieSound:'sound/enemies/archer.wav'
    },
    [MOB_TYPE.ogre]: {
        hp: 350,
        speed: 2.3,
        damage: 30,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 20,
        dieSound:'sound/enemies/ogre.wav'
    },
    [MOB_TYPE.mage]: {
        hp: 35,
        speed: 1.8,
        damage: 25,
        image_width: 375,
        image_height: 300,
        spriteWidth: 75,
        spriteHeight: 75,
        sizeX: 75,
        sizeY: 75,
        gold: 10,
        dieSound:'sound/enemies/mage.wav'
    },
};

export const getEnemyHp = (type: MOB_TYPE) => {
    return enemyTypes[type].hp;
}
export const getEnemyBounty = (type: MOB_TYPE) => {
    return enemyTypes[type].gold;
}
export const getEnemyDamange = (type: MOB_TYPE) => {
    return enemyTypes[type].damage;
}
