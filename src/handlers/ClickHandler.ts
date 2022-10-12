import {MousePosition} from "../types/types";
import {calculateMousePos} from "../utils/UserActions";
import {
    applyButtonFunctionality,
    buildSelectedTower,
    buildSelectedTrap,
    displaySelectedObject,
    mouseInsideObject,
    returnSelectedButton,
    upgradeSelectedTower
} from "../utils/HandlersUtils";
import {Engine} from "../Engine.";

const handleGlobalMouseClick = (evt: any): void => {
    const mousePos: MousePosition = calculateMousePos(evt);

    if (mouseInsideObject(mousePos, Engine.getSound().pozX,  Engine.getSound().pozY, Engine.getSound().sizeX, Engine.getSound().sizeY)) {
        Engine.getSound().clickSound();
    }
}

const handleSetDifficultyMenuMouseClick = (mousePos: MousePosition): void => {
    applyButtonFunctionality(returnSelectedButton(mousePos, Engine.getMenu().diffPoz));
}

const handleInMenuMouseClick = (mousePos: MousePosition): void => {
    applyButtonFunctionality(returnSelectedButton(mousePos, Engine.getMenu().buttonPoz));
}

const handleGameOverMouseClick = (mousePos: MousePosition): void => {
    applyButtonFunctionality(returnSelectedButton(mousePos,Engine.getMenu().gameOverButtons));
}

const handleGameStartedMouseClick = (mousePos: MousePosition): void => {
    if (Engine.getGameStateSystem().placeSpell) {
        Engine.getGameStateSystem().placeSpell = false;
        Engine.getSpell().cast();
        return;
    }

    if (Engine.getGameStateSystem().buildTrap) {
        buildSelectedTrap(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().buildMode) {
        buildSelectedTower(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().upgradeMode) {
        upgradeSelectedTower(mousePos);
        return;
    }

    //TODO Move canvas borders to config file
    if( (mousePos.x >= 790 && mousePos.x <= 842) &&
        (mousePos.y >= 180 && mousePos.y <= 235)) {
        applyButtonFunctionality(1);
    }

    displaySelectedObject(mousePos);
    return;
}

export const handleMouseClick = (evt: any): void => {
    handleGlobalMouseClick(evt);

    const mousePos: MousePosition = calculateMousePos(evt);

    if (Engine.getGameStateSystem().isSetDifficulty()) {
        handleSetDifficultyMenuMouseClick(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().isMenu()) {
        handleInMenuMouseClick(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().isGameStarted()) {
        handleGameStartedMouseClick(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().isGameOver()) {
        handleGameOverMouseClick(mousePos);
        return;
    }
}


