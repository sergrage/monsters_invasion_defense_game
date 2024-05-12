import Sprite from "../Sprite";
import Enemy from "../Enemies/Enemy";
import ProjectileConstructor from "@/game/classes/gameEntities/Projectiles/ProjectileConstructor";

import { IPosition, ITowerConstructor, ITowerParams } from "@/game/interfaces";

class TowerConstructor extends Sprite {
  towerData: ITowerParams;
  towerAngle: number | undefined;
  center: IPosition;
  radius: number;
  projectiles: ProjectileConstructor[];
  target: Enemy | null = null;
  towerLevel: number;

  constructor({ position, canvas, ctx, towerData }: ITowerConstructor) {
    super({
      position,
      canvas,
      ctx: ctx,
      imageSrc: towerData.imgs[0],
      frames: towerData.frames,
      offset: towerData.offset,
      towerExtraParams: towerData.extraParams,
    });

    this.towerData = towerData;
    this.center = {
      x: this.position.x + towerData.width / 2,
      y: this.position.y + towerData.height / 2,
    };

    this.radius = towerData.radius;
    this.projectiles = [];
    this.towerLevel = 0;
  }

  public update(): void {
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

  public shoot(): void {
    this.projectiles.push(
      new ProjectileConstructor({
        position: {
          x: this.center.x - this.towerData.projectile.offset.x,
          y: this.center.y - this.towerData.projectile.offset.y,
        },
        enemy: this.target!,
        ctx: this.ctx,
        canvas: this.canvas,
        imageSrc: this.towerData.projectile.imageSrc,
        needRotation: this.towerData.projectile.needRotation,
      }),
    );

    // combined tower case
    if (this.towerData.extraParams) {
      this.getShootAngle();
    }
  }

  public clearProjectiles(): void {
    this.projectiles = [];
  }

  public upgrade(): void {
    this.towerLevel += 1;

    // set the next level tower image (compound tower case)
    if (this.towerData.extraParams) {
      const newSrc = this.towerData.extraParams.towerImgs[this.towerLevel];

      this.extraImg!.src = newSrc;
      return;
    }

    // set the next level tower image
    this.changeImageView(this.towerData.imgs[this.towerLevel]);
  }

  private getShootAngle(): void {
    // calculate the angle between the tower and the target
    const angle = Math.atan2(
      this.target!.center.y - this.position.y,
      this.target!.center.x - this.position.x,
    );

    // convert the angle from radians to degrees
    let towerAngle = (angle * 180) / Math.PI;
    if (towerAngle < 0) {
      towerAngle += 360;
    }

    this.updateShooterDirection(towerAngle);
  }

  private updateShooterDirection(towerAngle: number): void {
    // get the number of images
    const numImages = this.towerData.imgs.length;
    // get the angle range for each image
    const imageRange = 360 / numImages;

    // сalculate the index of the image corresponding to the angle
    let imageIndex = Math.round(towerAngle / imageRange);

    // handle the case where the angle is close to 360 degrees
    if (imageIndex === numImages) {
      imageIndex = 0;
    }

    // update the image source using the calculated index
    this.img.src = this.towerData.imgs[imageIndex];
  }
}

export default TowerConstructor;
