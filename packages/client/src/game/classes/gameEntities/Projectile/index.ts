import Sprite from "@/game/classes/gameEntities/Sprite";
import myImage from "../../../img/projectile.png";

class Projectile extends Sprite {
  private velocity: { x: number; y: number };
  private enemy: { center: { x: number; y: number } };
  private radius: number;

  constructor({
    position = { x: 0, y: 0 },
    enemy,
    c,
  }: {
    position?: { x: number; y: number };
    enemy: { center: { x: number; y: number } };
    c: any;
  }) {
    super({ position, imageSrc: myImage, c });
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.enemy = enemy;
    this.radius = 10;
  }

  update(): void {
    this.draw();

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x,
    );

    const power = 5;
    this.velocity.x = Math.cos(angle) * power;
    this.velocity.y = Math.sin(angle) * power;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Projectile;
