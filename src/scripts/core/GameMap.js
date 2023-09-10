import { spriteLoader } from "./SpriteLoader";
import { GameConfig } from "./GameConfig";
import { BuildableTile } from '../entities/BuildableTile.js';
import { convert1DArrayTo2D } from "../utils/helpers";
import gameMapTexture from '../../assets/sprites/map/GameMap.png';
import mapLayout from '../../assets/sprites/map/GameMapLayout.json';


/**
 * @desc Class that represents the game map as a 2D array.
 * The class is responsible for loading the appropriate map sprite,
 * and initializing areas where towers can be built.
 */
class GameMap {
    /**
     * @desc initializes the map and buildable tiles
     */
    constructor() {
        // moad the game map texture
        this.sprite = spriteLoader.loadStaticSprite(gameMapTexture);
        // Load the tower placement data 
        this.towerPlacementData = mapLayout.towerPlacementData;
        // 2D array to store buildable tiles for tower placements
        this.towerPlacementData2D = []; 
        
        // compute the number of columns and rows based on screen dimensions and tile size
        const numCols = GameConfig.SCREEN_WIDTH / GameConfig.TILE_SIZE;
        const numRows = GameConfig.SCREEN_HEIGHT / GameConfig.TILE_SIZE;


        // converts the 1D array of tower placement data to a 2D array
        this.towerPlacementData2D = convert1DArrayTo2D(
            this.towerPlacementData, numCols
        );
        
        // array to keep track of buildable tiles
        this.tilePlacements = [];   
        
        // populates tilePlacements array with BuildableTile objects by,
        // looping through the 2D tower placement array
        this.towerPlacementData2D.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 2035) {
                    // compute the x and y screen coordinates based on row and column
                    const posX = x * GameConfig.TILE_SIZE;
                    const posY = y * GameConfig.TILE_SIZE;
                    
                    // create a new buildable tile object at the computed position
                    // and push it to array
                    this.tilePlacements.push(
                        new BuildableTile({
                            x: posX,
                            y: posY
                        })
                    );

                }
            });
        });

    } 

    /**
     * @desc checks if the given mouse position is a valid tile for tower placement
     * @param {Object} mousePosition - current mouse position/coordinates
     * @returns {boolean} - returns true if the mouse position is in the buildable position
     *                      and it's a free tile, else return false.
     */
    isValidTilePosition(mousePosition) {
        // loop through the buildable tiles array
        for (let tile of this.tilePlacements) {
            // checks if the tile is in a valid position and it's not occupied
            if (tile.isColliding(mousePosition) && tile.isFree) {
                // set the tile as occupied
                tile.isFree = false;
                return true;
            }
        }

        // false if no free and valid tile is found
        return false;
    }

    /**
     * @desc updates the state of each buildable tile.
     * @param {Object} mousePosition - the current mouse position/coordinates
     */
    update(mousePosition) {
        // update each tile with the given mouse position
        this.tilePlacements.forEach(tile => tile.update(mousePosition));
    }

    /**
     * @desc renders the map and the buildable tiles.
     * @param {Object} stage - PIXI stage that renders the game
     */
    render(stage) {
        // add the map sprite to the stage 
        stage.addChild(this.sprite);
        // render each buildable tile
        this.tilePlacements.forEach(tile => tile.render(stage));        
    }
}


export { GameMap };