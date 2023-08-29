import { TowerState } from './TowerState.js';


class IdleState extends TowerState {
    enter(tower) {
        // Prepare the tower for the idle state
        console.log('Entering Idle state');
    }

    update(tower) {
        // Check for enemies, if found transition to aiming state
    }
}

export { IdleState }