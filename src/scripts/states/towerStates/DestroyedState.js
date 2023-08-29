import { TowerState } from './TowerState.js';


class DestroyedState extends TowerState {
    enter(tower) {
        console.log('Entering destroyed state');
    }

    update(tower) {
        // Aim and transition to shooting state if ready
    }
}


export { DestroyedState }