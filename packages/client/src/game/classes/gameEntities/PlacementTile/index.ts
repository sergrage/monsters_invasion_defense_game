import tileImg from "@/assets/img/towers/palcementTile.png";
import { IPosition } from "@/game/interfaces";

class PlacementTile {
  position: IPosition;
  ctx: CanvasRenderingContext2D;
  size: number;
  hoverColor: string;
  occupied: boolean;
  img: HTMLImageElement;

  constructor({
    position = { x: 0, y: 0 },
    ctx,
  }: {
    position?: IPosition;
    ctx: CanvasRenderingContext2D;
  }) {
    this.position = position;
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = tileImg;
    this.size = 64;
    this.hoverColor = "rgba(255, 255, 255, 0.3)";
    this.occupied = false;

    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.position.x,
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
      this.ctx.fillStyle = this.hoverColor;
      this.ctx.fillRect(
        this.position.x + 0,
        this.position.y,
        this.size,
        this.size,
      );
    }
  }
}

export default PlacementTile;
