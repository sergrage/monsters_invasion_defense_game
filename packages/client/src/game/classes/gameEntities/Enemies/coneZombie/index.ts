import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import rightImg from "@/assets/img/enemies/coneZombie/right.png";
import leftImg from "@/assets/img/enemies/coneZombie/left.png";
import frontImg from "@/assets/img/enemies/coneZombie/front.png";
import backImg from "@/assets/img/enemies/coneZombie/back.png";
import { IFrames, IContext, IEnemyParams, IEnemyImg } from "@/game/interfaces";

class ConeZombie extends Enemy {
  constructor({ position, canvas, ctx }: IContext) {
    const enemyParams: IEnemyParams = {
      width: 160,
      height: 162,
      waypointIndex: 0,
      radius: 50,
      health: 100,
      speed: 3,
      reward: 30,
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

export default ConeZombie;
