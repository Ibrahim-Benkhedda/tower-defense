import weapon1Data from '../../../assets/sprites/towers/weapon-level-1.json';
import weapon2Data from '../../../assets/sprites/towers/weapon-level-2.json';
import weapon3Data from '../../../assets/sprites/towers/weapon-level-3.json';
import weapon1Texture from '../../../assets/sprites/towers/weapon-level-1.png';
import weapon2Texture from '../../../assets/sprites/towers/weapon-level-2.png';
import weapon3Texture from '../../../assets/sprites/towers/weapon-level-3.png';

import spellDataLevel1 from '../../../assets/sprites/towers/Tower 05 - Level 01 - Weapon.json';
import spellDataLevel2 from '../../../assets/sprites/towers/Tower 05 - Level 02 - Weapon.json';
import spellDataLevel3 from '../../../assets/sprites/towers/Tower 05 - Level 03 - Weapon.json';
import spellTextureLevel1 from '../../../assets/sprites/towers/Tower 05 - Level 01 - Weapon.png';
import spellTextureLevel2 from '../../../assets/sprites/towers/Tower 05 - Level 02 - Weapon.png';
import spellTextureLevel3 from '../../../assets/sprites/towers/Tower 05 - Level 03 - Weapon.png';

const weapons = {
    catapult: {
        1: { data: weapon1Data, texture: weapon1Texture },
        2: { data: weapon2Data, texture: weapon2Texture },
        3: { data: weapon3Data, texture: weapon3Texture },
    },

    spell: {
        1: {data: spellDataLevel1, texture: spellTextureLevel1},
        2: {data: spellDataLevel2, texture: spellTextureLevel2},
        3: {data: spellDataLevel3, texture: spellTextureLevel3}
    }
}

export { weapons }

