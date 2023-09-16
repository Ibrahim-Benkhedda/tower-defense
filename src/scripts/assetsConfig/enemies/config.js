import skeletonData from '../../../assets/sprites/skeleton-enemy/Skeleton enemy.json';
import skeletonTexture from '../../../assets/sprites/skeleton-enemy/Skeleton enemy.png';

import goblinData from '../../../assets/sprites/skeleton-enemy/goblin scout - silhouette all animations-walk.json';
import goblinTexture from '../../../assets/sprites/skeleton-enemy/goblin scout - silhouette all animations-walk.png';


const enemyAssets = {
    skeleton: {
        data: skeletonData,
        texture: skeletonTexture,
        frameTags: {
            'idle': { from: 0, to: 3 },
            'attack': { from: 4, to: 16 },
            'hit': { from: 17, to: 19 },
            'walk': { from: 20, to: 31 },
            'death': { from: 32, to: 44 }
        }
    },

    goblin: {
        data: goblinData,
        texture: goblinTexture
    }


}

export { enemyAssets }