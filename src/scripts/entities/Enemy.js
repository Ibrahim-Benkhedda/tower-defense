import * as PIXI from 'pixi.js';
import { spriteLoader } from '../core/SpriteLoader';
import { EnemyAssets } from '../assetsConfig/enemies/config';

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
        // create PIXI graphics object for this enemy
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x00FF00); // green
        this.graphic.drawRect(0, 0, 50, 50); // x, y, width, height
        this.graphic.endFill();

        this.graphic.x = this.x;
        this.graphic.y = this.y;

        stage.addChild(this.graphic);
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

    
}


export { Enemy };
