import * as PIXI from 'pixi.js';
import { offsets } from "../assetsConfig/towers/config";
import { makeid } from '../utils/helpers';
import { eventEmitter } from '../core/EventEmitter';
import { sounds } from '../assetsConfig/tracks/config';

/**
 * Tower class represents the tower in game.
 * The class manages the position, the state and the behaviour of tower.
 */
class Tower {
    /**
     * @desc create new instance of the tower class
     * @param {TowerBase} base - the base part of the tower
     * @param {TowerWeapon} weapon - the weapon part of the tower
     */
    constructor(base, weapon) {
        this.base = base;
        this.weapon = weapon;
        this.id = makeid(10);

        // create a container to hold both base and weapon.
        this.container = new PIXI.Container();     
        // add the base and weapon as children to the container.
        this.container.addChild(this.base.sprite);
        this.container.addChild(this.weapon.sprite);

        this.x = this.container.x;
        this.y = this.container.y;

        this.target = null;
        
    }

    /**
     * @desc sets the tower position to the given x and y coordinates
     * @param {number} x - x coordinate of the tower
     * @param {number} y - y coordinate of the tower
     */
    setPosition(x, y) {
        const offsetX = -20;
        const offsetY = -100;
        
        this.base.setPosition(x + offsetX, y + offsetY);
    
        const weaponOffset = this.getWeaponOffset(this.base, this.weapon);
    
        if (weaponOffset) {
            this.weapon.setPosition(
                x + offsetX + weaponOffset.x,
                y + offsetY + weaponOffset.y
            );
        }
        else {
            this.weapon.setPosition(x + offsetX, y + offsetY);
        }
    
        this.x = x;
        this.y = y;
    }


    /**
     * @desc computes the offset position of the weapon relative to the base
     * @param {TowerBase} base - the base part of the tower.
     * @param {TowerWeapon} weapon - the weapon part of the tower.
     * @returns {Object} - the x and y offsets for the weapon
     */
    getWeaponOffset(base, weapon) {
        // store the key to look up the offset for the given weapon and base type and level
        const offsetKey = `${base.type}_${base.level}_${weapon.type}_${weapon.level}`;
        return offsets[offsetKey];
    }

    setTarget(target) {
        this.target = target;
    }


    getTarget() {
        return this.target;
    }

    /**
     * @desc update the rendering of the tower
     */
    update() {
        this.currentState.update(this);
        console.log(this.id);
    }

    /**
     * @desc render the base and weapon of the tower
     */
    render(stage) {
        this.base.render(stage);
        this.weapon.render(stage);
    }


    /**
     * @desc Levels up the base component of the tower if possible
     * This method will increment the base's level, update its sprite, 
     * and reposition the tower components accordingly.
     */
    levelUpBase() {
        // Check if the base can be leveled up
        if (this.base.canLevelUp()) {
            // Increment the base level
            this.base.level++;

            // Play Sound effect of leveling up 
            sounds.levelUpSFX.play();
            
            // Update the sprite of the base based on its new level
            this.base.updateSprite();

            // Reposition the tower components to align with the new sprite
            this.setPosition(this.x, this.y);

            // deduct 30 gold from player
            eventEmitter.emit('goldUsed', (30));
        }
    }

    /**
     * @desc Levels up the weapon component of the tower if possible
     * This method will increment the weapon's level, update its sprite, 
     * and reposition the tower components accordingly.
     */
    levelUpWeapon() {
        // Check if the weapon can be leveled up
        if (this.weapon.canLevelUp()) {
            // Increment the weapon level
            this.weapon.level++;

            // Play Sound effect of leveling up 
            sounds.levelUpSFX.play();
            // Update the sprite of the weapon based on its new level
            this.weapon.updateSprite();

            // Reposition the tower components to align with the new sprite
            this.setPosition(this.x, this.y);

            // deduct 30 gold from the player
            eventEmitter.emit('goldUsed', (30));
        }
    }
    
}


export {Tower};

