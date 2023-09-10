/**
 * https://mracipayam.medium.com/introduction-to-the-unity-state-machine-pattern-ad3bce7d987c
 */
import EventEmitter from 'events';

/**
 * @desc 
 */
class TowerState {
    constructor() {};
    // method that must be overridden by the subclass
    enter(tower) {};
    // method that must be overridden by the subclass
    update(tower) {};
    // method that must be overridden by the subclass
    exit(tower) {};
}


export { TowerState };