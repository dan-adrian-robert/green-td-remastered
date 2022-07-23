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