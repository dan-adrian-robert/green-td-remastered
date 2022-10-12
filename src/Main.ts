import {FPS} from "./config/Globals";
import {Engine} from "./Engine.";
import {renderLevel, renderMoney, renderObjectList} from "./utils/Render";
import {collideBulletsEnemies, collideEnemiesBase, eraseEnemies} from "./utils/UserActions";

export const gameLoop = (): void => {

    if (Engine.getGameStateSystem().isSetDifficulty()) {
        runSetDifficultyLoop();
        return;
    }

    if (Engine.getGameStateSystem().isMenu()) {
        runMenuLoop();
        return;
    }

    if (Engine.getGameStateSystem().isGameStarted()) {
        runGamePlayLoop();
        return;
    }

    if (Engine.getGameStateSystem().isGameOver()) {
        runGameOverLoop();
        return;
    }
}

const runSetDifficultyLoop = (): void => {
    Engine.getMenu().renderDifficulty();
}

const runMenuLoop = (): void => {
    Engine.getBorder().renderInMenu();
    Engine.getMenu().render();
    Engine.getSound().render();
}

const runGamePlayLoop = (): void => {
    Engine.clearCanvas();

    collideBulletsEnemies();
    // collideAlliesEnemies();
    collideEnemiesBase();
    // collideTrapsEnemies();
    // checkIfAllyOnFinalCp();
    eraseEnemies();
    // eraseAllies();
    // eraseTraps();
    // Engine.getGameState().applySoundLogic();

    Engine.getBorder().renderInGame();
    //Game Canvas____________________________________
    Engine.getMap().render();

    if (Engine.getRenderCollision()) {
        Engine.getMap().renderCheckPoints();
    }

    renderObjectList(Engine.getTowerList(), true);
    // renderObjectList([Engine.getBase()], true);    //base

    renderObjectList(Engine.getBoxList(), true);

    //Logic___________________________________________
    // trapObject.applyLogic(Engine.getTrapList());

    Engine.getEnemySystem().applyLogic(Engine.getEnemyList(), Engine.getMap());

    // allyObject.applyLogic(Engine.getAllyList(), Engine.getMap());
    Engine.getTowerSystem().applyLogic(Engine.getTowerList(), Engine.getEnemyList());
    Engine.getBulletSystem().applyLogic(Engine.getBulletList());
    Engine.getBase().applyLogic();
    // //________________________________________________|
    //
    //
    // //Level____________________________________________
    Engine.getLvlSystem().applyLogic();
    //
    // //LevelSystem.spawnAlly();
    renderMoney();
    renderLevel();
    // //________________________________________________|
    //
    // //Build Tower_____________________________________
    renderObjectList([Engine.getBuildSystem()], Engine.getGameStateSystem().buildMode);
    // //_______________________________________________|
    //
    // //Upgrade Menu____________________________________
    renderObjectList([Engine.getUpgradeTower()],Engine.getGameStateSystem().upgradeMode);
    // //________________________________________________|
    //
    // //Defence Menu____________________________________
    renderObjectList([Engine.getPlaceTrap()],Engine.getGameStateSystem().buildTrap);
    // //________________________________________________|
    //
    // //Eye candy stuff
    Engine.getCoin().applyLogic();
    // //________________________________________________|
    //
    // //Spell___________________________________________
    // Engine.getSpell().applyLogic(Engine.getGameState().placeSpell);
    // //________________________________________________|
    //
    // //Remove the bullets if they are outside the canvas
    // Engine.setBulletList(bulletObject.removeBullets(Engine.getBulletList(), Engine.getCanvas().width, Engine.getCanvas().height))
    Engine.getSound().render();
}

const runGameOverLoop = (): void => {
    Engine.getBorder().renderInMenu();
    Engine.getMenu().renderGameOverMenu();
    Engine.setStaticLevels([]);
}

export const setGameLoop = () => {
    setInterval(gameLoop, 2000/FPS);
}
