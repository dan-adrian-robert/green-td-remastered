import {GAME_STATE} from "../types/types";
import {Engine} from "../Engine.";

export const goTo = (gameState: GAME_STATE) => {
    switch (gameState) {
        case GAME_STATE.Menu:
            Engine.getGameStateSystem().menuState();
            break;
        case GAME_STATE.GamePlay:
            Engine.getGameStateSystem().startGame();
            break;
        case GAME_STATE.GameOver:
            Engine.getGameStateSystem().loseGame();
            break;
    }
}

export const toggleCollisionRender = () => {
    Engine.setRenderCollision(!Engine.getRenderCollision());
}
