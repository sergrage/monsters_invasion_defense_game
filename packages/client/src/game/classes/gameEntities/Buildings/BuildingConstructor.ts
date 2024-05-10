import Sprite from "@/game/classes/gameEntities/Sprite";
import Projectile from "@/game/classes/gameEntities/Projectiles/ProjectileConstructor";
import Enemy from "@/game/classes/gameEntities/Enemies/Enemy";

import { IBuildingConstructor } from "@/game/interfaces";

class BuildingConstructor extends Sprite {
  projectiles: Projectile[];
  target: Enemy | null = null;

  constructor({
    position,
    canvas,
    ctx,
    offset,
    imageSrc,
    frames,
    towerExtraParams,
  }: IBuildingConstructor) {
    super({
      position,
      canvas,
      ctx,
      imageSrc,
      frames,
      offset,
      towerExtraParams,
    });

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
    if (this.target || (!this.target && this.frames.current !== 0)) {
      super.update();
    }
    // shoot if has a target and the current frame is 6,
    //the elapsed time is not zero, and the hold time has been reached
    if (
      this.target &&
      this.frames.current === 6 &&
      this.frames.elapsed &&
      this.frames.hold &&
      this.frames.elapsed % this.frames.hold === 0
    ) {
      this.shoot();
    }
  }

  shoot(): void {}

  public clearProjectiles(): void {
    this.projectiles = [];
  }
}

export default BuildingConstructor;
