import * as PIXI from 'pixi.js';
import { offsets } from "../assetsConfig/towers/config";
import { IdleState, AimingState, ShootingState, ReloadingState, DestroyedState } from '../states/towerStates/TowerStates.js';

/**
 * Tower class represents the tower in game.
 * The class manages the position, the state and the behaviour of tower.
 */
export class Tower {
    /**
     * @desc create new instance of the tower class
     * @param {TowerBase} base - the base part of the tower
     * @param {TowerWeapon} weapon - the weapon part of the tower
     */
    constructor(base, weapon) {
        this.base = base;
        this.weapon = weapon;

        // create a container to hold both base and weapon.
        this.container = new PIXI.Container();     
        // add the base and weapon as children to the container.
        this.container.addChild(this.base.sprite);
        this.container.addChild(this.weapon.sprite);

        this.x = this.container.x;
        this.y = this.container.y;

        this.currentState = new IdleState();
        this.currentState.enter(this);
        this.isStateChanging = false;

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
     * @desc change the current state of the tower
     * @param {string} state - the new state to change to
     */
    setState(state) {
        // checks if the current state exists to exit the state
        //  console.log('Current State:', this.currentState.constructor.name);

        if (this.isStateChanging) return;

        this.isStateChanging = true;

        if (this.currentState) {
            this.currentState.exit(this);
        }       

        // switch to the new state
        switch (state) {
            case 'idle':
                this.currentState = new IdleState();
                break;
            case 'aiming':
                this.currentState = new AimingState();
                break;
            case 'shooting':
                this.currentState = new ShootingState();
                break;
            case 'reloading':
                this.currentState = new ReloadingState();
                break;
            case 'destroyed':
                this.currentState = new DestroyedState();
                break;
            default:
                throw new Error('state does not exist for this tower');
        }

        // enter the new state 
        this.currentState.enter(this);
        this.isStateChanging = false;

        // console.log('New State:', this.currentState.constructor.name);
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
    }

    /**
     * @desc render the base and weapon of the tower
     */
    render(app) {
        this.base.render(app);
        this.weapon.render(app);
    }

    
}

