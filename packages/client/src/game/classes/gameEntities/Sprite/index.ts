import { IPosition, ISprite, ITowerExtraParams } from "@/game/interfaces";

class Sprite {
  position; // stores the x and y coordinates of the sprite on the canvas
  canvas; // reference to the HTML canvas element where the sprite will be drawn
  image; // an Image object holding the sprite's image data
  frames; // information about the animation frames
  offset; // offset for the sprite's position
  ctx; // canvas rendering context used for drawing
  angle: number | null = null;
  extraImg: HTMLImageElement | null = null;
  towerExtraParams: ITowerExtraParams | null = null;

  constructor({
    position,
    canvas,
    imageSrc,
    towerExtraParams,
    frames,
    offset = { x: 0, y: 0 },
    ctx,
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
    this.ctx = ctx;

    if (towerExtraParams) {
      this.extraImg = new Image();
      this.extraImg.src = towerExtraParams.towerImg;
      this.towerExtraParams = towerExtraParams;
    }
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

    // if an angle is specified, rotate the sprite around its center
    // before drawing it on the canvas
    if (this.angle) {
      this.rotateImage(crop);
      return;
    }

    // if no angle is specified, draw the sprite normally
    this.drawImage(crop);
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

  protected rotateImage(crop: {
    position: IPosition;
    width: number;
    height: number;
  }): void {
    // save the current canvas state so that we can restore it after
    // to ensure that rotation do not affect other drawings on the canvas
    this.ctx.save();

    // move the canvas origin to the center of the sprite
    // to make the rotation occurs around the center of the sprite
    this.ctx.translate(
      this.position.x + this.offset.x + crop.width / 2,
      this.position.y + this.offset.y + crop.height / 2,
    );

    // rotate the canvas around the center of the sprite
    this.ctx.rotate(this.angle! + Math.PI / 2);

    // move the origin back to the top left corner of the sprite
    this.ctx.translate(
      -this.position.x - this.offset.x - crop.width / 2,
      -this.position.y - this.offset.y - crop.height / 2,
    );

    // draw the sprite on the canvas
    this.drawImage(crop);

    // restore the canvas state to the state before the rotation
    this.ctx.restore();
  }

  protected drawImage(crop: {
    position: {
      x: number;
      y: number;
    };
    width: number;
    height: number;
  }): void {
    if (this.extraImg) {
      this.ctx.drawImage(
        this.extraImg,
        this.position.x + this.towerExtraParams!.offset.x,
        this.position.y + this.towerExtraParams!.offset.y,
        this.towerExtraParams!.width,
        this.towerExtraParams!.height,
      );
    }

    // draw the sprite on the canvas
    this.ctx.drawImage(
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
}

export default Sprite;
