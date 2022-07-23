export enum FOLDER_PATHS {
    ALLY= 'ALLY',
    BUILDINGS= 'BUILDINGS',
    BULLETS= 'BULLETS',
    MAPS='MAPS',
    MOBS= 'MOBS',
    SOUND= 'SOUND',
    SPELLS= 'SPELLS',
    TOWERS= 'TOWERS',
    TRAPS= 'TRAPS',
    UI= 'UI',
    UPGRADES= 'UPGRADES',
}

export type GAME_ASSET_FORMAT = {
    [FOLDER_PATHS.ALLY]: {
        kamikaze: any,
        kamikazeMenuIcon: any,
    }
    [FOLDER_PATHS.BUILDINGS]: {
        base: any,
    }
    [FOLDER_PATHS.BULLETS]: {
        boulder: any,
        cannonball:any,
        fire:any,
        fireBall:any,
        fireOrb:any,
        frostOrb:any,
        frostSphere: any,
        poisonBlob:any,
        poisonOrb:any,
        shockBall:any,
    }
    [FOLDER_PATHS.MAPS]: {
        map: any,
    }
    [FOLDER_PATHS.MOBS]: {
        archer: any,
        dragonBoss: any,
        dwarvenDemolitionSquad: any,
        footman: any,
        grifon: any,
        grunt: any,
        knight:  any,
        mage:  any,
        ogre: any,
        rider: any,
        spider: any,
        spiderCrop: any,
    }
    [FOLDER_PATHS.SOUND]: {
        sound: any,
        noSound: any,
    }
    [FOLDER_PATHS.SPELLS]: {
        aoe: any,
        thunder: any,
    }
    [FOLDER_PATHS.TOWERS]: {
        boulderTower: any,
        cannonTower:  any,
        frostTower: any,
        tower:  any,
        towersV1:  any,
        fireTower: any,
    }
    [FOLDER_PATHS.TRAPS]: {
        fire: any,
        iceSpikes: any,
        mine: any,
        poison: any,
    }
    [FOLDER_PATHS.UI]: {
        border: any,
        bp: any,
        gameBorder: any,
        gameOver: any,
        goldCoin: any,
        info: any,
        menu: any,
        menuBorder: any,
        option: any,
        pageBackground: any,
        upgradeMenu: any,
    }
    [FOLDER_PATHS.UPGRADES]: {
        dmg: any,
        effect: any,
        firerate: any,
        range: any,
    }
}
