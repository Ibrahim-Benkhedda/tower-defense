import { Tower } from './Tower.js';
import { TowerBase } from './TowerBase.js'; 
import { TowerWeapon } from  './TowerWeapon.js';

/**
 * 
 */
class TowerManager {
    constructor() {
        this.towers = [];

    }

    /**
     * @desc 
     * @param {} baseType 
     * @param {} baseLevel 
     * @param {} weaponType 
     * @param {} weaponLevel 
     * @returns 
     */
    createTower(baseType, baseLevel, weaponType, weaponLevel) {
        // if (!this.isValidBaseType(baseType) || !this.isValidWeaponType(weaponType))
        const base = new TowerBase(baseType, baseLevel);
        const weapon = new TowerWeapon(weaponType, weaponLevel);
        const tower = new Tower(base, weapon);
        this.towers.push(tower);
        return tower;
    }

    /**
     * @desc 
     */
    updateTowers() {
        this.towers.forEach(tower => tower.update());
    }

    /**
     * @desc 
     * @param {PIXI.App} app 
     */
    renderTowers(app) {
        // console.log(this.towers);
        this.towers.forEach(tower => tower.render(app));
    }

    /**
     * @desc 
     * @param {} baseType 
     * @returns 
     */
    isValidBaseType(baseType) {
        return true;
    }

    /**
     * @desc 
     * @param {} weaponType 
     * @returns 
     */
    isValidWeaponType(weaponType) {
        return true;
    }
}

export { TowerManager }