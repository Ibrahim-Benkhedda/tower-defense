import { TowerState } from './TowerState.js';
import { eventEmitter } from '../../core/EventEmitter.js';


class ReloadingState extends TowerState {
    enter(tower) {
        // Prepare the tower for the idle state
        console.log('4. Entering reloading state');
        this.update(tower);
    }

    update(tower) {
        tower.weapon.setCooldown(2500);
        eventEmitter.on('weaponReloaded', () => {
            tower.weapon.sprite.gotoAndStop(0);
            this.exit(tower);
        });
        
    }

    exit(tower) {
        console.log('4. Exiting RELOADING state');
        tower.setState('shooting');
    }
}

export { ReloadingState }