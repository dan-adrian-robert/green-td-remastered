export class Sprite {
    sx: number;
    sy: number;
    sWidth:number;
    sHeight: number;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;

    image: any;

    constructor(image: any, sx: number, sy: number, sWidth:number, sHeight: number,
                dx: number, dy: number, dWidth: number, dHeight: number) {

        this.sx = sx;
        this.sy = sy;

        this.sWidth = sWidth;
        this.sHeight = sHeight;

        this.dx = dx;
        this.dy = dy;

        this.dWidth = dWidth;
        this.dHeight = dHeight;

        this.image = image;
    }

}