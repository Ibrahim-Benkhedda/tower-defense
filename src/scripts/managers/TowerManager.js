import { Tower } from '../entities/Tower.js';
import { TowerBase } from '../entities/TowerBase.js'; 
import { TowerWeapon } from  '../entities/TowerWeapon.js';

/**
 * 
 */
class TowerManager {
    constructor() {
        this.towers = [];
    }

    /**
     * @desc creates a Tower object and adds it to the towers array.
     * @param {string} baseType - the type of the base of the tower.
     * @param {integer} baseLevel - the level of the base of the tower.
     * @param {string} weaponType - the weapon type of the tower.
     * @param {integer} weaponLevel - the level of the weapon of the tower.
     * @returns {Tower} - Tower object
     */
    createTower(baseType, baseLevel, weaponType, weaponLevel) {
        // if (!this.isValidBaseType(baseType) || !this.isValidWeaponType(weaponType))
        // create new tower base and tower weapon object
        const base = new TowerBase(baseType, baseLevel);
        const weapon = new TowerWeapon(weaponType, weaponLevel);
        // create new tower object with the newly created base and weapon
        const tower = new Tower(base, weapon);
        // add the newly created tower to the towers array
        this.towers.push(tower);

        return tower;
    }


    /**
     * @desc updates the rendering of the towers
     */
    updateTowers() {
        this.towers.forEach(tower => tower.update());
    }

    /**
     * @desc renders all the towers in the PIXI app
     * @param {PIXI.App} app - the PIXI Application
     */
    renderTowers(app) {
        // console.log(this.towers);
        // loop through each tower and render it
        this.towers.forEach(tower => tower.render(app));

    }

    /**
     * @desc checks if the base type is valid
     * @param {string} baseType 
     * @returns {boolean}
     */
    isValidBaseType(baseType) {
        return true;
    }

    /**
     * @desc chekcs if the weapon type is valid
     * @param {string} weaponType - the type of the weapon of the tower
     * @returns 
     */
    isValidWeaponType(weaponType) {
        return true;
    }
}

export { TowerManager }