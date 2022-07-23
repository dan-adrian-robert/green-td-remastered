import {Engine} from "../Engine.";
import {Direction} from "../../types";
import {Sprite} from "./Sprite";
import {FOLDER_PATHS} from "../../imageTypes";
import {GameMap} from "./GameMap";

export class Kamikaze extends Sprite {
    dir: any;
    speed: number;
    damage: number;
    hp: number;

    currentCp: any;
    animationIndex: number;
    ticks: number;
    maxTicks: number;
    smallImage: any;

    constructor(startX: number, startY: number, direction: any, indexCp: number) {
        const image = Engine.getImageMap()[FOLDER_PATHS.ALLY];
        console.log(image);
        super(image,0, 0, ALLY.spriteWidth,ALLY.spriteHeight,startX, startY, ALLY.sizeX, ALLY.sizeY);
        this.smallImage = Engine.getImageMap()[FOLDER_PATHS.ALLY];
        this.dir = direction;
        this.speed = ALLY['speed'];
        this.damage = ALLY['damage'];
        this.currentCp = indexCp;
        this.animationIndex = 0;
        this.ticks = 0;
        this.maxTicks = 1;
        this.hp = 1;

        this.changeSpriteDir(this.dir);
    }

    move(): void {
        this.ticks += 1;

        switch (this.dir) {
            case (Direction.right):
                this.px += Math.max(this.speed, 0);
                break;
            case (Direction.left):
                this.px -= Math.max(this.speed, 0);
                break;
            case (Direction.up):
                this.py -= Math.max(this.speed, 0);
                break;
            case (Direction.down):
                this.py += Math.max(this.speed, 0);
                break;
        }
    }

    render(): void {
        Engine.getCanvasContext().drawImage(this.image, this.spx, this.spy, this.spSizeX - 10, this.spSizeY - 20,
                                            this.px, this.py-30, this.sizeX-30, this.sizeY-30);
    }

    colideWithCheckPoint(map: any): void {
        //TODO add check for index out of bounds
        const cp = map.getCp(this.currentCp);

        if (Math.abs(this.px - cp.x) < this.sizeX &&
            Math.abs(this.py - cp.y) < this.sizeY ) {
            this.dir = cp.dir;
            this.currentCp += 1;
            this.changeSpriteDir(this.dir);
        }
    }

    changeSpriteDir(dir: Direction): void {
        switch (dir) {
            case(Direction.right):
                this.spy = 3 * this.spSizeY;
                this.spx = 0;
                break;
            case(Direction.left):
                this.spy = this.spSizeY;
                this.spx = 0;
                break;
            case(Direction.down):
                this.spy = 0;
                this.spx = 0;
                break;
            case(Direction.up):
                this.spy = 2 * this.spSizeY;
                this.spx = 0;
                break;
        }
    }

    updateSprite(): void {
        if (this.ticks > this.maxTicks) {
            this.ticks = 0;
            this.spx += this.spSizeX;
            this.spy %= this.image.width;
        }
    }

    renderRange(): void {
        const X = this.px + this.sizeX / 2
        const Y = this.py + this.sizeY / 2;

        Engine.getCanvasContext().beginPath();
        Engine.getCanvasContext().arc(X, Y, this.sizeX / 2, 0, 2 * Math.PI, false);
        Engine.getCanvasContext().stroke();
    }
    
    renderMenuIcon(): void {
        Engine.getCanvasContext().drawImage(this.smallImage, 0, 0, 400, 400, 785, 173, 440, 440);
    }

    applyLogic(list: Kamikaze[], map: GameMap): void {
        this.renderMenuIcon();
        list.map((ally: Kamikaze) => {
            ally.colideWithCheckPoint(map);
            ally.changeSpriteDir(ally.dir);
            ally.move();
            ally.updateSprite();
            ally.render();
        })
    }
}

export const ALLY: any = {
    hp: 10,
    speed: 2,
    damage: 50,
    "image-src": "./images/ally/kamikaze.png",
    "image_width": 375,
    "image_height": 300,
    spriteWidth: 75,
    spriteHeight: 75,
    sizeX: 75,
    sizeY: 75,
};