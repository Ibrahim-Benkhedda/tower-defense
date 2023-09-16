import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from "../assetsConfig/towers/config.js";
import { Projectile } from './Projectile.js';
import { eventEmitter } from '../core/EventEmitter.js';
import { isWithinRadius, makeid } from '../utils/helpers.js';
import { GameConfig } from '../core/GameConfig.js';

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
        this.damage = 15;
        this.id = makeid(10);
        this.angle = 1;

        // loads the the weapon sprite.
        this.sprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.weapons[type][level].data,
            TowerAssets.weapons[type][level].texture
        );

        // position for the weapon
        this.position = { x: this.sprite.x, y: this.sprite.y };

        // boolean to check if the weapon is reloading
        this.isReloading = false;

        // radius witih the weapon can shoot
        this.radius = 300;
    }

    /**
     * @desc adds the weapon sprite to the PIXI app stage for rendering.
     * @param {PIXI.Application} app The PIXI application.
     */
    render(stage) {
        stage.addChild(this.sprite);
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
            const distance = this.computeDistanceToPoint(target);

            // compute the angle between the tower weapon and the target
            this.angle = Math.atan2(distance.y, distance.x);
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
            this.sprite.gotoAndStop(0);
        }, duration);

    }

    /**
     * @desc Updates the sprite of the weapon based on its current type and level
     * This method replaces the old sprite with a new sprite corresponding to
     * the weapon's current type and level, while retaining the previous position.
     */
    updateSprite() {
        // save the old position of the sprite
        const oldX = this.sprite.x;
        const oldY = this.sprite.y;

        // moad a new sprite based on the weapon's type and level
        this.sprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.weapons[this.type][this.level].data,
            TowerAssets.weapons[this.type][this.level].texture
        );

        // set the new sprite's position to the old sprite's position
        this.setPosition(oldX, oldY);
    }

    /**
     * @desc checks if the weapon can be leveled up based on the game's config
     * @returns {boolean} True if the weapon can be leveled up, else return false
     */
    canLevelUp() {
        // Check if the weapon level is below the maximum level allowed
        // for either the catapult or spell types
        return this.level < GameConfig.MAX_WEAPON_LEVEL.catapult ||
               this.level < GameConfig.MAX_WEAPON_LEVEL.spell;
    }

    /**
     * @desc Compute the distance from tower to the target point
     * @param {Object} target  target point with x and y coordinates
     * @returns {Object} returns x and y distance from the tower to the target point
     */
    computeDistanceToPoint(target) {
        return {
            x: target.x - this.x,
            y: target.y - this.y
        };
    }

}


export { TowerWeapon }