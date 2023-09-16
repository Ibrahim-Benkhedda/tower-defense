import { App } from './core/App.js';
import { Game } from './core/Game.js';
import { GameLoop } from './core/GameLoop.js';

const app = new App().getApp();
const game = new Game(app);
const gameLoop = new GameLoop(game);

gameLoop.run();

