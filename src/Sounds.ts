import {GAME_SOUND_FORMAT, SOUND_FOLDER_PATHS} from "./SoundTypes";

export const BASE_ROUTE_SOUND: string = './assets/sound';

export const SOUND_MAP: GAME_SOUND_FORMAT = {
    [SOUND_FOLDER_PATHS.AMBIENT]: {
        defeated: require(`${BASE_ROUTE_SOUND}/ambient/defeated.wav`),
        nightElf: require(`${BASE_ROUTE_SOUND}/ambient/nightElf.mp3`),
    },
    [SOUND_FOLDER_PATHS.ENEMIES]: {
        archer: require(`${BASE_ROUTE_SOUND}/enemies/archer.wav`),
        dragonDeath1: require(`${BASE_ROUTE_SOUND}/enemies/dragonDeath1.wav`),
        goblinDead:require(`${BASE_ROUTE_SOUND}/enemies/goblinDead.wav`),
        grifon:require(`${BASE_ROUTE_SOUND}/enemies/grifon.wav`),
        humanDead:require(`${BASE_ROUTE_SOUND}/enemies/humanDead.wav`),
        knightDead:require(`${BASE_ROUTE_SOUND}/enemies/knightDead.wav`),
        mage: require(`${BASE_ROUTE_SOUND}/enemies/mage.wav`),
        mortarDead: require(`${BASE_ROUTE_SOUND}/enemies/mortarDead.wav`),
        ogre: require(`${BASE_ROUTE_SOUND}/enemies/ogre.wav`),
        orcDead: require(`${BASE_ROUTE_SOUND}/enemies/orcDead.wav`),
        riderDead: require(`${BASE_ROUTE_SOUND}/enemies/riderDead.wav`),
    },
    [SOUND_FOLDER_PATHS.SPELLS]: {
        thunder: require(`${BASE_ROUTE_SOUND}/spells/thunder.wav`),
    },
    [SOUND_FOLDER_PATHS.TOWERS]: {
        archerShoot: require(`${BASE_ROUTE_SOUND}/towers/archerShoot.wav`),
        cannonShoot: require(`${BASE_ROUTE_SOUND}/towers/canonShoot.wav`),
        towerShoot: require(`${BASE_ROUTE_SOUND}/towers/towerShoot.wav`),
    },
    [SOUND_FOLDER_PATHS.UI]: {
        buttonClick: require(`${BASE_ROUTE_SOUND}/ui/buttonClick.wav`),
        humanNoGold:  require(`${BASE_ROUTE_SOUND}/ui/humanNoGold.wav`),
        nagaNoGold: require(`${BASE_ROUTE_SOUND}/ui/nagaNoGold.wav`),
        orcNoGold: require(`${BASE_ROUTE_SOUND}/ui/orcNoGold.wav`),
        researchComplete: require(`${BASE_ROUTE_SOUND}/ui/researchComplete.wav`),
        upgradeCompleted: require(`${BASE_ROUTE_SOUND}/ui/upgradeCompleted.wav`),
    },
}

export const buildSoundMap = () : GAME_SOUND_FORMAT => {
    const ENEMY_VOLUME = 0.3;
    const UI_VOLUME = 0.15;
    const BG_VOLUME = 0.8;

    const defeated = new Audio();
    defeated.src = SOUND_MAP[SOUND_FOLDER_PATHS.AMBIENT].defeated;
    defeated.volume = BG_VOLUME;

    const nightElf= new Audio();
    nightElf.src = SOUND_MAP[SOUND_FOLDER_PATHS.AMBIENT].nightElf;
    nightElf.volume = BG_VOLUME;

    const archer= new Audio();
    archer.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].archer;
    archer.volume = ENEMY_VOLUME;

    const dragonDeath1= new Audio();
    dragonDeath1.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].dragonDeath1;
    dragonDeath1.volume = ENEMY_VOLUME;

    const goblinDead= new Audio();
    goblinDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].goblinDead;
    goblinDead.volume = ENEMY_VOLUME;

    const grifon= new Audio();
    grifon.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].grifon;
    grifon.volume = ENEMY_VOLUME;

    const humanDead= new Audio();
    humanDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].humanDead;
    humanDead.volume = ENEMY_VOLUME;

    const knightDead= new Audio();
    knightDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].knightDead;
    knightDead.volume = ENEMY_VOLUME;

    const mage= new Audio();
    mage.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].knightDead;
    mage.volume = ENEMY_VOLUME;

    const mortarDead= new Audio();
    mortarDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].mortarDead;
    mortarDead.volume = ENEMY_VOLUME;

    const ogre= new Audio();
    ogre.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].ogre;
    ogre.volume = ENEMY_VOLUME;

    const orcDead= new Audio();
    orcDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].orcDead;
    orcDead.volume = ENEMY_VOLUME;

    const riderDead= new Audio();
    riderDead.src = SOUND_MAP[SOUND_FOLDER_PATHS.ENEMIES].riderDead;
    riderDead.volume = ENEMY_VOLUME;

    const buttonClick= new Audio();
    buttonClick.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].buttonClick;
    buttonClick.volume = UI_VOLUME;

    const humanNoGold= new Audio();
    humanNoGold.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].humanNoGold;
    humanNoGold.volume = ENEMY_VOLUME;

    const nagaNoGold= new Audio();
    nagaNoGold.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].nagaNoGold;
    nagaNoGold.volume = ENEMY_VOLUME;

    const orcNoGold= new Audio();
    orcNoGold.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].orcNoGold;
    orcNoGold.volume = ENEMY_VOLUME;

    const researchComplete= new Audio();
    researchComplete.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].researchComplete;
    researchComplete.volume = ENEMY_VOLUME;

    const upgradeCompleted= new Audio();
    upgradeCompleted.src = SOUND_MAP[SOUND_FOLDER_PATHS.UI].upgradeCompleted;
    upgradeCompleted.volume = ENEMY_VOLUME;

    const archerShoot= new Audio();
    archerShoot.src = SOUND_MAP[SOUND_FOLDER_PATHS.TOWERS].archerShoot;
    archerShoot.volume = ENEMY_VOLUME;

    const cannonShoot= new Audio();
    cannonShoot.src = SOUND_MAP[SOUND_FOLDER_PATHS.TOWERS].cannonShoot;
    cannonShoot.volume = ENEMY_VOLUME;

    const towerShoot= new Audio();
    towerShoot.src = SOUND_MAP[SOUND_FOLDER_PATHS.TOWERS].towerShoot;
    towerShoot.volume = ENEMY_VOLUME;

    const thunder= new Audio();
    thunder.src = SOUND_MAP[SOUND_FOLDER_PATHS.SPELLS].thunder;
    thunder.volume = ENEMY_VOLUME;

    return {
        [SOUND_FOLDER_PATHS.AMBIENT]: {
            defeated,
            nightElf,
        },
        [SOUND_FOLDER_PATHS.ENEMIES]: {
            archer,
            dragonDeath1,
            goblinDead,
            grifon,
            humanDead,
            knightDead,
            mage,
            mortarDead,
            ogre,
            orcDead,
            riderDead,
        },
        [SOUND_FOLDER_PATHS.SPELLS]: {
            thunder,
        },
        [SOUND_FOLDER_PATHS.TOWERS]: {
            archerShoot,
            cannonShoot,
            towerShoot,
        },
        [SOUND_FOLDER_PATHS.UI]: {
            buttonClick,
            humanNoGold,
            nagaNoGold,
            orcNoGold,
            researchComplete,
            upgradeCompleted,
        },
    }
}