import {Hp} from "./Hp";
import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Base extends Sprite {
    hp: Hp;

    constructor (image: any, spx: number, spy: number, spSizeX:number, spSizeY: number,
                 px: number, py: number, sizeX: number, sizeY: number) {

        super(image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY);
        this.hp = new Hp(this.px + 55, this.py + 10, 100, 8, 100);
    }

    applyLogic(): void {
        this.render();
        this.renderHp();
        this.checkHp();
        this.hp.render();
    }

    render(): void {
        Engine.getCanvasContext().drawImage(this.image, 0, 0, this.spSizeX, this.spSizeY, this.px, this.py, this.sizeX, this.sizeY);
    }

     renderHp(): void {
        this.hp.render();
        Engine.getCanvasContext().font = "25px Arial";
        Engine.getCanvasContext().fillText(this.hp.value + "%", 800, 60);
    }

   checkHp(): void {
        if (this.hp.value <= 0 ) {
            Engine.getGameStateSystem().loseGame();
        }
    }
}
