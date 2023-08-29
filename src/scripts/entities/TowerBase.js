import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from '../assetsConfig/towers/config.js';
export class TowerBase {
    /**
     * 
     * @param {} type 
     * @param {} level 
     */
    constructor(type, level) {
        this.type = type;
        this.level = level;
        this.sprite = spriteLoader.loadStaticSprite(
            TowerAssets.bases[type][level].texture
        );
        
    }

    /**
     * @desc 
     * @param {} x 
     * @param {} y 
     */
    setPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    /**
     * @desc 
     * @param {} app 
     */
    render(app) {
        app.stage.addChild(this.sprite);
    }

    
    destroy() {
        // code to handle the destruction of the base
    }
}