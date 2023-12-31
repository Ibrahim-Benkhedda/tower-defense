import * as PIXI from 'pixi.js';

/**
 * @desc Class for loading static and animated sprites resources
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
     * @desc loads a static sprite from either a texture path or a PIXI Texture object.
     * @param {string || PIXI.Texture} textureOrPath - path for the texture file or loaded texture
     * @returns {PIXI.Sprite} - loaded static sprite 
     */
    loadStaticSprite(textureOrPath) {
        if (textureOrPath instanceof PIXI.Texture) {
            return new PIXI.Sprite(textureOrPath)
        }

        const texture = this.loadTexture(textureOrPath);
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

        // create texture for each frames in the json object
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

    /**
     * @desc loads a static sprite from JSON frames data and texture path
     * @param {Object} frameData - JSON object that contains the frame data
     * @param {string} texturePath - path for the texture file
     * @returns {PIXI.Sprite} - loaded static sprite
     */
    loadTextureFromFrame(frameData, texturePath) {
        const texture = this.loadTexture(texturePath);

        // extract the properties from the frame data
        const { x, y, w, h } = frameData.frame;
        
        // create a new texture with the given dimensions
        const frame = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(x, y, w, h));

        return frame;
    }

    
    /**
     * @desc loads an animated sprite from the JSON spritesheet data and texture path, 
     * based on the specified frame tag data.
     * @param {Object} jsonData - JSON object that contains the sprite frames
     * @param {string} texturePath - path for the texture file
     * @param {Object} tagData - the frame tag data
     * @returns {PIXI.AnimatedSprite} - loaded animated sprite
     */
    loadAnimatedSpriteByTag(jsonData, texturePath, tagData) {
        const frames = [];
        const texture = this.loadTexture(texturePath);

        // loop through the frames for the specified tag
        for (let i = tagData.from; i <= tagData.to; i++) {
            
            const frameData = jsonData.frames[i];
            console.log(jsonData.frames);
            // extract the properties from the frame data
            const { x, y, w, h } = frameData.frame;
            // create a new texture with the given dimensions
            const frame = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(x, y, w, h));
            frames.push(frame);
        }

        // create the animated sprite using the frames array and return it 
        return new PIXI.AnimatedSprite(frames);
    }
}


export const spriteLoader = new SpriteLoader();