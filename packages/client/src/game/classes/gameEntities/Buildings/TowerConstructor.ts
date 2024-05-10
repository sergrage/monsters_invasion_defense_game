import BuildingConstructor from "@/game/classes/gameEntities/Buildings/BuildingConstructor";
import ProjectileConstructor from "@/game/classes/gameEntities/Projectiles/ProjectileConstructor";

import towers from "@/game/mocks/towersData";

import { IPosition, ITowerConstructor, ITowerParams } from "@/game/interfaces";

class TowerConstructor extends BuildingConstructor {
  towerData: ITowerParams;
  towerAngle: number | undefined;
  center: IPosition;
  radius: number;

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

    this.updateTowerView(towerAngle);
  }

  private updateTowerView(towerAngle: number): void {
    const numImages = towers[0].imgs.length;
    // get the angle range for each image
    const imageRange = 360 / numImages;

    // сalculate the index of the image corresponding to the angle
    let imageIndex = Math.round(towerAngle / imageRange);

    // handle the case where the angle is close to 360 degrees
    if (imageIndex === numImages) {
      imageIndex = 0;
    }

    // update the image source using the calculated index
    this.image.src = towers[0].imgs[imageIndex];

    // alt version, mb more accurate?
    // let newSrc = "";

    // if (337.5 < towerAngle || towerAngle <= 22.5) {
    //   newSrc = archerImgs[0];
    // } else if (22.5 < towerAngle && towerAngle <= 67.5) {
    //   newSrc = archerImgs[1];
    // } else if (67.5 < towerAngle && towerAngle <= 112.5) {
    //   newSrc = archerImgs[2];
    // } else if (112.5 < towerAngle && towerAngle <= 157.5) {
    //   newSrc = archerImgs[3];
    // } else if (157.5 < towerAngle && towerAngle <= 202.5) {
    //   newSrc = archerImgs[4];
    // } else if (202.5 < towerAngle && towerAngle <= 247.5) {
    //   newSrc = archerImgs[5];
    // } else if (247.5 < towerAngle && towerAngle <= 292.5) {
    //   newSrc = archerImgs[6];
    // } else if (292.5 < towerAngle && towerAngle <= 337.5) {
    //   newSrc = archerImgs[7];
    // }

    // this.image.src = newSrc;
  }
}

export default TowerConstructor;
