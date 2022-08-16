import {FPS} from "../config/globals";
import {Engine} from "./Engine.";
import {renderLevel, renderMoney, renderObjectList} from "./Render";
import {collideBulletsEnemies, collideEnemiesBase, eraseEnemies} from "./UserActions";

export const gameLoop = () => {
    if(Engine.getGameState().isSetDifficulty()) {
        Engine.getMenu().renderDifficulty();
    } else if(Engine.getGameState().isMenu()) {
        Engine.getBorder().renderInMenu();
        Engine.getMenu().render();
        Engine.getSound().render();
    } else if(Engine.getGameState().isGameStarted()) {
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
        Engine.getLvlSystem().spawnEnemy();
        //
        // //LevelSystem.spawnAlly();
        renderMoney();
        renderLevel();
        // //________________________________________________|
        //
        // //Build Tower_____________________________________
        renderObjectList([Engine.getBuildSystem()], Engine.getGameState().buildMode);
        // //_______________________________________________|
        //
        // //Upgrade Menu____________________________________
        renderObjectList([Engine.getUpgradeTower()],Engine.getGameState().upgradeMode);
        // //________________________________________________|
        //
        // //Defence Menu____________________________________
        renderObjectList([Engine.getPlaceTrap()],Engine.getGameState().buildTrap);
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
    } else if(Engine.getGameState().isGameOver()) {
        Engine.getBorder().renderInMenu();
        Engine.getMenu().renderGameOverMenu();
        Engine.setStaticLevels([]);
    }
}

export const setGameLoop = () => {
    setInterval(gameLoop, 2000/FPS);
}
