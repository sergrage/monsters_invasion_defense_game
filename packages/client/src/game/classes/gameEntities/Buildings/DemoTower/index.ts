import Building from "@/game/classes/gameEntities/Buildings/Building";

import myImage from "@/game/img/tower.png";
import { IFrames, IContext, ITowerParams } from "@/game/interfaces";

class DemoTower extends Building {
  constructor({ position, canvas, ctx }: IContext) {
    const towerParams: ITowerParams = {
      width: 64 * 2,
      height: 64,
      radius: 250,
      speed: 3,
      price: 50,
      upgradePrice: 25,
    };

    const frames: IFrames = {
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
      ctx: ctx,
      imageSrc: myImage,
      frames: frames,
      towerParams,
    });
  }
}

export default DemoTower;
