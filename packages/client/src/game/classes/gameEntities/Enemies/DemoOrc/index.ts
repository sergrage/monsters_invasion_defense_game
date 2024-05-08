import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import orcImage from "@/game/img/orc.png";
import { IFrames, IContext, IEnemyImg, IEnemyParams } from "@/game/interfaces";

class Orc extends Enemy {
  constructor({ position, canvas, ctx }: IContext) {
    const enemyParams: IEnemyParams = {
      width: 100,
      height: 100,
      waypointIndex: 0,
      radius: 50,
      health: 100,
      speed: 3,
      reward: 50,
    };

    const frames: IFrames = {
      max: 7, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };

    const imageSrc: IEnemyImg = {
      right: orcImage,
      left: orcImage,
      back: orcImage,
      front: orcImage,
    };

    super({
      position,
      canvas,
      ctx,
      frames,
      imageSrc,
      enemyParams,
    });
  }
}

export default Orc;
