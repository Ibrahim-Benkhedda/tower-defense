import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from "../assetsConfig/towers/config.js";

/**
 * @desc 
 */
export class TowerWeapon {
    constructor(type, level) {
        this.type = type;
        this.level = level;
        this.damage = 0;
        this.sprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.weapons[type][level].data,
            TowerAssets.weapons[type][level].texture
        );

    }

    /**
     * 
     * @param {} x 
     * @param {} y 
     */
    setPosition(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }


    /**
     * @desc 
     */
    playShootAnimation() {
        
        this.sprite.loop = false; // don't loop the animation
        this.sprite.onComplete = () => {
            // Transition back to aiming or idle state when animation is complete
        };
        this.sprite.gotoAndPlay(0); // Start the animation
    }
    
    aimAt(target) {

    }

    shootAt(target) {
        
    }

    render(app) {
        app.stage.addChild(this.sprite);
    }
}