import { TowerState } from './TowerState.js';
import { ShootingState } from './ShootingState.js';


class IdleState extends TowerState {
    enter(tower) {
        console.log('1. Entering Idle state');
        this.timeoutID = null;
        this.shouldExit = false;
        this.update(tower);
    }

    update(tower) {
        console.log('1. updating idle state');
        this.timeoutID = setTimeout(() => {
            this.shouldExit = true;
        }, 2000);

        if (this.shouldExit) {
            this.shouldExit = false;
            this.exit(tower);        
        }
    }

    exit(tower) {
        console.log('1. Exiting Idle State');
        clearTimeout(this.timeoutID);
        tower.setState('aiming');  // transition to shooting state
    }
}

export { IdleState }