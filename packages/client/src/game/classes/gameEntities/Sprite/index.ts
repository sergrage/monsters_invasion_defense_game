import { ISprite } from "@/game/interfaces";

class Sprite {
  position; // stores the x and y coordinates of the sprite on the canvas
  canvas; // reference to the HTML canvas element where the sprite will be drawn
  image; // an Image object holding the sprite's image data
  frames; // information about the animation frames
  offset; // offset for the sprite's position
  c; // canvas rendering context used for drawing

  constructor({
    position,
    canvas,
    imageSrc,
    // set in each entity
    frames,
    // set in each entity
    offset = { x: 0, y: 0 },
    c,
  }: ISprite) {
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

  public draw(): void {
    // calculate the width of a single frame
    const cropWidth = this.image.width / this.frames.max;

    // define the cropping region for the current frame
    const crop = {
      position: {
        // возможно прописать условие на случай отсутсвия свойства или изменит интерфейс...
        x: cropWidth * this.frames.current!, // x-coordinate of the current frame within the image
        y: 0, // assuming frames are arranged in a single row
      },
      width: cropWidth, // width of a single frame
      height: this.image.height, // full height of the image
    };
    this.c.drawImage(
      this.image,
      crop.position.x, // source x-coordinate within the image
      crop.position.y, // source y-coordinate within the image
      crop.width,
      crop.height,
      this.position.x + this.offset.x, // destination x-coordinate on the canvas with offset
      this.position.y + this.offset.y, // destination y-coordinate on the canvas with offset
      crop.width,
      crop.height,
    );
  }

  // update the animation frame
  public update(): void {
    // возможно прописать условие на случай отсутсвия свойств или изменит интерфейс...
    this.frames.elapsed!++;

    // check if it's time to advance to the next frame
    if (this.frames.elapsed! % this.frames.hold! === 0) {
      this.frames.current!++;

      // check if the animation has ended => return to the first frame
      if (this.frames.current! >= this.frames.max) {
        this.frames.current = 0;
      }
    }
  }

  protected changeImageView(newSrc: string): void {
    this.image.src = newSrc;
  }
}

export default Sprite;
