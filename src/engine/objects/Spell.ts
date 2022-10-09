import {Engine} from "../Engine.";
import {SOUND_FOLDER_PATHS} from "../../types/SoundTypes";
import {SPELL_SOUNDS} from "../../types/types";

export class Spell {

    aoeSizeX: number;
    aoeSizeY: number;

    splSizeX: number;
    splSizeY: number;

    sound_src: any
    aoeImage: any;
    aoew: number;
    aoeh: number;

    aoePozX: number;
    aoePozY: number;

    tick: number;
    dmg: number;
    thunderStriked: boolean;
    price: number;
    sound: any

    indSpellX: number;
    indSpellY: number;

    splPozX: number;
    splPozY: number;

    splw: number;
    splh: number;

    spell: any;

    constructor(image_aoe_src: string, image_aoe_width: number, image_aoe_height: number,
                image_spl_src: string, image_spl_width: number, image_spl_height: number,
                aoeSizeX: number, aoeSizeY: number,
                aoePositionX: number, aoePositionY: number,
                splSpriteX: number, splSpriteY: number,
                splSizeX: number, splSizeY: number,
                splPositionX: number, splPositionY: number,
                soundType: SPELL_SOUNDS) {
        //------------AOE--------------|
        //image
        this.aoeImage = new Image(image_aoe_width, image_aoe_height);
        this.aoeImage.src = image_aoe_src;

        //Sprite size
        this.aoew = image_aoe_width;
        this.aoeh = image_aoe_height;

        //Size
        this.aoeSizeX = aoeSizeX;
        this.aoeSizeY = aoeSizeY;

        //Position
        this.aoePozX = aoePositionX;
        this.aoePozY = aoePositionY;
        //------------------------------|

        //------------Spell--------------|
        //image
        this.spell = new Image(image_spl_width, image_spl_height);
        this.spell.src = image_spl_src;

        //sprite size
        this.splw = splSpriteX;
        this.splh = splSpriteY;

        //Size
        this.splSizeX = splSizeX;
        this.splSizeY = splSizeY;

        //Position
        this.splPozX = splPositionX;
        this.splPozY = splPositionY;

        this.indSpellX = 0;
        this.indSpellY = 0;
        //------------------------------|

        //------------Sound-----------|
        this.sound = Engine.getSoundFromKey(SOUND_FOLDER_PATHS.SPELLS, soundType);

        //------------Logic-----------|
        this.tick = 0;
        this.dmg = 0;
        this.thunderStriked = true;
        //------------------------------|

        this.price = 36;
    }


    //rendering function for aoe
    renderAoe(condition: boolean) {
        if(condition)
         Engine.getCanvasContext().drawImage(this.aoeImage,
                                0,0, this.aoew, this.aoeh,
                                this.aoePozX, this.aoePozY, this.aoeSizeX, this.aoeSizeY);

    }

    renderSpell() {
        if(!this.thunderStriked)
            Engine.getCanvasContext().drawImage(this.spell,
                                this.indSpellX, this.indSpellY, this.splw, this.splh,
                                this.splPozX, this.splPozY, this.splSizeX, this.splSizeY);


        Engine.getCanvasContext().beginPath();
    }

    animate() {
        this.tick += 1;

        if(this.tick >= 5 && !this.thunderStriked) {
            this.indSpellX += this.splw;
            this.tick = 0;
        }

        if(this.indSpellX > this.spell.width) {
            this.indSpellX = 0;
            this.thunderStriked = true;
        }
    }

    setAoePoz(mousePos: any) {
        this.aoePozX = mousePos.x - this.aoeSizeX / 2;
        this.aoePozY = mousePos.y - this.aoeSizeY / 2;
    }

    cast() {
      if (Engine.getMoney() >= this.price) {
        this.thunderStriked = false;
        this.splPozX = this.aoePozX + this.aoeSizeX / 4;
        this.splPozY = this.aoePozY - this.aoeSizeY / 2;
        this.getEnemiesInRange();
        Engine.decreaseMoney(this.price);
      }
    }

    playSound() {
        if(!this.thunderStriked)
            this.applySoundLogic();
    }

    applyLogic(condition: boolean) {
        this.playSound();
        this.renderAoe(condition);
        this.renderSpell();
        this.animate();
    }

    applySoundLogic() {
        this.sound.volume= Engine.getSound().on ? 0.5 : 0;
        this.sound.play();
    }

    getEnemiesInRange() {
        const listEnemy = Engine.getEnemyList();
        for (let i = 0; i < listEnemy.length; i++ ) {
            const ex = listEnemy[i].px + listEnemy[i].sizeX / 2;
            const ey = listEnemy[i].py + listEnemy[i].sizeY / 2;

            const x = ex - this.aoePozX + this.aoeSizeX / 2;
            const y = ey - this.aoePozY + this.aoeSizeY / 2;

            if(x * x + y * y <=  this.aoeSizeY * this.aoeSizeY * this.aoeSizeY * this.aoeSizeY / 4) {
                listEnemy[i].hp.value -= 25;
            }
        }
        Engine.decreaseMoney(35);
    }
}
