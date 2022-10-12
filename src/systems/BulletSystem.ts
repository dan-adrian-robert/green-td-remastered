import {Engine} from "../Engine.";
import {Bullet} from "../objects/Bullet";

export class BulletSystem {

    renderRange(list: Bullet[]): void {
        for (let i = 0; i < list.length; i++) {
            const X = list[i].px + list[i].sizeX / 2;
            const Y = list[i].py + list[i].sizeY / 2;

            Engine.getCanvasContext().beginPath();
            Engine.getCanvasContext().arc(X, Y, list[i].sizeX/2, 0, 2 * Math.PI, false);
            Engine.getCanvasContext().stroke();
        }
    }

    moveBullets(list: Bullet[]): void {
        for (let i = 0; i < list.length; i++) {
            list[i].move();
        }
    }

    removeBullets(list: Bullet[], width: number, height: number): Bullet[] {
        for (let i = 0; i < list.length; i++) {
            const rx = Math.pow(list[i].px - list[i].centerX, 2);
            const ry = Math.pow(list[i].py - list[i].centerY, 2);
            if (list[i].py > height || list[i].py < 0 ||
                list[i].px > width || list[i].px < 0  ||
                rx + ry > Math.pow(list[i].range,2 )) {
                list.splice(i, 1);
            }
        }
        return list;
    }

    applyLogic(list: Bullet[]): void {
        this.moveBullets(list);
        this.render(list);
    }

    render(list: Bullet[]): void {
        for (let i = 0; i < list.length; i++) {
            const {image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY} = list[i];
            Engine.getCanvasContext().drawImage(image, spx, spy, spSizeX, spSizeY, px, py, sizeX, sizeY);
        }
    }
}