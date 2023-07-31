import * as PIXI from "pixi.js"
import bgImage from '../assets/sprites/bg.png'; // import the image

let app = new PIXI.Application({resizeTo: window});
document.body.appendChild(app.view);

// loads a sprite
let sprite = PIXI.Sprite.from(bgImage);

// adds the sprite to the stage (scene)
app.stage.addChild(sprite);

