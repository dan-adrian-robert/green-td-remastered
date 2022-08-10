export enum SOUND_FOLDER_PATHS {
    AMBIENT= 'AMBIENT',
    ENEMIES= 'ENEMIES',
    SPELLS= 'SPELLS',
    TOWERS= 'TOWERS',
    UI= 'UI',
}

export type GAME_SOUND_FORMAT = {
    [SOUND_FOLDER_PATHS.AMBIENT]: {
        defeated: any;
        nightElf: any;
    },
    [SOUND_FOLDER_PATHS.ENEMIES]: {
        archer: any;
        dragonDeath1: any;
        goblinDead: any;
        grifon: any;
        humanDead: any;
        knightDead: any;
        mage: any;
        mortarDead: any;
        ogre: any;
        orcDead: any;
        riderDead: any;
    },
    [SOUND_FOLDER_PATHS.SPELLS]: {
        thunder: any;
    },
    [SOUND_FOLDER_PATHS.TOWERS]: {
        archerShoot: any;
        cannonShoot: any;
        towerShoot: any;
    },
    [SOUND_FOLDER_PATHS.UI]: {
        buttonClick: any;
        humanNoGold: any;
        nagaNoGold: any;
        orcNoGold: any;
        researchComplete: any;
        upgradeCompleted: any;
    },
}