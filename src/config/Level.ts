import {GameTypes, MOB_TYPE} from "../types/types";

export enum LEVEL_TYPE {
    DOUBLE_PATH='doublePath',
    BUFF_ENEMIES='buffUP',
    DOUBLE_ENEMY= 'doubleEnemy',
    BOSS= 'ARMAGEDON'
}

export const SPECIAL_LVL_LIST: LEVEL_TYPE[] = [
    LEVEL_TYPE.DOUBLE_PATH,
    LEVEL_TYPE.BUFF_ENEMIES,
    LEVEL_TYPE.DOUBLE_ENEMY,
    LEVEL_TYPE.BOSS,
]

export const LEVELS_CONFIG = [
    {numLevel:1, numberEnemies:1, typeEnemies: [MOB_TYPE.footman], isBoss:false, spawnPoints:[0]},
    {numLevel:2, numberEnemies:1, typeEnemies: [MOB_TYPE.orcGrunt], isBoss:false, spawnPoints:[0]},
    {numLevel:3, numberEnemies:1, typeEnemies: [MOB_TYPE.demolitionSquad], isBoss:false, spawnPoints:[0]},
    {numLevel:4, numberEnemies:1, typeEnemies: [MOB_TYPE.knight], isBoss:false, spawnPoints:[0]},
    {numLevel:5, numberEnemies:1, typeEnemies: [MOB_TYPE.dragon], isBoss:true, spawnPoints:[0]},
    {numLevel:6, numberEnemies:1, typeEnemies: [MOB_TYPE.mage], isBoss:false,spawnPoints:[0]},
    {numLevel:7, numberEnemies:1, typeEnemies: [MOB_TYPE.orcRider], isBoss:false, spawnPoints:[0]},
    {numLevel:8, numberEnemies:1, typeEnemies: [MOB_TYPE.gryphon], isBoss:false,spawnPoints:[0]},
    {numLevel:9, numberEnemies:1, typeEnemies: [MOB_TYPE.archer], isBoss:false, spawnPoints:[0]},
    {numLevel:10, numberEnemies:1, typeEnemies: [MOB_TYPE.ogre], isBoss:true,spawnPoints:[0]},
];

export const DIFFICULTY_MULTIPLIER = {
    [GameTypes.Easy]: 1,
    [GameTypes.Medium]: 2,
    [GameTypes.Hard]: 3,
}

export const LEVEL_SYSTEM_CONFIG = {
    spawnPerSecond : 1,
    secondsBeforeSpawning : 1,
    secondsBetweenLevels : 1,
}
