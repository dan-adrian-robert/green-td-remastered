import {buildImageMap} from "../../config/Images";
import {Engine} from "../Engine.";
import {Border} from "./Border";
import {Menu} from "../ui/Menu";
import {Sound} from "../ui/Sound";
import {Spell} from "./Spell";
import {handleKeyPressed, handleMouseClick, handleMouseMove} from "../Handlers";
import {setGameLoop} from "../Main";
import {BuildingPlace} from "./BuildingPlace";
import {UpgradeTower} from "../ui/UpgradeTower";
import {BuildSystem} from "../systems/BuildSystem";
import {PlaceTrap} from "../ui/PlaceTrap";
import {GameMap} from "./GameMap";
import {CheckPoint} from "./CheckPoint";
import {Base} from "./Base";
import {Hp} from "./Hp";
import {LevelSystem} from "../systems/LevelSystem";
import {CANVAS, FPS} from "../../config/Globals";
import {Level} from "./Level";
import {FOLDER_PATHS} from "../../types/imageTypes";
import {Coin} from "./Coin";
import {Enemy} from "./Enemy";
import {Tower} from "./Tower";
import {Direction, ENEMY_SOUNDS, GameTypes, MOB_TYPE, SPELL_SOUNDS, TOWER_TYPE} from "../../types/types";
import {BulletSystem} from "../systems/BulletSystem";
import {GAME_SOUND_FORMAT, SOUND_FOLDER_PATHS} from "../../types/SoundTypes";
import {buildSoundMap} from "../../config/Sounds";
import {BUILDING_PLACE_CONFIG} from "../../config/BuildPlaces";
import {CHECK_POINTS} from "../../config/CheckPoint";

export const setupGame = () => {
    const imageMap = buildImageMap();
    Engine.setImageMap(imageMap);

    const soundMap: GAME_SOUND_FORMAT = buildSoundMap();
    Engine.setSoundMap(soundMap);

    const border = new Border(imageMap[FOLDER_PATHS.UI].gameBorder, imageMap[FOLDER_PATHS.UI].gameBorder, CANVAS.width, CANVAS.height,25, 27);
    Engine.setBorder(border);


    const menu = new Menu(imageMap[FOLDER_PATHS.UI].menu, 999, 712,
        imageMap[FOLDER_PATHS.UI].option, 300, 90,
        imageMap[FOLDER_PATHS.UI].border, 230, 190,
        imageMap[FOLDER_PATHS.UI].gameOver, 640, 419);
    Engine.setMenu(menu);


     const sound = new Sound(
         imageMap[FOLDER_PATHS.SOUND].sound,
         imageMap[FOLDER_PATHS.SOUND].noSound,
         30, 30, 30, 25, 30, 30);
     Engine.setSound(sound);

     const spell = new Spell(Engine.getImageMap()[FOLDER_PATHS.SPELLS].aoe, 550, 550,
         Engine.getImageMap()[FOLDER_PATHS.SPELLS].thunder, 228, 215,
         150, 150,
         150, 150,
         76, 215,
         75, 150,
         300, 200, SPELL_SOUNDS.THUNDER);
     Engine.setSpell(spell);

     Engine.setLvlSystem(new LevelSystem(FPS));

    Engine.setLevel(new Level(1, GameTypes.Easy, 10, [MOB_TYPE.footman, MOB_TYPE.orcGrunt], 1, [0]));

    initWorld();
    setGameLoop();

    Engine.setCoin(new Coin(imageMap[FOLDER_PATHS.UI].goldCoin, 14, 14, 15, 14, 950, 43));

    const dieSound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.ENEMIES, ENEMY_SOUNDS.HUMAN_DEAD);
    const enemyObject = new Enemy(35, 35, Direction.right,5, MOB_TYPE.footman, 1, 1, dieSound);
    Engine.setEnemySystem(enemyObject);

    const towerObject = new Tower(TOWER_TYPE.CANNON, 5, 0, 0, 45, 55, 50);
    Engine.setTowerSystem(towerObject);

    Engine.setBulletSystem(new BulletSystem());

    // let allyObject = new Kamikaze(620, 220, 'left', 8);
    // let trapObject = new Trap('mine', 5, 0, 0, 45, 45);
    initEntities();

    Engine.getCanvas().addEventListener('mousemove', (evt: any) =>{ handleMouseMove(evt)});
    Engine.getCanvas().addEventListener('click', (evt: any) =>{ handleMouseClick(evt)});
    document.addEventListener('keydown',(evt) => { handleKeyPressed(evt)},false);
}

export const initEntities = () => {
    Engine.setTrapList([]);
    Engine.setAllyList([]);
    Engine.setEnemyList([]);
    Engine.setTowerList([]);
    Engine.setBulletList([]);
    Engine.setBoxList(getListBox());

    Engine.setUpgradeTower(new UpgradeTower(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
    Engine.setBuildSystem(new BuildSystem(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
    Engine.setPlaceTrap(new PlaceTrap(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
}

export const getListBox = (): Array<BuildingPlace> => {
    const result: Array<BuildingPlace> = [];
    //Init the building box
    const bpImage = Engine.getImageMap()[FOLDER_PATHS.UI].bp;
    const bpSize = 45;
    const bpSpriteSize = 46;

    BUILDING_PLACE_CONFIG.map((bpConfig) => {
        result.push(new BuildingPlace(bpImage, bpSpriteSize, bpConfig.x,  bpConfig.y, bpSize));
        return null;
    });

    return result;
}

export const initWorld = () => {
    const imageMap = Engine.getImageMap();

    Engine.setMap(new GameMap(imageMap[FOLDER_PATHS.MAPS].map, 750, 460));

   CHECK_POINTS.map((item) => {
        const {x, y, size, direction, id, final} = item;
        Engine.getMap().addCheckPoints( new CheckPoint(x, y, size, direction, id, final));
        return null;
    })

    Engine.setBase(new Base( Engine.getImageMap()[FOLDER_PATHS.BUILDINGS].base, 192, 192, 330, 330, 610, 120, 330, 330));
}

export const resetGame = () => {
    Engine.getMenu().optionSelected = -1;
    initEntities();
    Engine.getBase().hp = new Hp(350, 50, 55, 15, 100);
    Engine.setMoney(200);
}
