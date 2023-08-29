import { TowerState } from './TowerState.js';


class ReloadingState extends TowerState {
    enter(tower) {
        // Prepare the tower for the idle state
        console.log('Entering reloading state');
    }

    update(tower) {
        
    }
}

export { ReloadingState }