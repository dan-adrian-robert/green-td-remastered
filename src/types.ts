export enum GameTypes  {
    'Easy'= 'Easy',
    'Medium'= 'Medium',
    'Hard'='Hard',
}

export enum Direction {
    'up'='up',
    'down'='down',
    'left'='left',
    'right'='right',
}

export enum GAME_STATE {
    'Menu'='Menu',
    'GamePlay'='GamePlay',
    'Pause'= 'Pause',
    'GameOver'='GameOver',
    'Difficulty'='Difficulty'
}

export enum MOB_TYPE {
    'demolitionSquad' = 'demolitionSquad',
    'footman'='footman',
    'orcGrunt'='orcGrunt',
    'knight'='knight',
    'orcRider'='orcRider',
    'dragon'='dragon',
    'gryphon'='gryphon',
    'archer'='archer',
    'ogre'='ogre',
    'mage'='mage',
}

export type ENEMY_CONFIG = {
    [mob in MOB_TYPE]: {
        hp: number,
        speed: number,
        damage: number,
        image_width: number,
        image_height: number,
        spriteWidth: number,
        spriteHeight: number,
        sizeX: number,
        sizeY: number,
        gold: number,
        dieSound: string,
    }
}

export type RoadAttribute = {
    x: number;
    y: number;
    sizeX: number;
    sizeY: number;
}

export type MousePosition = {
    x: number,
    y: number,
}

export interface ImageMetaData {
    pozX: number,
    pozY: number,
    sx: number,
    sy: number,
    image: any
}

export interface BuildTowerMetaData extends ImageMetaData {
    type: TOWER_TYPE;
}

export type UpgradeMetaData = {
    type: UPGRADE_TYPE,
    price: number,
    cost: number,
    value: number,
    lvl: number,
    maxLvl:number;
}

export enum UPGRADE_TYPE {
    RANGE = 'RANGE',
    FIRE_RATE = 'FIRE_RATE',
    DAMAGE = 'DAMAGE',
    EFFECT = 'EFFECT',
}

export enum TOWER_TYPE {
    FIRE = 'FIRE',
    FROST = 'FROST',
    CANNON = 'CANNON',
    BOULDER = 'BOULDER',
}

export type TowerConfig = {
    [key in TOWER_TYPE]: {
        hp: number,
        cost: number,
        range: number,
        bulletType: BULLET_TYPE,
        'fire-rate': number,
        'image-width': number,
        'image-height': number,
        'sprite-width': number,
        'sprite-height': number,
    }
};

export enum BULLET_TYPE {
    FIRE = 'FIRE',
    FROST = 'FROST',
    CANNON = 'CANNON',
    BOULDER = 'BOULDER',
    POISON = 'POISON'
}

export type BulletConfig = {
    [key in BULLET_TYPE]: {
        'bullet-speed': number,
        damage: number,
        effect: BULLET_EFFECT,
        'time-effect': number,
    }
}

export enum BULLET_EFFECT {
    BURN='BURN',
    SLOW='SLOW',
    NONE='NONE',
    STUN='STUN',
    POISON='POISON'
}