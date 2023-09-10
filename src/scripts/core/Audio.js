import { Howl } from 'howler';



class Audio {
    constructor(path) {
        this.sound = new Howl({
            src: [path],
        });
    }


    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    stop() {
        this.sound.stop();
    }
}


export { Audio };