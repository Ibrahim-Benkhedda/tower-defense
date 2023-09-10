import { Howl } from 'howler';

class AudioPlayer {
    constructor() {
        this.audios = {};
    }
    
    loadAudio(name, path, options = {}) {
        this.audios[name] = new Howl({
          src: [path],
          ...options
        });
    }

    playAudio(name) {
        if (this.audios[name]) {
            this.audios[name].play();
        }
    }

    stopAudio(name) {
        if (this.audios[name]) {
            this.audios[name].stop();
        }
    }

}


export const audioPlayer = new AudioPlayer();