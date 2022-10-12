import {FOLDER_PATHS, GAME_ASSET_FORMAT} from "./types/imageTypes";

const BASE_ROUTE: string = './assets/images';

export const IMAGE_MAP: GAME_ASSET_FORMAT = {
    UI: {
        border: require(`${BASE_ROUTE}/ui/border.png`),
        bp: require(`${BASE_ROUTE}/ui/bp.png`),
        gameBorder: require(`${BASE_ROUTE}/ui/gameBorder.png`),
        gameOver:require(`${BASE_ROUTE}/ui/gameOver.png`),
        goldCoin: require(`${BASE_ROUTE}/ui/goldcoin.png`),
        info: require(`${BASE_ROUTE}/ui/info.png`),
        menu: require(`${BASE_ROUTE}/ui/menu.png`),
        menuBorder:require(`${BASE_ROUTE}/ui/menuBorder.png`),
        option:require(`${BASE_ROUTE}/ui/option.png`),
        pageBackground: require(`${BASE_ROUTE}/ui/pageBackground.png`),
        upgradeMenu: require(`${BASE_ROUTE}/ui/upgradeMenu.png`),
    },
    SOUND: {
        sound : require(`${BASE_ROUTE}/sound/sound.png`),
        noSound : require(`${BASE_ROUTE}/sound/noSound.png`),
    },
    SPELLS: {
        aoe : require(`${BASE_ROUTE}/spells/aoe.png`),
        thunder : require(`${BASE_ROUTE}/spells/thunder.png`),
    },
    MAPS: {
        map: require(`${BASE_ROUTE}/maps/map2.png`),
    },
    BUILDINGS: {
        base: require(`${BASE_ROUTE}/buildings/base.png`),
    },
    MOBS: {
        archer: require(`${BASE_ROUTE}/mobs/archer.png`),
        dragonBoss: require(`${BASE_ROUTE}/mobs/dragon-boss.png`),
        dwarvenDemolitionSquad: require(`${BASE_ROUTE}/mobs/dwarven-demolition-squad.png`),
        footman: require(`${BASE_ROUTE}/mobs/footman.png`),
        grifon: require(`${BASE_ROUTE}/mobs/grifon.png`),
        grunt: require(`${BASE_ROUTE}/mobs/grunt.png`),
        knight: require(`${BASE_ROUTE}/mobs/knight.png`),
        mage: require(`${BASE_ROUTE}/mobs/mage.png`),
        ogre: require(`${BASE_ROUTE}/mobs/ogre.png`),
        rider: require(`${BASE_ROUTE}/mobs/rider.png`),
        spider: require(`${BASE_ROUTE}/mobs/spider.png`),
        spiderCrop: require(`${BASE_ROUTE}/mobs/spidercrop.png`),
    },
    ALLY: {
        kamikaze: require(`${BASE_ROUTE}/ally/kamikaze.png`),
        kamikazeMenuIcon: require(`${BASE_ROUTE}/ally/kamikaze-menu-icon.png`),
    },
    BULLETS: {
        boulder: require(`${BASE_ROUTE}/bullets/boulder.png`),
        cannonball: require(`${BASE_ROUTE}/bullets/cannonball.png`),
        fire: require(`${BASE_ROUTE}/bullets/fire.png`),
        fireBall: require(`${BASE_ROUTE}/bullets/fire-ball.png`),
        fireOrb: require(`${BASE_ROUTE}/bullets/fire-orb.png`),
        frostOrb: require(`${BASE_ROUTE}/bullets/frost-orb.png`),
        frostSphere: require(`${BASE_ROUTE}/bullets/frost-sphere.png`),
        poisonBlob: require(`${BASE_ROUTE}/bullets/poison-blob.png`),
        poisonOrb: require(`${BASE_ROUTE}/bullets/poison-orb.png`),
        shockBall: require(`${BASE_ROUTE}/bullets/shock-ball.png`),
    },
    TOWERS: {
        boulderTower: require(`${BASE_ROUTE}/towers/boulder_tower.png`),
        cannonTower: require(`${BASE_ROUTE}/towers/cannon_tower.png`),
        frostTower: require(`${BASE_ROUTE}/towers/frost_tower.png`),
        fireTower: require(`${BASE_ROUTE}/towers/magma_tower.png`),
        tower: require(`${BASE_ROUTE}/towers/tower.png`),
        towersV1: require(`${BASE_ROUTE}/towers/towers_v1.png`),
    },
    TRAPS: {
        fire: require(`${BASE_ROUTE}/traps/fire.png`),
        iceSpikes: require(`${BASE_ROUTE}/traps/ice_spikes.png`),
        mine: require(`${BASE_ROUTE}/traps/mine.png`),
        poison: require(`${BASE_ROUTE}/traps/poison.png`),
    },
    [FOLDER_PATHS.UPGRADES]: {
        dmg: require(`${BASE_ROUTE}/upgrades/dmg.png`),
        effect:  require(`${BASE_ROUTE}/upgrades/effect.png`),
        firerate:  require(`${BASE_ROUTE}/upgrades/firerate.png`),
        range: require(`${BASE_ROUTE}/upgrades/range.png`),
    },
}

