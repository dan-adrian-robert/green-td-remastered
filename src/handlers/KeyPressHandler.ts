import {Engine} from "../Engine.";

const handleGlobalKeyPress = (event: any): void => {
    return;
}

const handleInGameKeyPress = (event: any): void => {
    const code = event.keyCode;
    //TODO REPLACE NUMBERS WITH STRING MAPPING FOR KEYCODES
    switch (code) {
        case 82:
            Engine.getGameStateSystem().setRenderState();
            break;

        case 83:
            if (!Engine.getGameStateSystem().buildTrap && !Engine.getGameStateSystem().buildMode && !Engine.getGameStateSystem().upgradeMode) {
                Engine.getGameStateSystem().placeSpell = true;
            }
            break;

        case 88:
            Engine.getGameStateSystem().applySoundLogic();
            Engine.getGameStateSystem().loseGame();
            break;
        default:
            return;
    }
}

export const handleKeyPressed = (event: any): void => {
    handleGlobalKeyPress(event);

    if (Engine.getGameStateSystem().isGameStarted()) {
        handleInGameKeyPress(event);
    }
};