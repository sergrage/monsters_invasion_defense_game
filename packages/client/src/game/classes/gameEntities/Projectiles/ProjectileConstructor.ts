import Sprite from "@/game/classes/gameEntities/Sprite";

import { IPosition, IProjectileConstructor } from "@/game/interfaces";

class ProjectileConstructor extends Sprite {
  velocity: IPosition;
  angle: number | null = null;
  enemy;
  radius;
  damage: number;
  towerTitle: string;

  constructor({
    position,
    enemy,
    ctx,
    canvas,
    imageSrc,
    needRotation,
    damage,
    towerTitle,
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
      needRotation,
    });

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.enemy = enemy;
    this.radius = 10;
    this.damage = damage;
    this.towerTitle = towerTitle;
  }

  update(): void {
    this.draw();

    switch (this.towerTitle) {
      case "Tesla tower":
        window.audioGlobal.play("Laser");
        break;
      case "Sniper tower":
        window.audioGlobal.play("Bullet");
        break;
      case "Cannon tower":
        window.audioGlobal.play("Cannon");
        break;
      default:
        window.audioGlobal.play("Arrow");
        break;
    }

    // calculates the angle between the projectile and the enemy
    // formula: tan(θ) = Opposite / Adjacent
    // where θ is the angle between the projectile and the enemy
    // opposite is the vertical distance between the projectile and the enemy
    // adjacent is the horizontal distance between the projectile and the enemy
    this.angle = Math.atan2(
      // opposite
      this.enemy.center.y - this.position.y,
      // adjacent
      this.enemy.center.x - this.position.x,
    );

    // projectile's velocity
    const power = 5;

    // the horizontal component of the projectile's velocity
    this.velocity.x = Math.cos(this.angle) * power;

    // the vertical component of the projectile's velocity
    this.velocity.y = Math.sin(this.angle) * power;

    // updates the projectile's position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default ProjectileConstructor;
