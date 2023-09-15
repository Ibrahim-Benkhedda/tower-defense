import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig';
import { eventEmitter } from '../core/EventEmitter';

class TowerUpgradeUI {
    constructor(tower) {
        this.container = new PIXI.Container();
        this.tower = tower;
        this.width = GameConfig.TILE_SIZE * 5;
        this.height = GameConfig.TILE_SIZE * 2;

        // Main UI Container
        const mainUI = new PIXI.Graphics();
        mainUI.beginFill(0x000000, 0.25);  // Black color with 70% opacity
        mainUI.drawRect(0, 0, this.width, this.height);
        mainUI.endFill();
        mainUI.x = tower.x;
        mainUI.y = tower.y;

        // Create Upgrade Base Button
        this.upgradeBaseButton = this.createButton("Upgrade Base (30 gold)", 10, 40, this.width - 20, 20);
        this.upgradeBaseButton.on('pointerdown', () => {
            console.log("Upgrade base clicked!");
            tower.levelUpBase();
        });

        // Create Upgrade Weapon Button
        this.upgradeWeaponButton = this.createButton("Upgrade Weapon (30 gold)", 10, 10, this.width - 20, 20);  // Positioned below the Upgrade Base button
        this.upgradeWeaponButton.on('pointerdown', () => {
            console.log("Upgrade weapon clicked!");
            tower.levelUpWeapon();
        });

        // Adding buttons to the main UI container
        mainUI.addChild(this.upgradeBaseButton);
        mainUI.addChild(this.upgradeWeaponButton);

        // Adding the main UI to the global container
        this.container.addChild(mainUI);
    }

    render(stage) {
        // ... rest of your code
        stage.addChild(this.container);
    }


    createButton(label, x, y, width, height) {
        const button = new PIXI.Graphics();
        button.beginFill(0x808080);
        button.drawRect(0, 0, width, height);
        button.endFill();
        button.x = x;
        button.y = y;
        button.interactive = true;
        button.buttonMode = true;

        // Adding text label to the button
        const buttonText = new PIXI.Text(label, { fontSize: 12, fill: 0x000000 });
        buttonText.x = width / 2 - buttonText.width / 2;
        buttonText.y = height / 2 - buttonText.height / 2;
        button.addChild(buttonText);

        return button;
    }
}


export { TowerUpgradeUI };