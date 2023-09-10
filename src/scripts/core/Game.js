import * as PIXI from 'pixi.js';
import { GameConfig } from './GameConfig.js'
import { GameMap } from './GameMap.js';
import { WaypointManager } from '../managers/WaypointManager.js';
import { TowerManager } from '../managers/TowerManager.js';
import { ProjectileManager} from '../managers/ProjectileManager.js';
import { EnemyManager } from '../managers/EnemyManager.js';
import { eventEmitter } from './EventEmitter.js';

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


        this.colorMatrix = new PIXI.ColorMatrixFilter();

        // post processing
        this.colorMatrix.brightness(0.9, false);
        this.colorMatrix.contrast(0.5, false);

    }



    /**
     * @desc sets up the initial state of the game objects
     */
    setup() {

        this.map = new GameMap();
        this.towerManager = new TowerManager();
        this.projectileManager = new ProjectileManager();
        this.waypointManager = new WaypointManager();
        this.enemyManager = new EnemyManager();
        this.hearts = 3;
        this.enemyManager.spawnEnemies();


        window.addEventListener('mousemove', (event) => {
            // console.log("Mouse moved:", event.clientX, event.clientY);
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (this.map.isValidTilePosition(this.mousePosition)) {
                    this.addTower();

                    // https://www.reddit.com/r/gamedev/comments/1buxfz/zsorting_in_2d_games/
                    this.towerManager.towers.sort((firstTower, secondTower) => {
                        return firstTower.y - secondTower.y;
                    });

                    console.log(this.towerManager.towers)
                }
            }

            if (event.code === 'Enter') {
                this.addProjectile();
            }
        });
        

        eventEmitter.on('enemyReachedEnd', () => {
            this.hearts -= 1;
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
        this.projectileManager.updateProjectiles();
        this.enemyManager.updateEnemies();
        this.map.update(this.mousePosition);
        // list all enemies,
        eventEmitter.emit('allEnemies', this.enemyManager.enemies);
        console.log(this.hearts);
    
        
    }

    /**
     * @desc render game objects
     */
    render() {
        // code to render game objects should be added here
        this.map.render(this.app.stage);
        this.towerManager.renderTowers(this.app);
        this.projectileManager.renderProjectiles(this.app);
        this.enemyManager.renderEnemies(this.app.stage);
        this.app.stage.filters = [this.colorMatrix];

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

    addProjectile() {
        const x1 = this.mousePosition.x;
        const y1 = this.mousePosition.y;
        const x2 = 600, y2 = 600;

        const projectile = this.projectileManager.createProjectile(x1, y1, x2, y2, 5);
        this.projectileManager.addProjectile(projectile);
    }
}

export { Game }