import { TowerState } from './TowerState.js';


class AimingState extends TowerState {
    enter(tower) {
        // Prepare to aim at an enemy
        console.log('Entering aiming state');
    }

    update(tower) {
        // Aim and transition to shooting state if ready
    }
}


export { AimingState }