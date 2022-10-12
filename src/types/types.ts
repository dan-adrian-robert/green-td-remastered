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

export enum LEVEL_SYSTEM_STATE {
    'BEFORE_LEVELS'='BEFORE_LEVELS',
    'LEVEL_STARTED'='LEVEL_STARTED',
    'BETWEEN_LEVELS'='BETWEEN_LEVELS',
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

export enum TRAP_TYPE {
    FIRE = 'FIRE',
    MINE = 'MINE',
    POISON = 'POISON',
    ICE_SPIKE = 'ICE_SPIKE',
}

export type TRAP_METADATA = {
    numberOfEnemies: number,
    price: number,
    damage: number,
    range: number,
    effect: any
    timeEffect: number,
    state: string,
    imageHeight: number,
    imageWidth: number,
    spriteHeight: number,
    spriteWidth: number,
    animated: boolean,
    endAnimation: boolean,
    imageType: any
}

export type TRAP_CONFIG = {
    [trap in TRAP_TYPE]: TRAP_METADATA
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
        dieSound: ENEMY_SOUNDS,
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
        effect: EFFECT,
        'time-effect': number,
    }
}

export enum EFFECT {
    NONE='NONE',
    BURN='BURN',
    SLOW='SLOW',
    STUN='STUN',
    POISON='POISON'
}

export type ACTIVE_EFFECTS = {
    [key in EFFECT] : {
        duration: number
        damage: number,
        slow: number,
        stun: number
    };
}

export interface DEBUFF {
    effect: EFFECT,
    duration: number,
    damage: number,
}

export enum ENEMY_SOUNDS {
    ARCHER= 'archer',
    DRAGON_DEAD='dragonDeath1',
    GOBLIN_DEAD='goblinDead',
    GRIFON='grifon',
    HUMAN_DEAD='humanDead',
    KNIGHT_DEAD='knightDead',
    MAGE='mage',
    MORTAR_DEAD='mortarDead',
    OGRE='ogre',
    ORC_DEAD='orcDead',
    RIDER_DEAD='riderDead',
}

export enum AMBIENT_SOUNDS {
    DEFEATED = 'defeated',
    NIGHT_ELF = 'nightElf',
}

export enum SPELL_SOUNDS {
    THUNDER = 'thunder',
}

export enum TOWERS_SOUNDS {
    ARCHER_SHOT = 'archerShoot',
    CANNON_SHOT ='cannonShoot',
    TOWER_SHOT ='towerShoot',
}

export enum UI_SOUNDS {
    BUTTON_CLICK = 'buttonClick',
    HUMAN_NO_GOLD = 'humanNoGold',
    NAGA_NO_GOLD = 'nagaNoGold',
    ORC_NO_GOLD = 'orcNoGold',
    RESEARCH_COMPLETE = 'researchComplete',
    UPGRADE_COMPLETE = 'upgradeCompleted',
}

export type ENEMY_SOUND_TYPE = {
    [key in ENEMY_SOUNDS]: any
}

export type SPELL_SOUND_TYPE = {
    [key in SPELL_SOUNDS]: any
}

export type AMBIENT_SOUND_TYPE = {
    [key in AMBIENT_SOUNDS]: any
}

export type TOWERS_SOUNDS_TYPE = {
    [key in TOWERS_SOUNDS]: any
}

export type UI_SOUNDS_TYPE = {
    [key in UI_SOUNDS]: any
}

export type SOUNDS_LIST = ENEMY_SOUNDS | AMBIENT_SOUNDS | SPELL_SOUNDS | TOWERS_SOUNDS | UI_SOUNDS;