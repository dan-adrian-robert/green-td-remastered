import {Engine} from "../Engine.";

export class Sound {
    pozX: number;
    pozY: number;

    sw: number;
    sh: number;

    sizeX: number;
    sizeY: number;

    onImage: any;
    offImage: any;

    on: boolean;

    constructor(imageOn: any, imageOff:any, image_width: number, image_height: number,
                positionX: number, positionY: number, sizeX: number, sizeY: number) {
        //image On
        this.onImage = imageOn;

        //image Off
        this.offImage = imageOff;

        //single sprite size
        this.sw = image_width;
        this.sh = image_height;

        //sound image size
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        //position
        this.pozX = positionX;
        this.pozY = positionY;

        //on state
        this.on = true;

    }

    //turn sound on or off
   clickSound() {
        this.on = !this.on;
   }

    //rendering function
    render() {
        if(this.on) {
            Engine.getCanvasContext().drawImage(this.onImage,
                                    0,0, this.sw, this.sh,
                                    this.pozX, this.pozY, this.sizeX, this.sizeY);
        }else {
            Engine.getCanvasContext().drawImage(this.offImage,
                                    0,0, this.sw, this.sh,
                                    this.pozX, this.pozY, this.sizeX, this.sizeY);
        }
    }
}
