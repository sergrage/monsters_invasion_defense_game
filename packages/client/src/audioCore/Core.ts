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

  play(sound: string) {
    this.audioInterface[sound].play();
  }

  pause(sound: string) {
    this.audioInterface[sound].pause();
  }

  destroy() {
    this.sounds.forEach(sound => {
      this.pause(sound);
    });
    this.audioInterface = {};
  }
}

export default AudioCore;
