import {Enemy} from "./objects/Enemy";
import {Trap} from "./objects/Trap";
import {Tower} from "./objects/Tower";
import {Border} from "./objects/Border";
import {Menu} from "./ui/Menu";
import {Sound} from "./ui/Sound";
import {Spell} from "./objects/Spell";
import {GameStateSystem} from "./systems/GameStateSystem";
import {Base} from "./objects/Base";
import {GameMap} from "./objects/GameMap";
import {UpgradeTower} from "./ui/UpgradeTower";
import {BuildSystem} from "./systems/BuildSystem";
import {PlaceTrap} from "./ui/PlaceTrap";
import {LevelSystem} from "./systems/LevelSystem";
import {Level} from "./objects/Level";
import {Bullet} from "./objects/Bullet";
import {GAME_ASSET_FORMAT} from "./types/imageTypes";
import {CANVAS} from "./config/Globals";
import {Coin} from "./objects/Coin";
import {BuildingPlace} from "./objects/BuildingPlace";
import {Kamikaze} from "./objects/Kamikaze";
import {BulletSystem} from "./systems/BulletSystem";
import {SOUNDS_LIST} from "./types/types";
import { TowerSystem } from "./systems/TowerSystem";
import { EnemySystem } from "./systems/EnemySystem";
import {GAME_SOUND_FORMAT, SOUND_FOLDER_PATHS} from "./types/SoundTypes";

export namespace Engine {
    let imageMap: GAME_ASSET_FORMAT;
    let soundMap: GAME_SOUND_FORMAT;

    let sumOfMoney: number = 900;
    let listEnemy: Enemy[] = [];
    let listAlly: Kamikaze[] = [];
    let listTraps: Trap[] = [];
    let listBullets : Bullet[] = [];
    let listBox: BuildingPlace[] = [];
    let listTowers: Tower[] = [];
    let staticLevels: Level[] = [];

    let border: Border;
    let menu: Menu;
    let sound: Sound;
    let spell: Spell;

    let base: Base;
    let map: GameMap;

    let upgradeTower: UpgradeTower;
    let buildSystem: BuildSystem;
    let gameStateSystem: GameStateSystem;
    let placeTrap: PlaceTrap;
    let levelSystem: LevelSystem;
    let level: Level;
    let coin: Coin;

    let canvas: any = null;
    let statusCanvas: any = null;
    // let inGameMenuCanvas: any = null;
    let canvasContext: any = null;
    // let inGameMenuCanvasContext: any = null;
    // let statusCanvasContext: any = null;

    //DEBUGGER
    let renderCollision: boolean = false;

    let towerSystem: TowerSystem;
    let enemySystem: EnemySystem;
    let bulletSystem: BulletSystem;

    gameStateSystem = new GameStateSystem({},{},{});

    export const toggleRenderRange = () => {
        gameStateSystem.renderRange = !gameStateSystem.renderRange;
    }

    export const getBulletSystem = (): BulletSystem => {
        return bulletSystem;
    }

    export const setBulletSystem = (newBulletSystem: BulletSystem): void => {
        bulletSystem = newBulletSystem;
    }

    export const getEnemySystem = (): EnemySystem => {
        return enemySystem;
    }

    export const setEnemySystem = (newEnemySystem: EnemySystem): void => {
        enemySystem = newEnemySystem;
    }

    export const getTowerSystem = (): TowerSystem => {
        return towerSystem;
    }

    export const setTowerSystem = (newTowerSystem: TowerSystem): void => {
        towerSystem = newTowerSystem;
    }

    export const getRenderCollision = (): boolean => {
       return renderCollision;
    }

    export const setRenderCollision = (newStats: boolean): void => {
        renderCollision = newStats;
    }

    export const setCoin = (newCoin: Coin) => {
        coin = newCoin;
    }

    export const getCoin = (): Coin => {
        return coin;
    }

    export const clearCanvas = () => {
        Engine.getCanvasContext().clearRect(0, 0, CANVAS.width, CANVAS.height);
    }

    export const getLevel= (): Level => {
        return level;
    }

    export const setLevel = (newLevel: Level): void => {
        level = newLevel;
    }

    export const getCanvasContext= (): any => {
        return canvasContext;
    }

    export const setCanvasContext = (newCanvasContext: any): void => {
        canvasContext = newCanvasContext;
    }

    export const getStatusCanvas= (): any => {
        return statusCanvas;
    }

    export const setStatusCanvas = (newCanvas: any): void => {
        statusCanvas = newCanvas;
    }

    export const getCanvas= (): any => {
        return canvas;
    }

    export const setCanvas = (newCanvas: any): void => {
        canvas = newCanvas;
    }

    export const getStaticLevels= (): Level[] => {
        return staticLevels;
    }

    export const setStaticLevels= (newStaticLevels: Level[]): void => {
        staticLevels = newStaticLevels;
    }

    export const getMap= (): GameMap => {
        return map;
    }

    export const setMap= (newMap: GameMap): void => {
        map = newMap;
    }

    export const getLvlSystem= (): LevelSystem => {
        return levelSystem;
    }

    export const setLvlSystem= (newLvlSystem: LevelSystem): void => {
        levelSystem = newLvlSystem;
    }

    export const getBase= (): Base => {
        return base;
    }

    export const setBase= (newBase: Base): void => {
        base = newBase;
    }

    export const getPlaceTrap= (): PlaceTrap => {
        return placeTrap;
    }

    export const setPlaceTrap= (newPlaceTrap: PlaceTrap): void => {
        placeTrap = newPlaceTrap;
    }

