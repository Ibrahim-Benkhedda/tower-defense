import { TowerState } from './TowerState.js';
import { eventEmitter } from '../../core/EventEmitter.js';

class AimingState extends TowerState {
    constructor() {
        super();
        this.enemies = [];
        this.callback = (enemies) => {
            this.enemies = enemies;
        };

        eventEmitter.on('allEnemies', this.callback);
    }

    enter(tower) {
        // Prepare to aim at an enemy
        console.log('2. Entering aiming state');
        this.update(tower);
    }

    update(tower) {
        // Aim and transition to shooting state if ready
        console.log('2. updating aiming state');

        if (!this.enemies || this.enemies.length === 0) {
            console.log('No enemies to target');
            return;
        }
        
        for (const target of this.enemies) {
            tower.weapon.aimAt(target);
            if (tower.weapon.isTargetInRange(target)) {
                console.log('1111111111111111111111111111111');
                tower.setTarget(target);
                this.exit(tower);
                break;  // exit the loop as soon as a target is found
            }
        }

        
    }

    exit(tower) {
        console.log('2. exiting aiming state')
        eventEmitter.off('allEnemies', this.callback);
        tower.setState('shooting');
    }


}


export { AimingState }