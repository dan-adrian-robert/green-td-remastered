export class Sprite {
    spx: number;
    spy: number;
    spSizeX:number;
    spSizeY: number;
    px: number;
    py: number;
    sizeX: number;
    sizeY: number;

    image: any;

    constructor(image: any, spx: number, spy: number, spSizeX:number, spSizeY: number,
                px: number, py: number, sizeX: number, sizeY: number) {

        this.spx = spx;
        this.spy = spy;

        this.spSizeX = spSizeX;
        this.spSizeY = spSizeY;

        this.px = px;
        this.py = py;

        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.image = image;
    }

}