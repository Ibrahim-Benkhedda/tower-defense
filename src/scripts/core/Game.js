import * as PIXI from 'pixi.js';
import { GameConfig } from './GameConfig.js'
import { TowerManager } from '../entities/TowerManager.js';

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
        this.setup();
        
        this.mousePosition = { x: 0, y: 0 };

    }



    /**
     * @desc sets up the initial state of the game objects
     */
    setup() {

        this.towerManager = new TowerManager();

        const stoneTower = this.towerManager.createTower('stone', 2, 'catapult', 2);
        const rockTower = this.towerManager.createTower('stone', 3, 'catapult', 3);

        stoneTower.setPosition(100, 200);
        rockTower.setPosition(200, 200);

        //console.log(this.app);
        console.log(this.towerManager.towers);


        window.addEventListener('mousemove', (event) => {
            // console.log("Mouse moved:", event.clientX, event.clientY);
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.addTower();
            }
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
        // code to update game state should be added here,
        // such as position of objects, collision detection, etc.  
        
        this.towerManager.updateTowers();
        // console.log(this.mousePosition)
    }

    /**
     * @desc render game objects
     */
    render() {
        // code to render game objects should be added here
        this.towerManager.renderTowers(this.app);
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


    addTower() {
        const newTower = this.towerManager.createTower('stone', 1, 'catapult', 1);
        newTower.setPosition(this.mousePosition.x, this.mousePosition.y);
    }

}

export { Game }