    export const getBuildSystem= (): BuildSystem => {
        return buildSystem;
    }

    export const setBuildSystem = (newBuildSystem: BuildSystem): void => {
        buildSystem = newBuildSystem;
    }

    export const getUpgradeTower= (): UpgradeTower => {
        return upgradeTower;
    }

    export const setUpgradeTower = (newUpgradeTower: UpgradeTower): void => {
        upgradeTower = newUpgradeTower;
    }

    export const getGameStateSystem = (): GameStateSystem => {
        return gameStateSystem;
    }

    export const setGameStateSystem = (newGameState: GameStateSystem): void => {
        gameStateSystem = newGameState;
    }

    export const getSound= (): Sound => {
        return sound;
    }

    export const setSound = (newSound: Sound): void => {
        sound = newSound;
    }

    export const getSpell= (): Spell => {
        return spell;
    }

    export const setSpell = (newSpell: Spell): void => {
        spell = newSpell;
    }

    export const getBorder= ():Border => {
        return border;
    }

    export const setBorder= (newBorder: Border): void => {
        border = newBorder;
    }

    export const getMenu= (): Menu => {
        return menu;
    }

    export const setMenu= (newMenu: Menu): void => {
        menu = newMenu;
    }

    export const getMoney = (): number => {
        return sumOfMoney;
    }

    export const setMoney = (value: number): void => {
        sumOfMoney = value;
    }
    export const addMoney = (value: number): void => {
        sumOfMoney += value;
    }

    export const decreaseMoney = (value: number): void => {
        sumOfMoney -= value;
    }

    export const getEnemyList = (): Enemy[] => {
        return listEnemy;
    }

    export const setEnemyList = (list: Enemy[]) => {
        listEnemy = list;
    }

    export const addEnemy = (enemy: Enemy) => {
        listEnemy.push(enemy);
    }

    export const getAllyList = (): Kamikaze[] => {
        return listAlly;
    }

    export const setAllyList = (list: Kamikaze[]): void => {
        listAlly = list;
    }

    export const addAlly = (ally: Kamikaze): void => {
        listAlly.push(ally);
    }

    export const getTrapList = (): Trap[]  => {
        return listTraps;
    }

    export const setTrapList = (list: Trap[]): void => {
        listTraps = list;
    }

    export const getBulletList = (): Bullet[] => {
        return listBullets;
    }

    export const setBulletList = (list: Bullet[]): void => {
        listBullets = list;
    }

    export const addBullet = (bullet: Bullet): void => {
        listBullets.push(bullet);
    }

    export const removeBullet = (index: number): void => {
        listBullets = listBullets.splice(index, 1);
    }

    export const getBoxList = (): BuildingPlace[] => {
        return listBox;
    }

    export const setBoxList = (list: BuildingPlace[]): void => {
        listBox = list;
    }

    export const addBox = (box: BuildingPlace): void => {
        listBox.push(box);
    }

    export const removeBox = (index: number): void => {
        listBox.splice(index, 1);
    }

    export const getTowerList = (): Tower[] => {
        return listTowers;
    }

    export const setTowerList = (list: Tower[]): void => {
        listTowers = list;
    }

    export const removeTower = (): void => {

    }

    export const addTower = (tower: Tower): void => {
        listTowers.push(tower);
    }

    export const draw =  (image: any, sx: number, sy: number, sw: number, sh: number, dx: number,
                          dy: number,dw: number,dh: number): void => {
        if (!canvasContext) {
            return;
        }
        canvasContext.drawImage(image, sx, sy, sw, sh, dw, dh,dx,dy, dw,dh);
    }

    export const drawSimple = (image: any, sx: number, sy: number, sw: number, sh: number): void => {
        if (!canvasContext) {
            return;
        }
        canvasContext.drawImage(image, sx, sy, sw, sh);
    }

    export const setImageMap = (newImageMap: GAME_ASSET_FORMAT): void => {
        imageMap = newImageMap;
    }

    export const getImageMap = (): GAME_ASSET_FORMAT => {
        return imageMap;
    }

    export const setSoundMap = (newSoundMap:GAME_SOUND_FORMAT): void => {
        soundMap = newSoundMap;
    }

    export const getSoundMap = (): GAME_SOUND_FORMAT => {
        return soundMap;
    }

    export const getSoundFromKey = (folderPath: SOUND_FOLDER_PATHS, key: SOUNDS_LIST): any => {
        return (getSoundMap()[folderPath] as any)[key];
    }

    // export const applyEnemyLogic = (): void => {
    //    Engine.setEnemyList(listEnemy.map((enemy: Enemy) => {
    //         enemy.collideWithCheckPoint(map);
    //         enemy.move();
    //         // enemy.applyDebuffs();
    //         // enemy.tick_debuffs();
    //         enemy.updateSprite();
    //         enemy.hp.updatePosition(enemy);
    //         enemy.render();
    //         enemy.hp.render();
    //         return enemy;
    //     }))
    // }
    // gameState = new GameStateSystem(
    //     getSoundFromKey(SOUND_FOLDER_PATHS.UI, UI_SOUNDS.BUTTON_CLICK),
    //     getSoundFromKey(SOUND_FOLDER_PATHS.AMBIENT, AMBIENT_SOUNDS.NIGHT_ELF),
    //     getSoundFromKey(SOUND_FOLDER_PATHS.AMBIENT, AMBIENT_SOUNDS.DEFEATED),
    // );
}
