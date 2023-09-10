import { TowerState } from './TowerState.js';
import { eventEmitter } from '../../core/EventEmitter.js';

class ShootingState extends TowerState {
    enter(tower) {
        // Prepare to shoot at an enemy
        console.log('3. Entering shooting state');

        const target = tower.getTarget();
        console.log('current target', target);

        tower.weapon.playShootAnimation();
        tower.weapon.sprite.onComplete = () => {
            eventEmitter.emit('shoot', {targetX: target.x, targetY: target.y});
            this.update(tower);
        };
        
    }

    update(tower) {
        // Aim and transition to shooting state if ready
        console.log('3. Updating shooting state');
        this.exit(tower);
    }

    exit(tower) {
        // go back to reloading state 
        console.log('3. Exiting Shooting state')
        tower.setState('reloading');
    }
}


export { ShootingState }