import { TowerState } from './TowerState.js';

class ShootingState extends TowerState {
    enter(tower) {
        // Prepare to shoot at an enemy
        console.log('Entering shooting state');
        // tower.weapon.playShootAnimation();
        
    }

    update(tower) {
        // Aim and transition to shooting state if ready
        // tower.weapon.playShootAnimation();
    }
}


export { ShootingState }