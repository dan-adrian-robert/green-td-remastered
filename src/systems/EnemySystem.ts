import {GameMap} from "../objects/GameMap";
import {Enemy} from "../objects/Enemy";
import {Engine} from "../Engine.";
import {ACTIVE_EFFECTS, BULLET_EFFECT} from "../types/types";

export class EnemySystem {
    collideWithCheckPoint(map: GameMap, enemy: Enemy) {
        const cp = map.getCp(enemy.currentCp);

        if (Math.abs(enemy.px - cp.x) < enemy.sizeX &&
            Math.abs(enemy.py - cp.y) < enemy.sizeY ) {
            enemy.dir = cp.dir;
            enemy.currentCp += 1;
            enemy.changeSpriteDir(enemy.dir);
        }
    }

    applyLogic(listEnemy: Enemy[], map: GameMap) {
        Engine.setEnemyList(listEnemy.map((enemy: Enemy) => {
            this.collideWithCheckPoint(map, enemy);
            enemy.move();
            enemy.applyEffects();
            enemy.tickEffects();
            enemy.updateSprite();
            enemy.hp.updatePosition(enemy);
            enemy.render();
            enemy.hp.render();
            return enemy;
        }))
    }

    getDefaultActiveEffectsConfig():ACTIVE_EFFECTS {
       return {
           [BULLET_EFFECT.NONE]: {
               duration: 0,
               damage: 0,
               slow: 0,
               stun: 0,
           },
           [BULLET_EFFECT.STUN]: {
               duration: 0,
               damage: 0,
               slow: 0,
               stun: 0,
           },
           [BULLET_EFFECT.SLOW]: {
               duration: 0,
               damage: 0,
               slow: 0,
               stun: 0,
           },
           [BULLET_EFFECT.POISON]: {
               duration: 0,
               damage: 0,
               slow: 0,
               stun: 0,
           },
           [BULLET_EFFECT.BURN]: {
               duration: 0,
               damage: 0,
               slow: 0,
               stun: 0,
           },
        };
    }
}

