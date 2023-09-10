import mapLayout from '../../assets/sprites/map/GameMapLayout.json';
import { eventEmitter } from '../core/EventEmitter';
import { Enemy } from '../entities/Enemy';

/**
 * @desc Class that manages all enemies entities in the game.
 */
class EnemyManager {
    constructor() {
        // array to hold ann enemy instances
        this.enemies = [];

        // maps enemy path names to their path
        this.enemyPaths = {
            'enemyPathA': mapLayout.enemyPathA,
            'enemyPathB': mapLayout.enemyPathB,
            'enemyPathC': mapLayout.enemyPathC,
        };

    }

    /**
     * @desc updates the state of each enemy
     */
    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.update();
    
            if (this.enemyReachedEnd(enemy)) {
                // signal that enemy has reached the end.
                eventEmitter.emit('enemyReachedEnd');
                // remove this enemy from the array
                this.enemies.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * @desc render the enemies
     * @param {Object} stage - PIXI stage where the enemies is rendered
     */
    renderEnemies(stage) {
        this.enemies.forEach(enemy => enemy.render(stage));
    }

    /**
     * @desc create and add a new enemy entity
     * @param {*} x 
     * @param {*} y 
     * @param {*} speed 
     * @param {*} path 
     */
    createEnemy(x, y, speed, path) {
        const newEnemy = new Enemy(x, y, speed, path);
        this.enemies.push(newEnemy);
    }


    /**
     * @desc spawn multiple enemies
     */
    spawnEnemies() {
        for (let i = 1; i < 5; i++) {
            const xOffset = i * 300;
            const path = this.getRandomPath();
            this.createEnemy(path[0].x + xOffset, path[0].y, 1, path);
        }
    }

    /**
     * @desc get a random path for an enemy to follow
     * @returns 
     */
    getRandomPath() {
        // get all available paths
        const paths = Object.keys(this.enemyPaths);
        // randomly pick a path
        const randomKey = paths[Math.floor(Math.random() * paths.length)];
        // return the selected path
        return this.enemyPaths[randomKey];
    }

    /**
     * @desc Check if an enemy has reached the end of the path
     * @param {Object} enemy - Enemy entity object to be checked
     * @returns {boolean} returns whether the enemy has reached end or not
     */
    enemyReachedEnd(enemy) {
        // boundaries for the end zone.
        const xMin = 50;
        const xMax = 110;
        const yMin = 540;
        const yMax = 580;

        // check if the enemy has reached the end
        if (enemy.x >= xMin && enemy.x <= xMax && enemy.y >= yMin && enemy.y <= yMax) {
            return true;
        }

        return false;
    }

}


export { EnemyManager };