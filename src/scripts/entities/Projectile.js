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
     * @param {Object} target Enemy entity object
     * @param {number} speed speed of the projectile
     */
    constructor(start, target, type='bolt', level='1') {
        this.x = start.x;
        this.y = start.y;
        this.target = target;

        this.velocity = {x: 0, y: 0};
        this.radius = 25;

        this.sprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.projectiles[type][level].data,
            TowerAssets.projectiles[type][level].texture
        )
        
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(0.5);
        this.sprite.loop = true;
        // Start the animation
        this.sprite.play();
    }


    /**
     * @desc updates the position of the projectile
     */
    update() {
        const distance = this.computeDistanceToPoint({ x: this.target.x, y: this.target.y });
        
        // gets the angle between the projectile and the target
        const angle = Math.atan2(distance.y, distance.x);
        
        this.sprite.rotation = angle + (Math.PI / 2);

        // updates the velocity based on the angle
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);

        this.x += this.velocity.x * 5;
        this.y += this.velocity.y * 5;

        
    }

    /**
     * @desc renders the projectile to the stage.
     */
    render(stage) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        stage.addChild(this.sprite);
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