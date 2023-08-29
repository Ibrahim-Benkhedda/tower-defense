import { TowerAssets } from '../assetsConfig/towers/config';

const GameConfig = {
    TOWER_BASE_TYPES: Object.keys(TowerAssets.bases),
    TOWER_WEAPON_TYPES: Object.keys(TowerAssets.weapons),
    MAX_BASE_LEVEL: { 'stone': 3,'wizard': 3 },
    MAX_WEAPON_LEVEL: { 'catapult': 3,'spell': 3 },

}

export { GameConfig }
