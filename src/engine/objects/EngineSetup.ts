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
import {LevelSystem} from "./LevelSystem";
import {CANVAS, FPS} from "../../config/globals";
import {Level} from "./Level";
import {FOLDER_PATHS} from "../../imageTypes";
import {Coin} from "./Coin";
import {Enemy} from "./Enemy";
import {Tower} from "./Tower";
import {Bullet} from "./Bullet";
import {Direction, MOB_TYPE} from "../../types";

export const setupGame = () => {
    const imageMap = buildImageMap();
    Engine.setImageMap(imageMap);

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

    const spell = new Spell("images/spells/aoe.png", 550, 550,
        "images/spells/thunder.png", 228, 215,
        150, 150,
        150, 150,
        76, 215,
        75, 150,
        300, 200,'sound/spells/thunder.wav');
    Engine.setSpell(spell);


    Engine.setLvlSystem(new LevelSystem(FPS));
    Engine.setLevel(new Level(1, "Easy", 10, ['footman', 'grunt'], 1, 0));

    initWorld();
    setGameLoop();

    Engine.setCoin(new Coin(imageMap[FOLDER_PATHS.UI].goldCoin, 14, 14, 15, 14, 950, 43));

    const enemyObject = new Enemy(35, 35, Direction.right,5, MOB_TYPE.footman, 1, 1);
    Engine.setEnemySystem(enemyObject);

    const towerObject = new Tower('cannon-tower', 5, 0, 0, 45, 55, 50);
    Engine.setTowerSystem(towerObject);

    const bulletObject = new Bullet('images/bullets/fire.png', 450, 550, 5, 90, 110, 0, 0, 45, "burn", 1, 50, null, FPS);
    Engine.setBulletSystem(bulletObject);

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

    listBox.push(new BuildingPlace( bpImage,  200, 180, 45));
    listBox.push(new BuildingPlace(bpImage, 305, 180, 45));
    listBox.push(new BuildingPlace(bpImage, 305, 135, 45));
    listBox.push(new BuildingPlace(bpImage, 430, 180, 45));
    listBox.push(new BuildingPlace(bpImage, 430, 135, 45));

    listBox.push(new BuildingPlace(bpImage, 430, 235, 45));
    listBox.push(new BuildingPlace(bpImage, 290, 270, 45));
    listBox.push(new BuildingPlace(bpImage, 335, 270, 45));
    listBox.push(new BuildingPlace(bpImage, 385, 270, 45));

    //building places on the islands
    listBox.push(new BuildingPlace(bpImage, 625, 405, 45));
    listBox.push(new BuildingPlace(bpImage, 250, 405, 45));
    listBox.push(new BuildingPlace(bpImage, 205, 405, 45));
    listBox.push(new BuildingPlace(bpImage, 50,  370, 45));

    //bottom building places
    listBox.push(new BuildingPlace(bpImage, 380,  365, 45));
    listBox.push(new BuildingPlace(bpImage, 120,  275, 45));
    listBox.push(new BuildingPlace(bpImage, 570,  300, 45));
    listBox.push(new BuildingPlace(bpImage, 570,  250, 45));

    Engine.setBoxList(listBox);

    Engine.setUpgradeTower(new UpgradeTower(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));

    Engine.setBuildSystem(new BuildSystem(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));

    Engine.setPlaceTrap(new PlaceTrap(Engine.getImageMap()[FOLDER_PATHS.UI].upgradeMenu, 131, 129, 130, 130));
}

export const initWorld = () => {
    const imageMap = Engine.getImageMap();

    Engine.setMap(new GameMap(imageMap[FOLDER_PATHS.MAPS].map, 750, 460));
    Engine.getMap().addCheckPoints(new CheckPoint(20, 105, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(315, 110, 40, 'down',false));
    Engine.getMap().addCheckPoints(new CheckPoint(282, 280, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(440, 200, 40, 'up',false));
    Engine.getMap().addCheckPoints(new CheckPoint(415, -30, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(570, 0, 40, 'down',false));
    Engine.getMap().addCheckPoints(new CheckPoint(540, 240, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, 'right',true)); //7

    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, 'left',false)); //8
    Engine.getMap().addCheckPoints(new CheckPoint(430, 240, 40, 'up',false));
    Engine.getMap().addCheckPoints(new CheckPoint(430, 0, 40, 'left',false));
    Engine.getMap().addCheckPoints(new CheckPoint(310, 0, 40, 'down',false));
    Engine.getMap().addCheckPoints(new CheckPoint(310, 320, 40, 'left',false));
    Engine.getMap().addCheckPoints(new CheckPoint(170, 320, 40, 'up',false));
    Engine.getMap().addCheckPoints(new CheckPoint(175, 80, 40, 'left',false));
    Engine.getMap().addCheckPoints(new CheckPoint(175, 20, 40, 'left',true));

    Engine.getMap().addCheckPoints(new CheckPoint(115, 450, 40, 'up',false)); //16
    Engine.getMap().addCheckPoints(new CheckPoint(150, 230, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(390, 230, 40, 'down',false));
    Engine.getMap().addCheckPoints(new CheckPoint(350, 460, 40, 'right',false));
    Engine.getMap().addCheckPoints(new CheckPoint(575, 410, 40, 'up',false));
    Engine.getMap().addCheckPoints(new CheckPoint(525, 110, 40, 'right',false));

    Engine.getMap().addCheckPoints(new CheckPoint(635, 220, 40, 'right',true));

    Engine.setBase(new Base( Engine.getImageMap()[FOLDER_PATHS.BUILDINGS].base, 192, 192, 330, 330, 610, 120, 330, 330));
}

export const resetGame = () => {
    Engine.getMenu().optionSelected = -1;
    initEntities();
    Engine.getBase().hp = new Hp(350, 50, 55, 15, 100);
    Engine.setMoney(200);
}
