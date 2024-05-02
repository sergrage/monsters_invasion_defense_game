import { Position, Frames, Offset } from "@/game/interfaces";

class Sprite {
  position;
  canvas;
  image;
  frames;
  offset;
  c;

  constructor({
    position = { x: 0, y: 0 },
    canvas,
    imageSrc,
    frames = {
      max: 1,
      current: 0,
      elapsed: 0,
      hold: 0,
    },
    offset = { x: 0, y: 0 },
    c,
  }: {
    position?: Position;
    canvas: HTMLCanvasElement;
    imageSrc: string;
    frames?: Frames;
    offset?: Offset;
    c: CanvasRenderingContext2D;
  }) {
    this.position = position;
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frames = {
      max: frames.max,
      current: 0,
      elapsed: 0,
      hold: 3,
    };
    this.offset = offset;
    this.c = c;
  }

  draw(): void {
    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        // возможно прописать условие на случай отсутсвия свойства или изменит интерфейс...
        x: cropWidth * this.frames.current!,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height,
    };
    this.c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      crop.width,
      crop.height,
    );
  }

  update(): void {
    // responsible for animation
    // возможно прописать условие на случай отсутсвия свойств или изменит интерфейс...
    this.frames.elapsed!++;
    if (this.frames.elapsed! % this.frames.hold! === 0) {
      this.frames.current!++;
      if (this.frames.current! >= this.frames.max) {
        this.frames.current = 0;
      }
    }
  }
}

export default Sprite;
