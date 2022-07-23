import {FOLDER_PATHS, GAME_ASSET_FORMAT} from "./imageTypes";

export const IMAGE_MAP: GAME_ASSET_FORMAT = {
    UI: {
        border: require('./images/ui/border.png'),
        bp: require('./images/ui/bp.png'),
        gameBorder: require('./images/ui/gameBorder.png'),
        gameOver:require('./images/ui/gameOver.png'),
        goldCoin: require('./images/ui/goldcoin.png'),
        info: require('./images/ui/info.png'),
        menu: require('./images/ui/menu.png'),
        menuBorder:require('./images/ui/menuBorder.png'),
        option:require('./images/ui/option.png'),
        pageBackground: require('./images/ui/pageBackground.png'),
        upgradeMenu: require('./images/ui/upgradeMenu.png'),
    },
    SOUND: {
        sound : require('./images/sound/sound.png'),
        noSound : require('./images/sound/noSound.png'),
    },
    SPELLS: {
        aoe : require('./images/spells/aoe.png'),
        thunder : require('./images/spells/thunder.png'),
    },
    MAPS: {
        map: require('./images/maps/map2.png'),
    },
    BUILDINGS: {
      base: require('./images/buildings/base.png'),
    },
    MOBS: {
        archer: require('./images/mobs/archer.png'),
        dragonBoss: require('./images/mobs/dragon-boss.png'),
        dwarvenDemolitionSquad: require('./images/mobs/dwarven-demolition-squad.png'),
        footman: require('./images/mobs/footman.png'),
        grifon: require('./images/mobs/grifon.png'),
        grunt: require('./images/mobs/grunt.png'),
        knight: require('./images/mobs/knight.png'),
        mage: require('./images/mobs/mage.png'),
        ogre: require('./images/mobs/ogre.png'),
        rider: require('./images/mobs/rider.png'),
        spider: require('./images/mobs/spider.png'),
        spiderCrop: require('./images/mobs/spidercrop.png'),
    },
    ALLY: {
        kamikaze: require('./images/ally/kamikaze.png'),
        kamikazeMenuIcon: require('./images/ally/kamikaze-menu-icon.png'),
    },
    BULLETS: {
        boulder: require('./images/bullets/boulder.png'),
        cannonball: require('./images/bullets/cannonball.png'),
        fire: require('./images/bullets/fire.png'),
        fireBall: require('./images/bullets/fire-ball.png'),
        fireOrb: require('./images/bullets/fire-orb.png'),
        frostOrb: require('./images/bullets/frost-orb.png'),
        frostSphere: require('./images/bullets/frost-sphere.png'),
        poisonBlob: require('./images/bullets/poison-blob.png'),
        poisonOrb: require('./images/bullets/poison-orb.png'),
        shockBall: require('./images/bullets/shock-ball.png'),
    },
    TOWERS: {
        boulderTower: require('./images/towers/boulder_tower.png'),
        cannonTower: require('./images/towers/cannon_tower.png'),
        frostTower: require('./images/towers/frost_tower.png'),
        fireTower: require('./images/towers/magma_tower.png'),
        tower: require('./images/towers/tower.png'),
        towersV1: require('./images/towers/towers_v1.png'),
    },
    TRAPS: {
        fire: require('./images/traps/fire.png'),
        iceSpikes: require('./images/traps/ice_spikes.png'),
        mine: require('./images/traps/mine.png'),
        poison: require('./images/traps/poison.png'),
    },
    [FOLDER_PATHS.UPGRADES]: {
        dmg: require('./images/upgrades/dmg.png'),
        effect:  require('./images/upgrades/effect.png'),
        firerate:  require('./images/upgrades/firerate.png'),
        range: require('./images/upgrades/range.png'),
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
            archer: {},
            dragonBoss: {},
            dwarvenDemolitionSquad: {},
            footman,
            grifon: {},
            grunt: {},
            knight:  {},
            mage:  {},
            ogre: {},
            rider: {},
            spider: {},
            spiderCrop: {},
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
