import Sprite from "@/game/classes/gameEntities/Sprite";

import { IProjectileConstructor } from "@/game/interfaces";

class Projectile extends Sprite {
  velocity;
  enemy;
  radius;

  constructor({
    position,
    enemy,
    c,
    canvas,
    imageSrc,
  }: IProjectileConstructor) {
    super({
      position,
      c,
      canvas,
      imageSrc,
      frames: {
        max: 1,
        current: 0,
        elapsed: 0,
        hold: 0,
      },
    });

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.enemy = enemy;
    this.radius = 10;
  }

  update(): void {
    this.draw();

    // calculates the angle between the projectile and the enemy
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x,
    );

    // projectile's velocity
    const power = 5;

    this.velocity.x = Math.cos(angle) * power;
    this.velocity.y = Math.sin(angle) * power;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Projectile;