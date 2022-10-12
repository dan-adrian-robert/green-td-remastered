import {buildImageMap} from "../../Images";
import {Engine} from "../Engine.";
import {Border} from "./Border";
import {Menu} from "../ui/Menu";
import {Sound} from "../ui/Sound";
import {Spell} from "./Spell";
import {handleKeyPressed, handleMouseClick, handleMouseMove} from "../Handlers";
import {setGameLoop} from "../Main";
import {BuildingPlace} from "./BuildingPlace";
import {UpgradeTower} from "../ui/UpgradeTower";
import {BuildSystem} from "../ui/BuildSystem";
import {PlaceTrap} from "../ui/PlaceTrap";
import {GameMap} from "./GameMap";
import {CheckPoint} from "./CheckPoint";
import {Base} from "./Base";
import {Hp} from "./Hp";
import {LevelSystem} from "../systems/LevelSystem";
import {CANVAS, FPS} from "../../config/globals";
import {Level} from "./Level";
import {FOLDER_PATHS} from "../../imageTypes";
import {Coin} from "./Coin";
import {Direction, MOB_TYPE, SPELL_SOUNDS} from "../../types";
import {BulletSystem} from "../systems/BulletSystem";
import {GAME_SOUND_FORMAT} from "../../SoundTypes";
import {buildSoundMap} from "../../Sounds";
import {TowerSystem} from "../systems/TowerSystem";
import {EnemySystem} from "../systems/EnemySystem";

export const setupGame = () => {
    const imageMap = buildImageMap();
    Engine.setImageMap(imageMap);

    const soundMap: GAME_SOUND_FORMAT = buildSoundMap();
    Engine.setSoundMap(soundMap);

    const border = new Border(imageMap[FOLDER_PATHS.UI].border, imageMap[FOLDER_PATHS.UI].gameBorder, CANVAS.width, CANVAS.height,25, 27);
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

    Engine.setLevel(new Level(1, "Easy", 10, [MOB_TYPE.footman, MOB_TYPE.orcGrunt], 1, 0));

    initWorld();
    setGameLoop();
    Engine.setLvlSystem(new LevelSystem(FPS,[new Level(1,1, 6, [MOB_TYPE.footman], false, 0)]));

    Engine.setCoin(new Coin(imageMap[FOLDER_PATHS.UI].goldCoin, 14, 14, 15, 14, 950, 43));

    Engine.setEnemySystem(new EnemySystem());
    Engine.setBulletSystem(new BulletSystem());
    Engine.setTowerSystem(new TowerSystem());

    // let allyObject = new Kamikaze(620, 220, 'left', 8);
    // let trapObject = new Trap('mine', 5, 0, 0, 45, 45);

    initEntities();

    Engine.getCanvas().addEventListener('mousemove', (evt: any) =>{ handleMouseMove(evt)});
    Engine.getCanvas().addEventListener('click', (evt: any) =>{ handleMouseClick(evt)});
    document.addEventListener('keydown',(evt) => { handleKeyPressed(evt)},false);
}

export const initEntities = () => {
    const listBox = [];

    Engine.setTrapList([]);
    Engine.setAllyList([]);
    Engine.setEnemyList([]);
    Engine.setTowerList([]);
    Engine.setBulletList([]);

    //Init the building box
    const bpImage = Engine.getImageMap()[FOLDER_PATHS.UI].bp;
    const bpSize = 45;
    const bpSpriteSize = 46;

    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,200, 180, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,305, 180, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,305, 135, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,430, 180, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,430, 135, bpSize));

    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,430, 235, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,290, 270, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,335, 270, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,385, 270, bpSize));

    //building places on the islands
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,625, 405, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,250, 405, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,205, 405, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,50,  370, bpSize));

    //bottom building places
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,380,  365, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,120,  275, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,570,  300, bpSize));
    listBox.push(new BuildingPlace(bpImage, bpSpriteSize,570,  250, bpSize));

    Engine.setBoxList(listBox);

    Engine.setUpgradeTower(new UpgradeTower(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
    Engine.setBuildSystem(new BuildSystem(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
    Engine.setPlaceTrap(new PlaceTrap(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
}

export const initWorld = () => {
    const imageMap = Engine.getImageMap();

    Engine.setMap(new GameMap(imageMap[FOLDER_PATHS.MAPS].map, 750, 460));
    Engine.getMap().addCheckPoints(new CheckPoint(20, 105, 40, Direction.right,1,false));
    Engine.getMap().addCheckPoints(new CheckPoint(315, 110, 40, Direction.down,2,false));
    Engine.getMap().addCheckPoints(new CheckPoint(282, 280, 40, Direction.right,3,false));
    Engine.getMap().addCheckPoints(new CheckPoint(440, 200, 40, Direction.up,4,false));
    Engine.getMap().addCheckPoints(new CheckPoint(415, -30, 40, Direction.right,5,false));
    Engine.getMap().addCheckPoints(new CheckPoint(570, 0, 40, Direction.down,6,false));
    Engine.getMap().addCheckPoints(new CheckPoint(540, 240, 40, Direction.right,7,false));
    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, Direction.right,8,true)); //7

    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, Direction.left,9,false)); //8
    Engine.getMap().addCheckPoints(new CheckPoint(430, 240, 40, Direction.up,10,false));
    Engine.getMap().addCheckPoints(new CheckPoint(430, 0, 40, Direction.left,11,false));
    Engine.getMap().addCheckPoints(new CheckPoint(310, 0, 40, Direction.down,12,false));
    Engine.getMap().addCheckPoints(new CheckPoint(310, 320, 40, Direction.left,13,false));
    Engine.getMap().addCheckPoints(new CheckPoint(170, 320, 40, Direction.up,14,false));
    Engine.getMap().addCheckPoints(new CheckPoint(175, 80, 40, Direction.left,15,false));
    Engine.getMap().addCheckPoints(new CheckPoint(175, 20, 40, Direction.left,16,true));

    Engine.getMap().addCheckPoints(new CheckPoint(115, 450, 40, Direction.up,17,false)); //16
    Engine.getMap().addCheckPoints(new CheckPoint(150, 230, 40, Direction.right,18,false));
    Engine.getMap().addCheckPoints(new CheckPoint(390, 230, 40, Direction.down,19,false));
    Engine.getMap().addCheckPoints(new CheckPoint(350, 460, 40, Direction.right,20,false));
    Engine.getMap().addCheckPoints(new CheckPoint(575, 410, 40, Direction.up,21,false));
    Engine.getMap().addCheckPoints(new CheckPoint(525, 110, 40, Direction.right,22,false));

    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, Direction.right,23,true));

    Engine.setBase(new Base( Engine.getImageMap()[FOLDER_PATHS.BUILDINGS].base, 192, 192, 330, 330, 610, 120, 330, 330));
}

export const resetGame = () => {
    Engine.getMenu().optionSelected = -1;
    initEntities();
    Engine.getBase().hp = new Hp(350, 50, 55, 15, 100);
    Engine.setMoney(200);
}
