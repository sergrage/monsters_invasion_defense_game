import Building from "@/game/classes/gameEntities/Buildings/Building";
import Lighter from "../../Projectiles/Lighter";

import img1 from "@/assets/img/towers/electroTower/1.png";
import { IContext } from "@/game/interfaces";

class ElectroTower extends Building {
  constructor({ position, canvas, ctx }: IContext) {
    const towerParams = {
      width: 236,
      height: 335,
      radius: 250,
      speed: 3,
      price: 50,
      upgradePrice: 25,
    };

    const towerPosition = {
      x: position.x,
      y: position.y,
    };

    const frames = {
      max: 10, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };

    const offset = {
      x: -80,
      y: -220,
    };

    super({
      position: towerPosition,
      canvas,
      ctx: ctx,
      imageSrc: img1,
      offset: offset,
      frames: frames,
      towerParams,
    });
  }

  shoot(): void {
    this.projectiles.push(
      new Lighter({
        position: {
          x: this.center.x - 23,
          y: this.center.y - 100,
        },
        enemy: this.target!,
        ctx: this.ctx,
        canvas: this.canvas,
      }),
    );
  }
}

export default ElectroTower;
