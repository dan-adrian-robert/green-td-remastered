import {calculateMousePos} from "../utils/UserActions";
import {Engine} from "../Engine.";
import {returnSelectedButton} from "../utils/HandlersUtils";
import {MousePosition} from "../types/types";

const handleInMenuMouseMove = (mousePos: MousePosition): void => {
    Engine.getMenu().optionSelected = returnSelectedButton(mousePos, Engine.getMenu().buttonPoz);
}

const handleGameOverMouseMove = (mousePos: MousePosition): void => {
    Engine.getMenu().gameOverOptionSelected = returnSelectedButton(mousePos,Engine.getMenu().gameOverButtons);
}

const handleGameStartedMouseMove = (mousePos: MousePosition): void => {
    Engine.getSpell().setAoePoz(mousePos);
}

export const handleMouseMove = (evt: any): void => {
    const mousePos: MousePosition = calculateMousePos(evt);

    if (Engine.getGameStateSystem().isMenu()) {
        handleInMenuMouseMove(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().isGameOver()) {
        handleGameOverMouseMove(mousePos);
        return;
    }

    if (Engine.getGameStateSystem().isGameStarted()) {
        handleGameStartedMouseMove(mousePos);
        return;
    }
}
