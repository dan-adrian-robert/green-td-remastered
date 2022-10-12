import React, {useEffect} from 'react';
import './App.css';
import {CANVAS} from "./config/Globals";
import './Main';
import {Engine} from "./Engine.";
import {setupGame} from "./utils/EngineSetup";
import {Button, Stack} from "@mui/material";
import { goTo, toggleCollisionRender } from "./utils/Debugger";
import {GAME_STATE} from "./types/types";


const App = () => {
    const canvasRef = React.useRef(null);

    useEffect(() => {
        if (canvasRef) {
            Engine.setCanvas(canvasRef.current);
            Engine.setCanvasContext(Engine.getCanvas().getContext('2d'));
            setupGame();
        }
    }, [canvasRef])

    return (
        <div className="App">
            <header className="App-header">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>goTo(GAME_STATE.Menu)}>Go to menu</Button>
                    <Button variant="contained" onClick={()=>goTo(GAME_STATE.GamePlay)}>Go to game</Button>
                    <Button variant="contained" onClick={()=>goTo(GAME_STATE.GameOver)}>Go to game over</Button>
                    <Button variant="contained" onClick={()=> {}}>Spawn Enemy</Button>
                    <Button variant="contained" onClick={()=> {toggleCollisionRender()}}>Toggle Collision</Button>
                    <Button variant="contained" onClick={()=> {Engine.toggleRenderRange()}}>Toggle Range</Button>
                </Stack>
                <canvas
                    ref={canvasRef}
                    id={CANVAS.id}
                    width={CANVAS.width}
                    height={CANVAS.height}>
                </canvas>
            </header>
        </div>
    );
}

export default App;
