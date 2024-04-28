import Sprite from "@/game/classes/gameEntities/Sprite";
import waypoints from "@/game/mocks/waypoints";
import orcImage from "@/game/img/orc.png";

import { Frames } from "@/game/interfaces";
import { Position } from "@/game/interfaces";

class Enemy extends Sprite {
  position: Position;
  width: number = 100;
  height: number = 100;
  waypointIndex: number = 0;
  center: Position;
  radius: number = 50;
  health: number = 100;
  velocity: Position = { x: 0, y: 0 };
  c: CanvasRenderingContext2D;

  constructor({
    position = { x: 0, y: 0 },
    canvas,
    c,
  }: {
    position?: Position;
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
  }) {
    const frames: Frames = { max: 7 };
    super({
      position,
      canvas,
      imageSrc: orcImage,
      frames,
      c,
    });
    this.position = position;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.c = c;
  }

  public draw(): void {
    super.draw();

    // health bar
    this.c.fillStyle = "red";
    this.c.fillRect(this.position.x, this.position.y - 15, this.width, 10);

    this.c.fillStyle = "green";
    this.c.fillRect(
      this.position.x,
      this.position.y - 15,
      (this.width * this.health) / 100,
      10,
    );
  }

  public update(): void {
    this.draw();
    super.update();

    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    const speed = 3;

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

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
}

export default Enemy;
