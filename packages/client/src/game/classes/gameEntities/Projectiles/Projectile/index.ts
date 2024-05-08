import Sprite from "@/game/classes/gameEntities/Sprite";

import { IProjectileConstructor } from "@/game/interfaces";

class Projectile extends Sprite {
  velocity;
  enemy;
  radius;
  angle: number | null = null;

  constructor({
    position,
    enemy,
    ctx,
    canvas,
    imageSrc,
  }: IProjectileConstructor) {
    super({
      position,
      ctx,
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
    // Formula: tan(θ) = Opposite / Adjacent
    // where θ is the angle between the projectile and the enemy
    // Opposite is the vertical distance between the projectile and the enemy
    // Adjacent is the horizontal distance between the projectile and the enemy
    this.angle = Math.atan2(
      // Opposite
      this.enemy.center.y - this.position.y,
      // Adjacent
      this.enemy.center.x - this.position.x,
    );

    // projectile's velocity
    const power = 5;

    // The horizontal component of the projectile's velocity
    // Formula: xVelocity = cos(angle) * power
    this.velocity.x = Math.cos(this.angle) * power;

    // The vertical component of the projectile's velocity
    // Formula: yVelocity = sin(angle) * power
    this.velocity.y = Math.sin(this.angle) * power;

    // Updates the projectile's position
    // Formula: xPosition = xPosition + xVelocity
    //          yPosition = yPosition + yVelocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Projectile;
