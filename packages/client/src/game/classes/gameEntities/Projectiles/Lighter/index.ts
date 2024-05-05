import Projectile from "../Projectile";

import myImage from "@/assets/img/projectiles/lighter.png";
import { IProjectileContext } from "@/game/interfaces";

class Lighter extends Projectile {
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

export default Lighter;
