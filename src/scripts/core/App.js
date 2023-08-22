import * as PIXI from 'pixi.js';
/**
 * @desc class that is responsible for configuring the main PIXI application
 */
class App {
    constructor() {
        // creates a new PIXI application
        this.app = new PIXI.Application({
            resizeTo: window,
            backgroundAlpha: 0,
            antialias: true
        });

        document.body.appendChild(this.app.view);
        this.app.renderer.view.style.position = 'absolute';
    }

    /**
     * @returns {Object} PIXI application 
     */
    getApp() {
        return this.app;
    }
}

export {App}
