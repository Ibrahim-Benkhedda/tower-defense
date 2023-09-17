import { eventEmitter } from "./EventEmitter";

/**
 * @desc class that runs continuously during gameplay, by
 * processing the game's input, update and render methods continuously 
 * Design adapted from: https://gameprogrammingpatterns.com/game-loop.html
*/
class GameLoop {
    /**
     * @param {Object} game - reference to the Game object
     */
    constructor(game) {
        this.game = game;
        // checks if the game loop is running
        this.isRunning = false;
        eventEmitter.on('gameOver', () => {
            this.stop();
        });
    }

    /**
     * @desc starts the game loop
     */
    run() {
        this.isRunning = true;
        this.loop();
    }

    /**
     * @desc The game loop, calls the game's
     * processInput, update, and render methods,
     * then schedules the next iteration
     */
    loop() {
        if (this.isRunning) {
            this.game.processInput();
            this.game.update();
            this.game.render();
            
            requestAnimationFrame(() => this.loop());

        }
    }

    /**
     * @desc stops the game loop
     */
    stop() {
        this.isRunning = false;
    }


}


export { GameLoop }
