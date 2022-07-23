/**
 * @description Kamikaze constructor
 * @param {*} startX x position
 * @param {*} startY y position
 * @param {*} direction kamikaze direction
 */
import {Engine} from "../Engine.";

export class Kamikaze {
    pozX: number;
    pozY: number;
    dir: any;
    speed: number;
    damage: number;
    image_height: number;
    image_width: number;
    image: any;

    sw: number;
    sh: number;

    sizeX: number;
    sizeY: number;

    indX: number;
    indY: number;

    currentCp: any;
    animationIndex: number;
    ticks: number;
    maxTicks: number;

    constructor(startX: number, startY: number, direction: any, indexCp: number) {
        //position
        this.pozX = startX;
        this.pozY = startY;

        //direction
        this.dir = direction;
        this.speed = ally['speed'];
        this.damage = ally['damage'];

        //image
        this.image_height = ally['image_height'];
        this.image_width = ally['image_width']
        this.image = new Image(this.image_width, this.image_height);
        this.image.src = ally['image-src'];

        //sizes for a single sprite
        this.sw = ally['spriteWidth'];
        this.sh = ally['spriteHeight'];

        //enemy size
        this.sizeX = ally['sizeX'];
        this.sizeY = ally['sizeY'];

        //sprite position inside the image
        this.indX = 0;
        this.indY = 0;

        //last checkpoint
        this.currentCp = indexCp;

        //the animation index
        this.animationIndex = 0;
        this.ticks = 0;
        this.maxTicks = 1;

        //Apply this function in the beginning
        this.changeSpriteDir(this.dir);
    }

    //updates the current position of the enemy
    move() {
        //console.log("moving: " + this.pozX + " . " + this.pozY);
        //console.log(this.speed + " speed");
        this.ticks += 1;
        
        if(this.dir === 'right') {
            //move the enemy to the right
            this.pozX += Math.max(this.speed, 0);

        }else if(this.dir === 'left') {
            //move the enemy to the left
            this.pozX -= Math.max(this.speed, 0);

        }else if(this.dir === 'up') {
            //move the enemy up
            this.pozY -= Math.max(this.speed, 0);

        }else if(this.dir === 'down') {
            //move the enemy down
            this.pozY += Math.max(this.speed, 0);

        }
    }

    render() {
        Engine.getCanvasContext().drawImage(this.image,
                                this.indX, this.indY, this.sw - 10, this.sh - 20,
                                this.pozX, this.pozY-30, this.sizeX-30, this.sizeY-30);
    }

    //collide with the checkpoints and change the direction if needed
    colideWithCheckPoint(map: any) {
        //TODO add check for index out of bounds
        const cp = map.getCp(this.currentCp);

        if(Math.abs(this.pozX - cp.x) < this.sizeX &&
            Math.abs(this.pozY - cp.y) < this.sizeY ) {
            this.dir = cp.dir;
            this.currentCp += 1;
            this.changeSpriteDir(this.dir);
        }
    }

    //Change the ally facing position
    changeSpriteDir(dir: any) {
        if(dir === 'right') {
            this.indY = 3 * this.sh;
            this.indX = 0;
        }else if(dir === 'left') {
            this.indY = 1 * this.sh;
            this.indX = 0;
        } else if(dir === 'down') {
            this.indY = 0 * this.sh;
            this.indX = 0;
        }else if(dir === 'up') {
            this.indY = 2 * this.sh;
            this.indX = 0;
        }
    }

    //animate the ally
    updateSprite() {
        if(this.ticks > this.maxTicks) {
            this.ticks = 0;
            this.indX += this.sw;
            this.indX %= this.image.width;
        }
    }

    //render the collision range for the ally
    renderRange() {
        const X = this.pozX + this.sizeX / 2
        const Y = this.pozY + this.sizeY / 2;

        Engine.getCanvasContext().beginPath();
        Engine.getCanvasContext().arc(X, Y, this.sizeX / 2, 0, 2 * Math.PI, false);
        Engine.getCanvasContext().stroke();
    }
    
    renderMenuIcon () {
        const image = new Image(30, 30);
        image.src = "./images/ally/kamikaze-menu-icon.png"

        Engine.getCanvasContext().drawImage(image,
            0, 0, 400, 400,
            785, 173, 440, 440);
    }

    //applies the logic behind each ally in the current list, on the current map
    applyLogic(list: any, map: any) {
        this.renderMenuIcon();
        for(var i = 0; i < list.length; i++) {
            list[i].colideWithCheckPoint(map);
            list[i].changeSpriteDir();
            list[i].move();
            list[i].updateSprite();
            list[i].render();
        }
    }
};

export const ally: any = {
    "hp": 10,
    "speed": 2,
    "damage": 50,
    "image-src": "./images/ally/kamikaze.png",
    "image_width": 375,
    "image_height": 300,
    "spriteWidth": 75,
    "spriteHeight": 75,
    "sizeX": 75,
    "sizeY": 75,
};