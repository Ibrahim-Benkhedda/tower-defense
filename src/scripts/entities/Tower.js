import * as PIXI from 'pixi.js';
import { offsets } from "../assetsConfig/towers/config";
import { IdleState, AimingState, ShootingState, ReloadingState, DestroyedState } from '../states/towerStates/TowerStates.js';
export class Tower {
    /**
     * @desc 
     * @param {} base 
     * @param {} weapon 
     */
    constructor(base, weapon) {
        this.base = base;
        this.weapon = weapon;

        // create a container to hold both base and weapon.
        this.container = new PIXI.Container();     
        // add the base and weapon as children to the container.
        this.container.addChild(this.base.sprite);
        this.container.addChild(this.weapon.sprite);


        this.currentState = new IdleState();
        this.currentState.enter(this);
        
    }

    /**
     * @desc 
     * @param {} x 
     * @param {} y 
     */
    setPosition(x, y) {
          
        this.base.setPosition(x, y);

        const weaponOffset = this.getWeaponOffset(this.base, this.weapon);
        // checks if weaponOffset returned an object,
        // then sets the position of the weapon relative,
        // to the base. If no object was returned, 
        // the position of the weapon will be set without offset as a fallback.
        if (weaponOffset) {
            this.weapon.setPosition(x + weaponOffset.x, y + weaponOffset.y);
        }
        else {
            this.weapon.setPosition(x, y);
        }
        
    }

    /**
     * @desc 
     * @param {} state 
     */
    setState(state) {
        if (this.currentState) {
            this.currentState.exit(this);
        }       

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

        this.currentState.enter(this);
    }

    /**
     * @desc 
     * @param {} base 
     * @param {} weapon 
     * @returns 
     */
    getWeaponOffset(base, weapon) {
        const offsetKey = `${base.type}_${base.level}_${weapon.type}_${weapon.level}`;
        return offsets[offsetKey];
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

