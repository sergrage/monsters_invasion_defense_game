import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import rightImg from "@/assets/img/enemies/bossHelmetZombie/right.png";
import leftImg from "@/assets/img/enemies/bossHelmetZombie/left.png";
import frontImg from "@/assets/img/enemies/bossHelmetZombie/front.png";
import backImg from "@/assets/img/enemies/bossHelmetZombie/back.png";
import { IFrames, IContext, IEnemyParams, IEnemyImg } from "@/game/interfaces";

class BossHelmetZombie extends Enemy {
  constructor({ position, canvas, ctx }: IContext) {
    const enemyParams: IEnemyParams = {
      width: 220,
      height: 223,
      waypointIndex: 0,
      radius: 40,
      health: 10000,
      speed: 1.5,
      reward: 120,
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

export default BossHelmetZombie;
