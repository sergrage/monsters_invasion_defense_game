import Building from "@/game/classes/gameEntities/Buildings/Building";

import img1 from "@/assets/img/towers/electroTower/1.png";
import { Frames, IContext, ITowerImg, ITowerParams } from "@/game/interfaces";

class ElectroTower extends Building {
  constructor({ position, canvas, c }: IContext) {
    const towerParams: ITowerParams = {
      width: 236,
      height: 335,
      radius: 250,
      speed: 3,
      price: 50,
      upgradePrice: 25,
    };

    const towerImgs: ITowerImg = {
      1: img1,
      2: img1,
      3: img1,
      4: img1,
      5: img1,
    };

    const frames: Frames = {
      max: 10, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };

    const offset = {
      x: 0,
      y: 0,
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

export default ElectroTower;