export const buildImageMap= () : GAME_ASSET_FORMAT => {
    const border = new Image(500, 500);
    border.src = IMAGE_MAP.UI.border;

    const bp = new Image(45,45);
    bp.src = IMAGE_MAP.UI.bp;

    const gameBorder = new Image(230, 190);
    gameBorder.src = IMAGE_MAP.UI.gameBorder;

    const gameOver  = new Image(640, 419);
    gameOver.src = IMAGE_MAP.UI.gameOver;

    const goldCoin  = new Image(84, 14);
    goldCoin.src = IMAGE_MAP.UI.goldCoin;

    const info  = new Image();
    info.src = IMAGE_MAP.UI.info;

    const menu = new Image(999, 712);
    menu.src = IMAGE_MAP.UI.menu;

    const menuBorder  = new Image();
    menuBorder.src = IMAGE_MAP.UI.menuBorder;

    const option  = new Image();
    option.src = IMAGE_MAP.UI.option;

    const pageBackground  = new Image();
    pageBackground.src = IMAGE_MAP.UI.pageBackground;

    const upgradeMenu  = new Image(131, 129);
    upgradeMenu.src = IMAGE_MAP.UI.upgradeMenu;

    const sound = new Image(30,30);
    sound.src = IMAGE_MAP.SOUND.sound;

    const noSound = new Image(30,30);
    noSound.src = IMAGE_MAP.SOUND.noSound;

    const aoe = new Image(550, 550);
    aoe.src = IMAGE_MAP.SPELLS.aoe;

    const thunder = new Image(228, 215);
    thunder.src = IMAGE_MAP.SPELLS.thunder;

    const map = new Image(750, 460);
    map.src = IMAGE_MAP.MAPS.map;

    const base = new Image(192,192);
    base.src = IMAGE_MAP.BUILDINGS.base;

    const footman = new Image();
    footman.src = IMAGE_MAP.MOBS.footman;

    const grunt = new Image();
    grunt.src = IMAGE_MAP.MOBS.grunt;

    const grifon = new Image();
    grifon.src = IMAGE_MAP.MOBS.grifon;

    const knight = new Image();
    knight.src = IMAGE_MAP.MOBS.knight;

    const mage = new Image();
    mage.src = IMAGE_MAP.MOBS.mage;

    const ogre = new Image();
    ogre.src = IMAGE_MAP.MOBS.ogre;

    const rider = new Image();
    rider.src = IMAGE_MAP.MOBS.rider;

    const spider = new Image();
    spider.src = IMAGE_MAP.MOBS.spider;

    const spiderCrop = new Image();
    spiderCrop.src = IMAGE_MAP.MOBS.spiderCrop;

    const dwarvenDemolitionSquad = new Image();
    dwarvenDemolitionSquad.src = IMAGE_MAP.MOBS.dwarvenDemolitionSquad;

    const archer = new Image();
    archer.src = IMAGE_MAP.MOBS.archer;

    const dragonBoss = new Image();
    dragonBoss.src = IMAGE_MAP.MOBS.dragonBoss;

    const tx = 90;
    const ty = 110;
    const boulderTower = new Image(tx, ty);
    boulderTower.src = IMAGE_MAP.TOWERS.boulderTower;

    const cannonTower = new Image(tx, ty);
    cannonTower.src = IMAGE_MAP.TOWERS.cannonTower;

    const frostTower = new Image(tx, ty);
    frostTower.src = IMAGE_MAP.TOWERS.frostTower;

    const fireTower = new Image(tx, ty);
    fireTower.src = IMAGE_MAP.TOWERS.fireTower;

    const tower = new Image(tx, ty);
    tower.src = IMAGE_MAP.TOWERS.tower;

    const towersV1 = new Image(tx, ty);
    towersV1.src = IMAGE_MAP.TOWERS.towersV1;

    const range = new Image(230, 229);
    range.src = IMAGE_MAP.UPGRADES.range;

    const firerate = new Image(128, 128);
    firerate.src = IMAGE_MAP.UPGRADES.firerate;

    const dmg = new Image(128, 128);
    dmg.src = IMAGE_MAP.UPGRADES.dmg;

    const effect = new Image(250, 279);
    effect.src = IMAGE_MAP.UPGRADES.effect;

    const bx = 13;
    const by = 13;
    const boulder = new Image(bx,by);
    boulder.src = IMAGE_MAP.BULLETS.boulder;

    const cannonball = new Image(bx,by);
    cannonball.src = IMAGE_MAP.BULLETS.cannonball;

    const fire = new Image(bx,by);
    fire.src = IMAGE_MAP.BULLETS.fire;

    const fireBall = new Image(bx,by);
    fireBall.src = IMAGE_MAP.BULLETS.fireBall;

    const fireOrb = new Image(bx,by);
    fireOrb.src = IMAGE_MAP.BULLETS.fireOrb;

    const poisonOrb = new Image(bx,by);
    poisonOrb.src = IMAGE_MAP.BULLETS.poisonOrb;

    const frostOrb = new Image(bx,by);
    frostOrb.src = IMAGE_MAP.BULLETS.frostOrb;

    const frostSphere = new Image(bx,by);
    frostSphere.src = IMAGE_MAP.BULLETS.frostSphere;

    const poisonBlob = new Image(bx,by);
    poisonBlob.src = IMAGE_MAP.BULLETS.poisonBlob;

    const shockBall = new Image(bx,by);
    shockBall.src = IMAGE_MAP.BULLETS.shockBall;

    const allyX = 375;
    const allyY = 300;
    const kamikaze = new Image(allyX, allyY);
    kamikaze.src = IMAGE_MAP.ALLY.kamikaze;

    const result: GAME_ASSET_FORMAT = {
        [FOLDER_PATHS.ALLY]: {
            kamikaze,
            kamikazeMenuIcon: {}
        },
        [FOLDER_PATHS.BUILDINGS]: {
            base,
        },
        [FOLDER_PATHS.BULLETS]: {
            boulder,
            cannonball,
            fire,
            fireBall,
            fireOrb,
            frostOrb,
            frostSphere,
            poisonBlob,
            poisonOrb,
            shockBall,
        },
        [FOLDER_PATHS.MAPS]: {
            map,
        },
        [FOLDER_PATHS.MOBS]: {
            archer,
            dragonBoss,
            dwarvenDemolitionSquad,
            footman,
            grifon,
            grunt,
            knight,
            mage,
            ogre,
            rider,
            spider,
            spiderCrop,
        },
        [FOLDER_PATHS.SOUND]: {
            sound,
            noSound,
        },
        [FOLDER_PATHS.SPELLS]: {
            aoe,
            thunder,
        },
        [FOLDER_PATHS.TOWERS]: {
            boulderTower,
            cannonTower,
            frostTower,
            fireTower,
            tower,
            towersV1,
        },
        [FOLDER_PATHS.TRAPS]: {
            fire: {},
            iceSpikes: {},
            mine: {},
            poison: {},
        },
        [FOLDER_PATHS.UI]: {
            border,
            bp,
            gameBorder,
            gameOver,
            goldCoin,
            info,
            menu,
            menuBorder,
            option,
            pageBackground,
            upgradeMenu,
        },
        [FOLDER_PATHS.UPGRADES]: {
            dmg,
            effect,
            firerate,
            range,
        }
    }

    return result;
}
