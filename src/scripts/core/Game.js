import * as PIXI from 'pixi.js';
import { GameConfig } from './GameConfig.js'
import { GameMap } from './GameMap.js';
import { eventEmitter } from './EventEmitter.js';
import { ResourceUI } from '../ui/ResourceUI.js';
import { sounds } from '../assetsConfig/tracks/config.js';
import { EntityManager } from '../managers/EntityManager.js';
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
        this.counter = 0;
      
        // initialize game objects
        this.map = new GameMap();
        this.hearts = 3;
        this.golds = 75;
        this.round = 1;


        // initialize entities 
        this.entityManager = new EntityManager();
        this.entityManager.spawnEnemies(this.round);

        window.addEventListener('mousemove', (event) => {
            // console.log("Mouse moved:", event.clientX, event.clientY);
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (this.map.isValidTilePosition(this.mousePosition) && this.golds >= 25) {
                    this.entityManager.addTower(this.mousePosition, this.app.stage);

                    eventEmitter.emit('goldUsed', 25);
                    // https://www.reddit.com/r/gamedev/comments/1buxfz/zsorting_in_2d_games/
                    this.entityManager.towers.sort((firstTower, secondTower) => {
                        return firstTower.y - secondTower.y;
                    });

                }
            }

            if (event.code === 'Enter') {
                this.addProjectile();
            }
        });

        eventEmitter.on('enemyReachedEnd', () => {
            this.hearts -= 1;
            this.resourceUI.updateHearts(this.hearts);
        });

        eventEmitter.on('goldUsed', (amount) => {
            this.golds -= amount;
            this.resourceUI.updateGold(this.golds);
        });

        eventEmitter.on('goldGained', (amount) => {
            this.golds += amount;
            this.resourceUI.updateGold(this.golds);
        });

        eventEmitter.on('roundEnd', () =>{
            this.round++;
            console.log('round ended, current round is', this.round);
        });

        this.mousePosition = { x: 0, y: 0 };

        this.colorMatrix = new PIXI.ColorMatrixFilter();

        // post processing
        this.colorMatrix.brightness(0.9, false);
        this.colorMatrix.contrast(0.5, false);

        this.resourceUI = new ResourceUI(this.hearts, this.golds);
        sounds.bgMusic.play();
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
        
        this.entityManager.updateEntities();
        this.map.update(this.mousePosition);

        console.log(this.hearts, this.golds);
    
        //console.log(this.entityManager.impactEffects);

        if (this.hearts == 0) {
            console.log('game over');
            bgMusic.stop();
            sounds.gameOverSFX.play();
            eventEmitter.emit('gameOver');
        }

        // checks if there's no enemies left, if yes, increment and move to next round
        if (this.entityManager.enemies.length == 0) {
            console.log('round ended');
            eventEmitter.emit('roundEnd');
            this.entityManager.spawnEnemies(this.round);
        }
        console.log(this.entityManager.enemies.length);
    }

    /**
     * @desc render game objects
     */
    render() {
        // code to render game objects should be added here
        this.map.render(this.app.stage);
        this.entityManager.renderEntities(this.app.stage);
        this.app.stage.filters = [this.colorMatrix];
        this.resourceUI.render(this.app);
    }

    mouseMoved(event) { 
        const rect = this.app.view.getBoundingClientRect();
        this.mousePosition.x = event.clientX - rect.left;
        this.mousePosition.y = event.clientY - rect.top;
        
        // console.log(this.mousePosition); // Debug
    }

    keyDownPressed(event) {
        console.log(event.clientX);
        if (event.code == 'Space') {
            this.processInput();
            this.addTower();
        }
    }

  
}


export { Game }