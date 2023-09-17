import { GameLoop } from '../src/scripts/core/GameLoop.js'; 
import { eventEmitter } from '../src/scripts/core/EventEmitter.js';

/**
 * https://jestjs.io/docs/timer-mocks
 * https://stackoverflow.com/questions/61593774/how-do-i-test-code-that-uses-requestanimationframe-in-jest
 */

// mocks requestAnimationFrame to use Jest's fake timers
jest.useFakeTimers();
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));


/**
 * @desc unit tests for GameLoop class
 */
describe('GameLoop', () => {
    let mockGame, gameLoop;

    /**
     * @desc Before each test, create mock game object and create a new GameLoop instance
     */
    beforeEach(() => {
        // mock the game object
        mockGame = {
            processInput: jest.fn(),
            update: jest.fn(),
            render: jest.fn()
        };

        // create a new instance of GameLoop
        gameLoop = new GameLoop(mockGame);
    });

    /**
     * @test verifies the initial state of GameLoop instance.
     */
    test('should initialize correctly', () => {
        expect(gameLoop.isRunning).toBe(false);
    });

    /**
     * @test verifies if game methods are called in the loop when run() is called.
     */
    test('should start the game loop when run() is called', () => {
        gameLoop.run();
        expect(gameLoop.isRunning).toBe(true);
    });

    /**
     * @test verifies if game methods are called in the loop when run() is called
     */
    test('should call game methods in the loop when run() is called', () => {
        gameLoop.run();
        jest.runOnlyPendingTimers();
        expect(mockGame.processInput).toHaveBeenCalled();
        expect(mockGame.update).toHaveBeenCalled();
        expect(mockGame.render).toHaveBeenCalled();
    });

    /**
     * @test verifies if the game loop stops when stop() method is called
     */
    test('should stop the game loop when stop() is called', () => {
        gameLoop.run();
        gameLoop.stop();
        expect(gameLoop.isRunning).toBe(false);
    });

    /**
     * @test verifies if the game loop stops when a gameOver event is emitted
     */
    test('should stop the game loop when gameOver event is emitted', () => {
        gameLoop.run();
        eventEmitter.emit('gameOver');
        expect(gameLoop.isRunning).toBe(false);
    });
});