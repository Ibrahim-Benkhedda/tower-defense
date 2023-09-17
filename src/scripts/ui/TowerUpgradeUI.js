import * as PIXI from 'pixi.js';
import { GameConfig } from '../core/GameConfig';
import { eventEmitter } from '../core/EventEmitter';

/**
 * @desc creates the upgrade UI panel for individual towers.
 */
class TowerUpgradeUI {
    /**
     * @desc intialize the tower upgrade UI.
     * @param {Object} tower -  tower object for which the upgrade UI is created.
     */
    constructor(tower) {
        // main UI graphics element
        this.container = new PIXI.Container();
        this.tower = tower;
        this.width = GameConfig.TILE_SIZE * 5;
        this.height = GameConfig.TILE_SIZE * 2;

        // main UI graphics element
        const mainUI = new PIXI.Graphics();
        mainUI.beginFill(0x000000, 0.25);  // Black color with 70% opacity
        mainUI.drawRect(0, 0, this.width, this.height);
        mainUI.endFill();
        mainUI.x = tower.x;
        mainUI.y = tower.y;

        // Create Upgrade Base Button
        this.upgradeBaseButton = this.createButton("Upgrade Base (30 gold)", 10, 40, this.width - 20, 20);

        // Create Upgrade Weapon Button
        this.upgradeWeaponButton = this.createButton("Upgrade Weapon (30 gold)", 10, 10, this.width - 20, 20); 

        // The following two events is triggered when the 'Upgrade Weapon or Upgrade Base' button is clicked.
        // it emits a 'requestGoldAmountForUpgrade' event to ask for the current amount of gold,
        // also with specifying the upgrade type is 'weapon/base' and providing the ID of the tower being upgraded

        // event listener for upgrading base
        this.upgradeBaseButton.on('pointerdown', () => {
            eventEmitter.emit('requestGoldAmountForUpgrade', { type: 'base', towerId: this.tower.id });
        });
        // event listener for upgrading weapon
        this.upgradeWeaponButton.on('pointerdown', () => {
            eventEmitter.emit('requestGoldAmountForUpgrade', { type: 'weapon', towerId: this.tower.id });
        });

        // event listener for checking if enough gold amount to upgrade that we requested it.
        eventEmitter.on('currentGoldAmount', (data) => {
            if (data.gold >= 30 && data.towerId === this.tower.id) {
                if (data.type === 'base') {
                    this.tower.levelUpBase();
                } else if (data.type === 'weapon') {
                    this.tower.levelUpWeapon();
                }
            }
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