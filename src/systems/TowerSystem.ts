import {Enemy} from "../objects/Enemy";
import {Engine} from "../Engine.";
import {Tower} from "../objects/Tower";

export class TowerSystem {
    applyLogic = (list: Tower[], enemyList: Enemy[]): void => {
        for (let i = 0; i < list.length; i++) {
            list[i].setEnemiesInRange(this.getEnemyInRange(enemyList, list[i]));
            list[i].updateTowerShootingAngle();
            list[i].shoot();
            list[i].renderRange(Engine.getGameStateSystem().renderRange);
        }
    }

    getEnemyInRange = (enemyList: Enemy[], tower:Tower): Enemy[] => {
        const rez: Enemy[] = [];
        for (let i = 0; i < enemyList.length; i++) {
            const ex = enemyList[i].px;
            const ey = enemyList[i].py;
            const x = ex - tower.px;
            const y = ey - tower.py;

            if (x * x + y * y <= tower.range * tower.range) {
                rez.push(enemyList[i]);
            }
        }
        return rez;
    }
}

