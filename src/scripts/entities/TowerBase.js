import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from '../assetsConfig/towers/config.js';

/**
 * @desc Class that reprense
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
    render(app) {
        app.stage.addChild(this.sprite);
    }

    
    destroy() {
        // code to handle the destruction of the base
    }
}


export { TowerBase };