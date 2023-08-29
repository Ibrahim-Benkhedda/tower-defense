import { spriteLoader } from '../../core/SpriteLoader.js';

import baseData from '../../../assets/sprites/towers/Tower.json';
import baseTexturePath from '../../../assets/sprites/towers/Tower.png';

import mageBaseData from '../../../assets/sprites/towers/MageTower.json';
import mageBaseTexture from '../../../assets/sprites/towers/MageTower.png';

// extract the frames for each level from the baseData
const stoneLevel1 = spriteLoader.loadTextureFromFrame(baseData.frames['tower-0.aseprite'], baseTexturePath);
const stoneLevel2 = spriteLoader.loadTextureFromFrame(baseData.frames['Tower-1.aseprite'], baseTexturePath);
const stoneLevel3 = spriteLoader.loadTextureFromFrame(baseData.frames['Tower-2.aseprite'], baseTexturePath);

const mageLevel1 = spriteLoader.loadTextureFromFrame(mageBaseData.frames['Tower 05 0.aseprite'], mageBaseTexture);
const mageLevel2 = spriteLoader.loadTextureFromFrame(mageBaseData.frames['Tower 05 1.aseprite'], mageBaseTexture);
const mageLevel3 = spriteLoader.loadTextureFromFrame(mageBaseData.frames['Tower 05 2.aseprite'], mageBaseTexture);


const bases = {
    stone: {
        1: { texture: stoneLevel1 },
        2: { texture: stoneLevel2 },
        3: { texture: stoneLevel3 },
    },

    wizard: {
        1: { texture: mageLevel1},
        2: { texture: mageLevel2},
        3: { texture: mageLevel3}
    }
}

export { bases };