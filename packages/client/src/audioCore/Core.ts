import SoundsLibrary from "./SoundsLibrary";

class AudioCore {
  audioInterface: Record<string, HTMLAudioElement>;
  soundsLibrary: Record<string, string>;
  sounds: string[];

  constructor(sounds: string[]) {
    this.soundsLibrary = SoundsLibrary;
    this.sounds = sounds;

    this.audioInterface = {};

    sounds.forEach(sound => {
      this.audioInterface[sound] = new Audio(this.soundsLibrary[sound]);
    });
  }

  play(sound: string, loop: boolean = false) {
    this.audioInterface[sound].loop = loop;
    this.audioInterface[sound].play();
  }

  pause(sound: string) {
    this.audioInterface[sound].pause();
  }

  pauseAll() {
    this.sounds.forEach(sound => {
      this.pause(sound);
    });
  }

  destroy() {
    this.sounds.forEach(sound => {
      this.pause(sound);
    });
    this.audioInterface = {};
  }
}

export default AudioCore;
