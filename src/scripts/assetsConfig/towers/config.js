import { bases } from './baseAssets.js';
import { projectiles } from './projectileAssets.js';
import { weapons } from './weaponAssets.js';

const offsets = {
    'stone_1_catapult_1': { x: 0, y: 15 },
    'stone_1_catapult_2': { x: -15, y: -5 },
    'stone_1_catapult_3': { x: - 15, y: -5 },
    'stone_2_catapult_1': { x: 0, y: 10 },
    'stone_2_catapult_2': { x: -15, y: -10 },
    'stone_2_catapult_3': { x: - 15, y: -10 },
    'stone_3_catapult_1': { x: 0, y: 0 },
    'stone_3_catapult_2': { x: -15, y: -20 },
    'stone_3_catapult_3': { x: - 15, y: -15 }
}


const TowerAssets = { bases, weapons, projectiles };

export { TowerAssets, offsets }





