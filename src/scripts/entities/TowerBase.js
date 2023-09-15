import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from '../assetsConfig/towers/config.js';
import { GameConfig } from '../core/GameConfig.js';

/**
 * @desc Class that represents the base of the tower
 */
class TowerBase {
    /**
     * Creates a Base Entity for the Tower
     * @param {string} type 
     * @param {string} level 
     */
    constructor(type, level) {
        this.type = type;
        this.level = level;
        this.sprite = spriteLoader.loadStaticSprite(
            TowerAssets.bases[type][level].texture
        );
        
    }

    /**
     * @desc sets the position of the base
     * @param {number} x - x position of the base
     * @param {number} y - y position of the base
     */
    setPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }


    /**
     * @desc renders the tower base 
     * @param {Object} app - application where the sprite will be rendered
     */
    render(stage) {
        stage.addChild(this.sprite);
    }

    /**
     * @desc Updates the sprite of the base based on its current type and level.
     * This method replaces the old sprite with a new sprite corresponding to
     * the base's current type and level, while retaining the previous position.
     */
    updateSprite() {
        // Save the old position of the sprite for later use
        const oldX = this.sprite.x;
        const oldY = this.sprite.y;

        // Create a new sprite based on the base's current type and level
        this.sprite = spriteLoader.loadStaticSprite(
            TowerAssets.bases[this.type][this.level].texture
        );

        // Set the new sprite's position to match the old sprite's position
        this.setPosition(oldX, oldY);
    }

    /**
     * @desc Checks if the base can be leveled up.
     * @returns {boolean} True if the base can be leveled up, else return false
     */
    canLevelUp() {
        // Check if the base level is below the maximum level allowed for 
        // either the 'stone' or 'wizard' types
        return this.level < GameConfig.MAX_BASE_LEVEL.stone ||
               this.level < GameConfig.MAX_BASE_LEVEL.wizard;
    }

    destroy() {
        // code to handle the destruction of the base
    }
}


export { TowerBase };