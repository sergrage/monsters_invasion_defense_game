import Sprite from "@/game/classes/gameEntities/Sprite";
import waypoints from "@/game/mocks/waypoints";

import { Position, IEntityEnemySprite, IEnemyImg } from "@/game/interfaces";

class Enemy extends Sprite {
  position: Position;
  center: Position;
  c: CanvasRenderingContext2D;
  width: number;
  height: number;
  radius: number;
  velocity: Position;
  waypointIndex: number;
  health: number;
  maxHealth: number; // for health bar calculating
  imageSrc: IEnemyImg;

  constructor({
    position,
    canvas,
    imageSrc,
    frames,
    c,
    entityParams,
  }: IEntityEnemySprite) {
    super({
      position,
      canvas,
      imageSrc: imageSrc.right,
      frames,
      c,
    });
    this.position = position;
    this.width = entityParams.width;
    this.height = entityParams.height;
    this.radius = entityParams.radius;
    this.velocity = entityParams.velocity;
    this.waypointIndex = entityParams.waypointIndex;
    this.health = entityParams.health;
    this.maxHealth = entityParams.health;

    this.imageSrc = imageSrc;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.c = c;
  }

  // render health bar
  public draw(): void {
    super.draw();

    const redBarWidth = 100;
    // calculate health bar proportionally to health loss
    const greenBarWidth = redBarWidth * (this.health / this.maxHealth);
    // center health bar
    const posX = this.position.x + this.width / 2 - redBarWidth / 2;
    const posY = this.position.y - 15;

    this.c.strokeStyle = "red";
    this.c.fillStyle = "red";
    this.c.beginPath();
    this.c.roundRect(posX, posY, redBarWidth, 10, [5]);
    this.c.stroke();
    this.c.fill();

    this.c.strokeStyle = "green";
    this.c.fillStyle = "green";
    this.c.beginPath();
    this.c.roundRect(posX, posY, greenBarWidth, 10, [5]);
    this.c.stroke();
    this.c.fill();
  }

  public update(): void {
    this.draw();
    super.update();

    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    const speed = 2;

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    this.setPointOfView(waypoint);

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }

  private setPointOfView(waypoint: Position) {
    if (
      this.waypointIndex === 0 ||
      waypoint.x > waypoints[this.waypointIndex - 1].x
    ) {
      this.changeImageView(this.imageSrc.right);
      return;
    }

    if (waypoint.x < waypoints[this.waypointIndex - 1].x) {
      this.changeImageView(this.imageSrc.left);
      return;
    }

    if (waypoint.y > waypoints[this.waypointIndex - 1].y) {
      this.changeImageView(this.imageSrc.front);
      return;
    }

    this.changeImageView(this.imageSrc.back);
  }
}

export default Enemy;
