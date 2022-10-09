import {GAME_STATE} from "../types/types";
import {Engine} from "./Engine.";

export const goTo = (gameState: GAME_STATE) => {
    switch (gameState) {
        case GAME_STATE.Menu:
            Engine.getGameState().menuState();
            break;
        case GAME_STATE.GamePlay:
            Engine.getGameState().startGame();
            break;
        case GAME_STATE.GameOver:
            Engine.getGameState().loseGame();
            break;
    }
}

export const toggleCollisionRender = () => {
    Engine.setRenderCollision(!Engine.getRenderCollision());
}
