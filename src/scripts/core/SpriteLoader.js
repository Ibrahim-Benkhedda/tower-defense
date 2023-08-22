import * as PIXI from 'pixi.js';

/**
 * Class for loading static and animated sprites resources
 */
class SpriteLoader {
    constructor() {
        // cache for loaded resources, prevents redundant loading
        this.resources = {};
    }

    /**
     * @desc loads a texture from the path or returns the texture
     * from cache (resources) if it has been loaded before.
     * @param {string} texturePath - path for the texture file
     * @returns {PIXI.Texture} - loaded texture
     */
    loadTexture(texturePath) {
        if (this.resources[texturePath]) {
            return this.resources[texturePath]; // return cached resource if available
        }

        // loads the texture and cache the loaded texture
        const texture = PIXI.Texture.from(texturePath);
        this.resources[texturePath] = texture;

        return texture;
    }

    /**
     * @desc loads a static sprite from the texture path
     * @param {string} texturePath - path for the texture file 
     * @returns {PIXI.Sprite} - loaded static sprite 
     */
    loadStaticSprite(texturePath) {
        const texture = this.loadTexture(texturePath);
        return new PIXI.Sprite(texture);
    }

    /**
     * @desc loads an animated sprite from the JSON spritesheet data and texture path
     * @param {Object} jsonData - JSON object that contains the sprite frames
     * @param {string} texturePath - path for the texture file
     * @returns {PIXI.AnimatedSprite} - loaded animated sprite
     */
    loadAnimatedSprite(jsonData, texturePath) {
        const frames = [];
        const texture = this.loadTexture(texturePath);

        // Create texture for each frames in the json object
        for (let frameData of Object.values(jsonData.frames)) {
            // get the properties from the frame data
            const { x, y, w, h } = frameData.frame;
            // create a new texture with the given dimensions
            const frame = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(x, y, w, h));
            // add the created texture to the frames array
            frames.push(frame);
        }

        // create the animated sprite using the frames array and return it 
        return new PIXI.AnimatedSprite(frames);
    }

    
}


export const spriteLoader = new SpriteLoader();