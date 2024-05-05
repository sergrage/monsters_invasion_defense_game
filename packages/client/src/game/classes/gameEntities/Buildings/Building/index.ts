import Sprite from "@/game/classes/gameEntities/Sprite";
import Projectile from "@/game/classes/gameEntities/Projectiles/Projectile";
import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import { ITowerConstructor } from "@/game/interfaces";
import Lighter from "../../Projectiles/Lighter";

class Building extends Sprite {
  width: number;
  height: number;
  center: { x: number; y: number };
  radius: number;
  projectiles: Projectile[];
  target: Enemy | null = null;

  constructor({
    position,
    canvas,
    c,
    offset,
    imageSrc,
    frames,
    towerParams,
  }: ITowerConstructor) {
    super({
      position,
      canvas,
      imageSrc: imageSrc[1],
      frames,
      offset,
      c: c,
    });

    this.width = towerParams.width;
    this.height = towerParams.height;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.radius = towerParams.radius;
    this.projectiles = [];
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
      new Lighter({
        position: {
          x: this.center.x - 23,
          y: this.center.y - 100,
        },
        enemy: this.target!,
        c: this.c,
        canvas: this.canvas,
      }),
    );
  }

  public clearProjectiles(): void {
    this.projectiles = [];
  }
}

export default Building;
