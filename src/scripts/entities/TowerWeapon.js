import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from "../assetsConfig/towers/config.js";
import { Projectile } from './Projectile.js';
import { eventEmitter } from '../core/EventEmitter.js';
import { isWithinRadius } from '../utils/helpers.js';

/**
 * @desc Clas that represents the weapon of the Tower Entity
 */

class TowerWeapon {
    /**
     * @desc creates a Tower Weapon Entity
     * @param {string} type  - type of weapon
     * @param {string} level - level of the weapon
     */

    constructor(type, level) {
        this.type = type;
        this.level = level;
        this.damage = 0;

        // loads the the weapon sprite.
        this.sprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.weapons[type][level].data,
            TowerAssets.weapons[type][level].texture
        );

        // register an event listener for shooting
        eventEmitter.on('shoot', (data) => {
            this.shootAt(data.targetX, data.targetY);
        });

        // position for the weapon
        this.position = {x: this.sprite.x, y: this.sprite.y};

        // boolean to check if the weapon is reloading
        this.isReloading = false;

        // radius witih the weapon can shoot
        this.radius = 300;
    }

    /**
     * @desc adds the weapon sprite to the PIXI app stage for rendering.
     * @param {PIXI.Application} app The PIXI application.
     */
    render(app) {
        app.stage.addChild(this.sprite);
    }


    update() {

    }

    /**
     * @desc sets the position of the weapon
     * @param {number} x - x position of the weapon
     * @param {number} y - y position of the weapon
     */
    setPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }


    /**
     * @desc plays the shooting animation for the weapon
     */
    playShootAnimation() {    
        this.sprite.loop = false; // don't loop the animation
        this.sprite.gotoAndPlay(0); // Start the animation
    }
    
    /**
     * @desc checks if the given target is within the weapon radius
     * @param {Object} target - target to check
     * @returns {boolean} returns whether target is witihn radius or not 
     */
    isTargetInRange(target) {
        return isWithinRadius(this.sprite.x, this.sprite.y, target.x, target.y, this.radius);
    }

    /**
     * @desc aims the weapon at a given target.
     * @param {Object} target - target to aim at.
     */
    aimAt(target) {
        // if target is in range, shoot
        if (this.isTargetInRange(target)) {
            console.log('Target is in range.');
        }
        else {
            console.log('target is out of range');
        }
    }

    /**
     * @desc sets the weapon cooldown/reloading duration.
     * @param {number} duration - cooldown duration
     */
    setCooldown(duration) {
        if (this.isReloading) {
            console.log('reloading');
            return;
        }

        this.isReloading = true;

        setTimeout(() => {
            console.log('weapon reloaded');
            this.isReloading = false;
            eventEmitter.emit('weaponReloaded');
        }, duration);

    }

    /**
     * @desc shoots a projectile at a given target position
     * @param {number} targetX - The x position of the target
     * @param {number} targetY - The y position of the target
     */
    shootAt(targetX, targetY) {
        const startX = this.sprite.x;
        const startY = this.sprite.y;

        const projectile = new Projectile(startX, startY, targetX, targetY);
        
        // event to indicate that projectile has been created.
        eventEmitter.emit('projectileCreated', projectile);
    }


}


export { TowerWeapon }