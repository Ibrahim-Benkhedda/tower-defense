import mapLayout from '../../assets/sprites/map/GameMapLayout.json';

class WaypointManager {
    constructor() {
        this.waypoints = {
            'enemyPathA': mapLayout.enemyPathA,
            'enemyPathB': mapLayout.enemyPathB,
            'enemyPathC': mapLayout.enemyPathC,
        }
    }  

    

    getWaypoints(key) {
        return this.waypoints[key];
    }
}


export { WaypointManager };