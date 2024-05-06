import Building from "@/game/classes/gameEntities/Buildings/Building";

import myImage from "@/game/img/tower.png";
import { Frames, IContext, ITowerImg, ITowerParams } from "@/game/interfaces";

class DemoTower extends Building {
  constructor({ position, canvas, c }: IContext) {
    const towerParams: ITowerParams = {
      width: 64 * 2,
      height: 64,
      radius: 250,
      speed: 3,
      price: 50,
      upgradePrice: 25,
    };

    const towerImgs: ITowerImg = {
      1: myImage,
      2: myImage,
      3: myImage,
      4: myImage,
      5: myImage,
    };

    const frames: Frames = {
      max: 19, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };

    const offset = {
      x: 0,
      y: -80,
    };

    super({
      position,
      canvas,
      offset: offset,
      c: c,
      imageSrc: towerImgs,
      frames: frames,
      towerParams,
    });
  }
}

export default DemoTower;
