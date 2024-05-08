import Projectile from "../Projectile";

import myImage from "@/assets/img/projectiles/Arrow.png";
import { IProjectileContext } from "@/game/interfaces";

class Arrow extends Projectile {
  constructor({ position, enemy, ctx, canvas }: IProjectileContext) {
    super({
      position,
      ctx,
      canvas,
      enemy,
      imageSrc: myImage,
    });
  }
}

export default Arrow;
