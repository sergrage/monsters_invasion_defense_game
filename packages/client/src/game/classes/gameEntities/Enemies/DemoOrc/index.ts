import Enemy from "@/game/classes/gameEntities/Enemies";

import orcImage from "@/game/img/orc.png";
import { Frames, IContext, IEntityParams } from "@/game/interfaces";

class Orc extends Enemy {
  constructor({ position = { x: 0, y: 0 }, canvas, c }: IContext) {
    const entityParams: IEntityParams = {
      width: 100,
      height: 100,
      waypointIndex: 0,
      radius: 50,
      health: 100,
      velocity: { x: 0, y: 0 },
    };

    const frames: Frames = {
      max: 7, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };
    const imageSrc: string = orcImage;

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

export default Orc;
