import { Howl } from 'howler';
import blix from '../../../assets/sounds/blix.wav';
import heavyShot from '../../../assets/sounds/heavy-shot.wav';
import towerSpawn from '../../../assets/sounds/tower-spawn.wav';
import enemyHit from '../../../assets/sounds/enemy-hit.wav';
import gameOver from '../../../assets/sounds/game-over.wav';
import levelup from '../../../assets/sounds/levelup.wav';
import teleport from '../../../assets/sounds/teleport.wav';



const sounds = {
    bgMusic: new Howl({ src: blix, loop: true }),   
    boltShotSFX: new Howl({ src: heavyShot }),
    towerSpawnSFX: new Howl({ src: towerSpawn }),
    enemyHitSFX: new Howl({ src: enemyHit, volume: 0.4 }),
    gameOverSFX: new Howl({ src: gameOver }),
    levelUpSFX: new Howl({ src: levelup, volume: 0.7 }),
    teleportSFX: new Howl({ src: teleport, volume: 0.5})
};

export { sounds };
