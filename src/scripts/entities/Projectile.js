import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig.js';
import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from "../assetsConfig/towers/config.js";

/**
 * @desc class that represents the Projectile entity
 */
class Projectile {
    /**
     * @desc creates a new Projectile
     * @param {number} startX starting x position
     * @param {number} startY starting y positoin
     * @param {number} endX target x position
     * @param {number} endY target y position
     * @param {number} speed speed of the projectile
     */
    constructor(startX, startY, endX, endY, speed=1) {
        this.x = startX;
        this.y = startY;

        this.target = {
            x: endX,
            y: endY
        }

        this.velocity = {x: 0, y: 0};
        this.speed = speed;

        // computes the center point of the projectile
        this.center = {
            x: this.x + GameConfig.TILE_SIZE / 2,
            y: this.y + GameConfig.TILE_SIZE / 2
        }

        // create PIXI graphics object for this projectile
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0xFF0000); // red
        this.graphic.drawCircle(0, 0, 5);
        this.graphic.endFill();
    }


    /**
     * @desc updates the position of the projectile
     */
    update() {
        const distance = this.computeDistanceToPoint(this.target);
        
        // gets the angle between the projectile and the target
        const angle = Math.atan2(distance.y, distance.x);
        
        // updates the velocity based on the angle
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);

        this.x += this.velocity.x * 5;
        this.y += this.velocity.y * 5;
    }

    /**
     * @desc renders the projectile to the stage.
     */
    render(app) {
        this.graphic.x = this.x;
        this.graphic.y = this.y;
        app.stage.addChild(this.graphic);
    }


    /**
     * @desc Compute the distance from projectile to the target point
     * @param {Object} target  target point with x and y coordinates
     * @returns {Object} returns x and y distance from the projectile to the target point
     */
    computeDistanceToPoint(target) {
        return {
            x: target.x - this.x,
            y: target.y - this.y
        };
    }

}

export { Projectile }