import * as PIXI from 'pixi.js';
import { spriteLoader } from '../core/SpriteLoader';
import { enemyAssets } from '../assetsConfig/enemies/config.js';

/**
 * @desc class that represents the enemy entity. 
 */
class Enemy {
    /**
     * @desc creates an Enemy object
     * @param {number} x - initial enemy x position
     * @param {number} y - initial enemy y position
     * @param {number} speed - speed of the enemy
     * @param {Array of Objects} path - enemy path to follow
     */
    constructor(x, y, speed=1, path) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.currentPathIndex = 0;
        this.path = path; // Store the path
        this.health = 100;

        // Initialize the enemy sprite
        this.enemySprite = spriteLoader.loadAnimatedSprite(
            enemyAssets.goblin.data,
            enemyAssets.goblin.texture,
        );
        this.enemySprite.anchor.set(0.5);
        this.enemySprite.x = this.x;
        this.enemySprite.y = this.y;
        this.enemySprite.animationSpeed = 0.1;
        this.enemySprite.play();
        this.enemySprite.scale.x = 2;
        this.enemySprite.scale.y = 2;
    }

    /**
     * @desc updates the position of the enemy
     */
    update() {
        // get the current point so that enemy moves towards it
        const currentPathPoint = this.getCurrentPathPoint();
        // moves the enemy towards the current path point
        this.moveToPoint(currentPathPoint);

        // checks if the enemy has reached the current path an, 
        // checks if the enemy has not reached the last point of the path.
        if (this.isAtPoint(currentPathPoint) && this.isNotAtLastPoint()) {
            // move the enemy to the next point in the path
            this.moveToNextPathPoint();
        }

    }

    /**
     * @desc renders the enemy
     * @param {Object} stage - PIXI stage where the enemy is rendered.
     */
    render(stage) {

        // Add the sprite to the stage
        stage.addChild(this.enemySprite);
        // Update the enemy sprite coordinates
        this.enemySprite.x = this.x;
        this.enemySprite.y = this.y;
 
        this.healthBar = new PIXI.Graphics();
        this.healthBar.beginFill(0xFF0000);
        this.healthBar.drawRect(-this.health / 2, 0, this.health, 10);
        this.healthBar.endFill();

        this.healthBar.x = this.x - 5;
        this.healthBar.y = this.y - 20;

        stage.addChild(this.healthBar);
    }

    /**
     * @desc get the current path point that the enemy is going to.
     * @returns {Object} returns the current path point
     */
    getCurrentPathPoint() {
        return this.path[this.currentPathIndex];
    }

    /**
     * @desc moves the enemy to the given point
     * @param {Object} point -  point to move towards to
     */
    moveToPoint(point) {
        // compute the distance from the current position to the given point
        const distance = this.computeDistanceToPoint(point);
        // computes the angle towards the given point
        const angle = Math.atan2(distance.y, distance.x);

        // update the enemy x and y coordinates based on the computed angle
        this.x += Math.cos(angle);
        this.y += Math.sin(angle);
    }

    /**
     * computes the distance from the enemy to the next point.
     * @param {Object} point - point to move towards to 
     * @returns {Ojbect} returns x and y of the distance to the point
     */
    computeDistanceToPoint(point) {
        return {
            x: point.x - this.x,
            y: point.y - this.y
        };
    }

    /**
     * @desc checks if the enemy is at the given point
     * @param {Object} point - the point to check
     * @returns {boolean} returns true if the enemy is at the given point,
     *                  else false.
     */
    isAtPoint(point) {
        return Math.round(this.x) == Math.round(point.x) &&
            Math.round(this.y) == Math.round(point.y);
    }

    /**
     * @desc checks if the enemy has reached the last point of the path
     * @returns {boolean} returns true if the enemy is not at the last point,
     *                   else false.
     */
    isNotAtLastPoint() {
        return this.currentPathIndex < this.path.length - 1;
    }

    /**
     * @desc move the enemy to the next path point
     */
    moveToNextPathPoint() {
        this.currentPathIndex++;
    }

    
    // method to decrease health
    decreaseHealth(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            // logic for when the enemy is killed
            this.health = 0;
            console.log('enemy killed');
        }
    }
}


export { Enemy };
