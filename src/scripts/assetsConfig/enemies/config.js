import skeletonData from '../../../assets/sprites/skeleton-enemy/Skeleton enemy.json';
import skeletonTexture from '../../../assets/sprites/skeleton-enemy/Skeleton enemy.png';


const EnemyAssets = {
    skeleton: {
        data: skeletonData,
        texture: skeletonTexture,
        frameTags: skeletonData.meta.frameTags
    }
}

export { EnemyAssets }