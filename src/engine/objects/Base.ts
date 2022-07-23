import {Hp} from "./Hp";
import {Engine} from "../Engine.";
import {Sprite} from "./Sprite";

export class Base extends Sprite {
    hp: any;

    constructor (image: any, sx: number, sy: number, sWidth:number, sHeight: number,
                 dx: number, dy: number, dWidth: number, dHeight: number) {

        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        this.hp = new Hp(this.sx + 55, this.sy + 10, 100, 8, 100);
    }

    applyLogic() {
        this.render();
        this.renderHp();
        this.checkHp();
        this.hp.render();
    }

    render() {
        Engine.getCanvasContext().drawImage(this.image, 0, 0, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }

     renderHp() {
        this.hp.render();
         Engine.getCanvasContext().font = "25px Arial";
         Engine.getCanvasContext().fillText(this.hp.value + "%", 800, 60);
    }

   checkHp() {
        if(this.hp.value <= 0 ) {
            Engine.getGameState().loseGame();
        }
    }
}
