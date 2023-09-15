import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig';
import { miscAssets } from '../assetsConfig/misc/config';
import { spriteLoader } from '../core/SpriteLoader';

class ResourceUI {
    constructor(starterHealth, starterGold) {
        this.mainUI = new PIXI.Container();

        // Initialize Gold
        this.gold = starterGold;
        this.goldText = new PIXI.Text(`${this.gold}`, {fontSize: 24, fill: 0xFFFFFF});
        this.goldText.x = GameConfig.SCREEN_WIDTH - 200;
        this.goldText.y = 40;
        this.mainUI.addChild(this.goldText);

        // Initialize Gold animated sprite
        this.goldSprite = spriteLoader.loadAnimatedSprite(
            miscAssets.coin.data,
            miscAssets.coin.texture
        );
        this.goldSprite.x = this.goldText.x - GameConfig.TILE_SIZE;
        this.goldSprite.y = 35;

        // Play and loop the gold animation
        this.goldSprite.animationSpeed = 0.20; 
        this.goldSprite.loop = true;           
        this.goldSprite.play();                 
        this.mainUI.addChild(this.goldSprite);
        
        // Initialize Health
        this.heart = starterHealth;
        this.heartText = new PIXI.Text(`${this.heart}`, {fontSize: 24, fill: 0xFFFFFF});
        this.heartText.x = GameConfig.SCREEN_WIDTH - 200; // Position at top-right; // Position at top-right
        this.heartText.y = 10;
        this.mainUI.addChild(this.heartText);

        this.heartSprite = spriteLoader.loadStaticSprite(
            miscAssets.heart.texture
        )
        this.heartSprite.x = this.heartText.x - GameConfig.TILE_SIZE * 1.6;
        this.heartSprite.y = -4;
        this.mainUI.addChild(this.heartSprite);
        
        
    }

    /**
     * @desc Updates the health value and refreshes the UI.
     * @param {number} amount - The new health value.
     */
    updateHearts(amount) {
        this.heart = amount;
        this.heartText.text = `${this.heart}`;
    }

    /**
     * @desc Updates the gold value and refreshes the UI.
     * @param {number} amount - The new gold value.
     */
    updateGold(amount) {
        this.gold = amount;
        this.goldText.text = `${this.gold}`;
    }

    render(app) {
        app.stage.addChild(this.mainUI);
    }
}


export { ResourceUI };