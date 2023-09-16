import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig.js';

/**
 * Class that represents a tile that a tower can be built upon.
 */
class BuildableTile {
    /**
     * Create a new buildable tile.
     * @param {Object} position - The x and y coordinates for the tile.
     */
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.tileSize = GameConfig.TILE_SIZE;
        this.alpha = 0;
        this.obj = new PIXI.Graphics();
        this.isFree = true;
        
    }


    /**
     * updates the tile based on the mouse position.
     * @param {Object} mousePosition - current mouse x and y coordinates
     */
    update(mousePosition) {
        // check for collision
        if (this.isColliding(mousePosition)) {
            this.alpha = 0.5;
        } else {
            this.alpha = 0.1;       
        }
        
    }


    /**
     * checks if the mouse is over the tile
     * @param {Object} mousePosition - T current mouse x and y coordinates.
     * @return {boolean} true if mouse is over the tile.
     */
    isColliding(mousePosition) {
        return mousePosition.x > this.x &&
            mousePosition.x < this.x + this.tileSize &&
            mousePosition.y > this.y &&
            mousePosition.y < this.y + this.tileSize;
    }


    /**
     * renders the tile
     * @param {Object} stage - The PIXI stage where the tile will be rendered.
     */
    render(stage) {
        this.obj.clear();  // clear previous drawings
        this.obj.beginFill(0x008000, this.alpha); 
        this.obj.drawRect(this.x, this.y, GameConfig.TILE_SIZE, GameConfig.TILE_SIZE);
        stage.addChild(this.obj)
    }
}


export { BuildableTile };