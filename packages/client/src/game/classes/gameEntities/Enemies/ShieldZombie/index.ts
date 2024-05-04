import Enemy from "@/game/classes/gameEntities/Enemies";

import rightImg from "@/assets/img/enemies/shieldZombie/right.png";
import leftImg from "@/assets/img/enemies/shieldZombie/left.png";
import frontImg from "@/assets/img/enemies/shieldZombie/front.png";
import backImg from "@/assets/img/enemies/shieldZombie/back.png";
import { Frames, IContext, IEntityParams, IEnemyImg } from "@/game/interfaces";

class ShieldZombie extends Enemy {
  constructor({ position = { x: 0, y: 0 }, canvas, c }: IContext) {
    const entityParams: IEntityParams = {
      width: 160,
      height: 162,
      waypointIndex: 0,
      radius: 50,
      health: 150,
      velocity: { x: 0, y: 0 },
    };

    const frames: Frames = {
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
      c,
      frames,
      imageSrc,
      entityParams,
    });
  }
}

export default ShieldZombie;
