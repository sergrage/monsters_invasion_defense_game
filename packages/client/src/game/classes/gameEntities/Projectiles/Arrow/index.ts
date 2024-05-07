import Projectile from "../Projectile";

import myImage from "@/assets/img/projectiles/Arrow.png";
import { IProjectileContext } from "@/game/interfaces";

class Arrow extends Projectile {
  constructor({ position, enemy, c, canvas }: IProjectileContext) {
    super({
      position,
      c,
      canvas,
      enemy,
      imageSrc: myImage,
    });
  }
}

export default Arrow;
