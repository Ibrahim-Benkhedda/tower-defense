import catapultImpactData from '../../../../assets/sprites/towers/weapon-impact.json';
import catapultImpactTexture from '../../../../assets/sprites/towers/weapon-impact.png';
import spellImpactDataLevel1 from '../../../assets/sprites/towers/Tower 05 - Level 01 - Projectile - Impact.json';
import spellImpactDataLevel2 from '../../../assets/sprites/towers/Tower 05 - Level 02 - Projectile - Impact.json';
import spellImpactDataLevel3 from '../../../assets/sprites/towers/Tower 05 - Level 03 - Projectile - Impact.json';
import spellImpactTextureLevel1 from '../../../assets/sprites/towers/Tower 05 - Level 01 - Projectile - Impact.png';
import spellImpactTextureLevel2 from '../../../assets/sprites/towers/Tower 05 - Level 02 - Projectile - Impact.png';
import spellImpactTextureLevel3 from '../../../assets/sprites/towers/Tower 05 - Level 03 - Projectile - Impact.png';


const projectiles = {
    bolt: {
        data: catapultImpactData,
        texture: catapultImpactTexture
    },

    magic: {
        1: {data: spellImpactDataLevel1, texture: spellImpactTextureLevel1},
        2: {data: spellImpactDataLevel2, texture: spellImpactTextureLevel2},
        3: {data: spellImpactDataLevel3, texture: spellImpactTextureLevel3}
    }
}

export { projectiles };