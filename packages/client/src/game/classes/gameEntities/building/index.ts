import Sprite from "@/game/classes/gameEntities/Sprite";
import Projectile from "@/game/classes/gameEntities/Projectile";
import myImage from "@/game/img/tower.png";
import Enemy from "../Enemies";

class Building extends Sprite {
  width: number;
  height: number;
  center: { x: number; y: number };
  projectiles: Projectile[];
  radius: number;
  target: Enemy | null = null;

  constructor({
    position = { x: 0, y: 0 },
    canvas,
    c,
  }: {
    position?: { x: number; y: number };
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
  }) {
    super({
      position,
      canvas,
      imageSrc: myImage,
      frames: {
        max: 19,
      },
      offset: {
        x: 0,
        y: -80,
      },
      c: c,
    });

    this.width = 64 * 2;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.projectiles = [];
    this.radius = 250;
  }

  draw(): void {
    super.draw();
  }

  update(): void {
    // update the visual representation
    this.draw();

    // update if has a target
    // or if it current frame is not the initial frame
    if (this.target || (!this.target && this.frames.current !== 0))
      super.update();

    // shoot if has a target and the current frame is 6,
    //the elapsed time is not zero, and the hold time has been reached
    if (
      this.target &&
      this.frames.current === 6 &&
      this.frames.elapsed &&
      this.frames.hold &&
      this.frames.elapsed % this.frames.hold === 0
    )
      this.shoot();
  }

  shoot(): void {
    this.projectiles.push(
      new Projectile({
        position: {
          x: this.center.x - 20,
          y: this.center.y - 110,
        },
        enemy: this.target!,
        c: this.c,
        canvas: this.canvas,
      }),
    );
  }
}

export default Building;
