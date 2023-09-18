import * as PIXI from 'pixi.js';
import { GameMap } from './GameMap.js';
import { eventEmitter } from './EventEmitter.js';
import { ResourceUI } from '../ui/ResourceUI.js';
import { GameStatusUI } from '../ui/GameStatusUI.js';
import { GameInfoUI } from '../ui/GameInfoUI.js';
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
        this.hearts = 5;
        this.golds = 100;   
        this.round = 1;
        this.score = 0;

        // initialize entities 
        this.entityManager = new EntityManager();
        this.entityManager.spawnEnemies(this.round);

        this.setupEventListeners();

        this.mousePosition = { x: 0, y: 0 };

        // post processing
        this.colorMatrix = new PIXI.ColorMatrixFilter();     
        this.colorMatrix.brightness(0.9, false);
        this.colorMatrix.contrast(0.5, false);

        // Initialize UI elements of the game.
        this.resourceUI = new ResourceUI(this.hearts, this.golds);
        this.gameStatusUI = new GameStatusUI(this.round, this.score);
        this.gameInfoUI = new GameInfoUI();
        
        // play the background music
        sounds.bgMusic.once('load', function(){
            sounds.bgMusic.play();
        });
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
        this.entityManager.updateEntities();
        this.map.update(this.mousePosition);
        this.gameStatusUI.updateRound(this.round);
        this.gameStatusUI.updateScore(this.score);

        // checks if no more hearts left, if yes, stop the game loop.
        if (this.hearts == 0) {
            sounds.bgMusic.stop();
            sounds.gameOverSFX.play();
            eventEmitter.emit('gameOver');
        }

        // checks if there's no enemies left, if yes, increment and move to next round
        if (this.entityManager.enemies.length == 0) {
            eventEmitter.emit('roundEnd');
            this.entityManager.spawnEnemies(this.round);
        }
        
    }

    /**
     * @desc render game objects
     */
    render() {
        // code to render game objects should be added here
        this.map.render(this.app.stage);
        this.entityManager.renderEntities(this.app.stage);
        this.app.stage.filters = [this.colorMatrix];
        this.resourceUI.render(this.app.stage);
        this.gameStatusUI.render(this.app.stage);
        this.gameInfoUI.render(this.app.stage);
    }

    /**
     * @desc sets up event listeners 
     */
    setupEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (this.map.isValidTilePosition(this.mousePosition) && this.golds >= 25) {
                    this.entityManager.addTower(this.mousePosition, this.app.stage);

                    eventEmitter.emit('goldUsed', 25);
                    // from https://www.reddit.com/r/gamedev/comments/1buxfz/zsorting_in_2d_games/
                    this.entityManager.towers.sort((firstTower, secondTower) => {
                        return firstTower.y - secondTower.y;
                    });

                }
            }
        });

        eventEmitter.on('enemyReachedEnd', () => {
            this.hearts -= 1;
            this.resourceUI.updateHearts(this.hearts);
            sounds.teleportSFX.play();
        });

        eventEmitter.on('goldUsed', (amount) => {
            this.golds -= amount;
            this.resourceUI.updateGold(this.golds);
        });

        eventEmitter.on('goldGained', (amount) => {
            this.golds += amount;
            this.resourceUI.updateGold(this.golds);
        });

        eventEmitter.on('roundEnd', () => {
            this.round++;
        });

        eventEmitter.on('enemyKilled', () => {
            this.score++;
        });

        // this event is triggered when an upgrade button is clicked in the TowerUpgradeUI.
        // It responds by emitting a 'currentGoldAmount' event to let the UI know how much gold is currently available
        // along with the tower ID and the type of upgrade ('base' or 'weapon')
        eventEmitter.on('requestGoldAmountForUpgrade', (data) => {
            eventEmitter.emit('currentGoldAmount', { 
                type: data.type,        // current amount of gold
                gold: this.golds,       // id of the tower being upgraded
                towerId: data.towerId   // type of upgrade ('base'/'weapon')
            });
        });
    }


}


export { Game };
