
import catapultDataLevel1 from '../../../assets/sprites/towers/Catapult - Level 01 - Projectile.json';
import catapultDataLevel2 from '../../../assets/sprites/towers/Catapult - Level 02 - Projectile.json';
import catapultDataLevel3 from '../../../assets/sprites/towers/Catapult - Level 03 - Projectile.json';


import catapultTextureLevel1 from '../../../assets/sprites/towers/Catapult - Level 01 - Projectile.png';
import catapultTextureLevel2 from '../../../assets/sprites/towers/Catapult - Level 02 - Projectile.png';
import catapultTextureLevel3 from '../../../assets/sprites/towers/Catapult - Level 03 - Projectile.png';

import catapultImpactData from '../../../assets/sprites/towers/catapult-impact.json';
import catapultImpactTexture from '../../../assets/sprites/towers/catapult-impact.png';
import spellImpactDataLevel1 from '../../../assets/sprites/towers/Wizard - Level 01 - Projectile - Impact.json';
import spellImpactDataLevel2 from '../../../assets/sprites/towers/Wizard - Level 02 - Projectile - Impact.json';
import spellImpactDataLevel3 from '../../../assets/sprites/towers/Wizard - Level 03 - Projectile - Impact.json';
import spellImpactTextureLevel1 from '../../../assets/sprites/towers/Wizard - Level 01 - Projectile - Impact.png';
import spellImpactTextureLevel2 from '../../../assets/sprites/towers/Wizard - Level 02 - Projectile - Impact.png';
import spellImpactTextureLevel3 from '../../../assets/sprites/towers/Wizard - Level 03 - Projectile - Impact.png';


const projectiles = {
    catapult: {
        1: { data: catapultDataLevel1, texture: catapultTextureLevel1 },
        2: { data: catapultDataLevel2, texture: catapultTextureLevel2 },
        3: { data: catapultDataLevel3, texture: catapultTextureLevel3 }
    },
    wiazrd: {
        1: {
            data: spellImpactDataLevel1,
            texture: spellImpactTextureLevel1
        },
        2: {
            data: spellImpactDataLevel2,
            texture: spellImpactTextureLevel2
        },
        3: {
            data: spellImpactDataLevel3,
            texture: spellImpactTextureLevel3
        }
    }
};


const impacts = {
    bolt: {
        data: catapultImpactData,
        texture: catapultImpactTexture
    },

    magic: {
        1: { data: spellImpactDataLevel1, texture: spellImpactTextureLevel1 },
        2: { data: spellImpactDataLevel2, texture: spellImpactTextureLevel2 },
        3: { data: spellImpactDataLevel3, texture: spellImpactTextureLevel3 }
    }
}

export { projectiles, impacts };