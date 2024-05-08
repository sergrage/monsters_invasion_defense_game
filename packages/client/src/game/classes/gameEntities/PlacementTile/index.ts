import { IPosition } from "@/game/interfaces";

class PlacementTile {
  position: IPosition;
  size: number;
  color: string;
  occupied: boolean;
  ctx: CanvasRenderingContext2D;

  constructor({
    position = { x: 0, y: 0 },
    ctx,
  }: {
    position?: IPosition;
    ctx: CanvasRenderingContext2D;
  }) {
    this.position = position;
    this.size = 64;
    this.color = "rgba(255, 255, 255, 0.15)";
    this.occupied = false;
    this.ctx = ctx; // Store the canvas context
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x + 0,
      this.position.y,
      this.size,
      this.size,
    );
  }

  update(mouse: { x: number | undefined; y: number | undefined }) {
    // case for mouse from game class (can be undefined)
    if (mouse.x === undefined || mouse.y === undefined) {
      return;
    }

    this.draw();
    if (
      mouse.x + 0 > this.position.x &&
      mouse.x - 0 < this.position.x + this.size &&
      mouse.y + 0 > this.position.y &&
      mouse.y - 0 < this.position.y + this.size
    ) {
      this.color = "white";
    } else this.color = "rgba(255, 255, 255, 0.15)";
  }
}

export default PlacementTile;
