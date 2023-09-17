import * as PIXI from 'pixi.js';

/**
 * @desc class that represents the UI elements of displaying the game current round and score
 */
class GameStatusUI {
    constructor(starterRound, starterScore) {
        this.mainUI = new PIXI.Container();

        // initialize Round
        this.round = starterRound;
        this.roundText = new PIXI.Text(`Round: ${this.round}`, {fontSize: 24, fill: 0xFFFFFF});
        this.roundText.x = 10; // Top-left corner
        this.roundText.y = 10;
        this.mainUI.addChild(this.roundText);

        // initialize Score
        this.score = starterScore;
        this.scoreText = new PIXI.Text(`Score: ${this.score}`, {fontSize: 24, fill: 0xFFFFFF});
        this.scoreText.x = 10; // Top-left corner, below the round
        this.scoreText.y = 40;
        this.mainUI.addChild(this.scoreText);
    }


    /**
     * @desc updates the round value and refreshes the UI
     * @param {number} newRound - The new round value
     */
    updateRound(newRound) {
        this.round = newRound;
        this.roundText.text = `Round: ${this.round}`;
    }

    /**
     * @desc updates the score value and refreshes the UI
     * @param {number} newScore - The new score value
     */
    updateScore(newScore) {
        this.score = newScore;
        this.scoreText.text = `Score: ${this.score}`;
    }

    /**
     * @desc Renders the UI elements on the application stage
     * @param {PIXI.Application.Stage} stage - The PIXI stage
     */
    render(stage) {
        stage.addChild(this.mainUI);
    }


}

export { GameStatusUI };