import * as PIXI from 'pixi.js';
import { spriteLoader } from './SpriteLoader.js' 
import { TowerAssets } from '../../assets/Assets.js';

/**
 * @desc core class of the game, manages the initialization,
 * input processing, updating, and rendering.
 */
class Game {
    /**
     * @desc initialize game objects
     * @param {PIXI.Application} app - PIXI Application where the game runs
     */
    constructor(app) {
        this.app = app;
        this.towers = [];
        
        // initialize game objects
        this.setup();
                  
    }

    /**
     * @desc sets up the initial state of the game objects
     */
    setup() {

        // example
        this.towerSprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.stoneBase.data,
            TowerAssets.stoneBase.texture
        );

        this.towerSprite.x = this.app.screen.width / 2;
        this.towerSprite.y = this.app.screen.height / 2;
        this.towerSprite.anchor.set(0.5);
        this.towerSprite.animationSpeed = 0.01;

        this.weaponSprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.catapultLevel3.data,
            TowerAssets.catapultLevel3.texture
        );
        
        this.weaponSprite.x = this.app.screen.width / 2;
        this.weaponSprite.y = this.app.screen.height / 2;
        this.weaponSprite.anchor.set(0.5);
        this.weaponSprite.animationSpeed = 0.25;
    }

    /**
     * @desc handles user input
     */
    processInput() {
        // code to process user inputs such as keyboard and mouse should be added here
    }

    /**
     * @desc update game state
     */
    update() {
        // code to update game state should be added here,
        // such as position of objects, collision detection, etc.  
        
        // example 
        this.towerSprite.play();
        this.weaponSprite.play();
        this.weaponSprite.rotation += 0.01;
    }

    /**
     * @desc render game objects
     */
    render() {
        // code to render game objects should be added here

        // example
        this.app.stage.addChild(this.towerSprite);
        this.app.stage.addChild(this.weaponSprite);  
    }


}

export {Game}