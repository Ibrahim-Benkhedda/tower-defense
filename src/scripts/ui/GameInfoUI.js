import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig';
/**
 * @desc Class that represents the Info UI elements of the game.
 */
class GameInfoUI {
    constructor() {
        this.container = new PIXI.Container();

        // Initialize info button
        this.infoButton = this.createButton("Info", 10, GameConfig.SCREEN_HEIGHT - 50, 60, 40);
        this.infoButton.on('pointerdown', () => this.toggleInfoPanel());
        
        // Initialize info panel
        this.infoPanel = new PIXI.Graphics();
        this.infoPanel.beginFill(0x000000, 0.7); // Black color with 70% opacity
        this.infoPanel.drawRect(0, 0, 300, 200); // Adjust dimensions as needed
        this.infoPanel.endFill();
        this.infoPanel.x = 10; // Position at bottom-left
        this.infoPanel.y = GameConfig.SCREEN_HEIGHT - 250; // Position at bottom-left

        // Add text to the info panel
        const instructions = [
            "Build towers by pressing space on green tiles.",
            "Don't let the enemy reach the portal.",
            "Upgrade your towers by pressing on the Tower.",
            "Earn gold by killing goblins.",
            "Survive!"
        ];

        let yOffset = 10;
        for (const instruction of instructions) {
            const instructionText = new PIXI.Text(instruction, {fontSize: 14, fill: 0xFFFFFF});
            instructionText.x = 10;
            instructionText.y = yOffset;
            this.infoPanel.addChild(instructionText);
            // increment y-offset for the next line
            yOffset += 30; 
        }

        // Initially hide the info panel
        this.infoPanel.visible = false;

        // Add to container
        this.container.addChild(this.infoButton);
        this.container.addChild(this.infoPanel);
    }

    /**
     * @desc Toggles the visibility of the info panel
     */
    toggleInfoPanel() {
        this.infoPanel.visible = !this.infoPanel.visible;
    }

    /**
     * @desc renders the UI
     * @param {PIXI.Container} stage - stage to which the UI will be added
     */
    render(stage) {
        stage.addChild(this.container);
    }

    /**
     * @desc creates button with the given properties.
     * @param {string} label - text to be displayed on the button.
     * @param {number} x - x position for the button.
     * @param {number} y - y position for the button.
     * @param {number} width -  width of the button.
     * @param {number} height - height of the button.
     * @return {PIXI.Graphics} - created button as a PIXI Graphics object
     */
    createButton(label, x, y, width, height) {
        const button = new PIXI.Graphics();
        button.beginFill(0x808080);
        button.drawRect(0, 0, width, height);
        button.endFill();
        button.x = x;
        button.y = y;
        button.interactive = true;
        button.buttonMode = true;

        const buttonText = new PIXI.Text(label, { fontSize: 16, fill: 0xFFFFFF });
        buttonText.x = width / 2 - buttonText.width / 2;
        buttonText.y = height / 2 - buttonText.height / 2;
        button.addChild(buttonText);

        return button;
    }


}


export { GameInfoUI };