import towerBaseData from './sprites/towers/Tower.json';
import towerBaseTexture from './sprites/towers/Tower.png';
import towerWeaponData from './sprites/towers/weapon-level-3.json';
import towerWeaponTexture from './sprites/towers/weapon-level-3.png';

export const TowerAssets = {
    stoneBase: {
        data: towerBaseData,
        texture: towerBaseTexture,
    },

    catapultLevel3: {
        data: towerWeaponData,
        texture: towerWeaponTexture
    }
};