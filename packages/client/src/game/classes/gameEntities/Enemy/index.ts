import Sprite from "../Sprite";
import waypoints from "@/game/mocks/waypoints";
import orcImage from "../../../img/orc.png";

interface Position {
  x: number;
  y: number;
}

class Enemy extends Sprite {
  private position: Position;
  private width: number = 100;
  private height: number = 100;
  private waypointIndex: number = 0;
  private center: Position;
  private radius: number = 50;
  private health: number = 100;
  private velocity: Position = { x: 0, y: 0 };
  private c: CanvasRenderingContext2D;

  constructor({
    position = { x: 0, y: 0 },
    c,
  }: {
    position?: Position;
    c: CanvasRenderingContext2D;
  }) {
    super({
      position,
      imageSrc: orcImage,
      frames: {
        max: 7,
      },
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
