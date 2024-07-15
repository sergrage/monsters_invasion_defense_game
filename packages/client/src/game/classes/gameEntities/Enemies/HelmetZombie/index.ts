import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import rightImg from "@/assets/img/enemies/helmetZombie/right.png";
import leftImg from "@/assets/img/enemies/helmetZombie/left.png";
import frontImg from "@/assets/img/enemies/helmetZombie/front.png";
import backImg from "@/assets/img/enemies/helmetZombie/back.png";
import { IFrames, IContext, IEnemyParams, IEnemyImg } from "@/game/interfaces";

class HelmetZombie extends Enemy {
  constructor({ position, canvas, ctx }: IContext) {
    const enemyParams: IEnemyParams = {
      width: 180,
      height: 182,
      waypointIndex: 0,
      radius: 40,
      health: 310,
      speed: 3.5,
      reward: 70,
    };

    const frames: IFrames = {
      max: 20, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };
    const imageSrc: IEnemyImg = {
      right: rightImg,
      left: leftImg,
      back: backImg,
      front: frontImg,
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

export default HelmetZombie;
