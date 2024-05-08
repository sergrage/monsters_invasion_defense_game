import Building from "@/game/classes/gameEntities/Buildings/Building";
import Arrow from "@/game/classes/gameEntities/Projectiles/Arrow";

import archerImgs from "@/assets/img/towers/archerTower/archer/index";
import towerImg from "@/assets/img/towers/archerTower/tower.png";
import { IContext } from "@/game/interfaces";

class ArcherTower extends Building {
  towerAngle: number | undefined;

  constructor({ position, canvas, ctx }: IContext) {
    const towerParams = {
      width: 144,
      height: 144,
      radius: 250,
      speed: 3,
      price: 50,
      upgradePrice: 25,
    };

    const towerExtraParams = {
      width: 131,
      height: 153,
      towerImg: towerImg,
      offset: {
        x: -33,
        y: -68,
      },
    };

    const frames = {
      max: 15, // total number of animation frames
      current: 0, // starting at the first frame
      elapsed: 0, // no elapsed frames initially
      hold: 3, // number of frames to skip before the next animation frame
    };

    const offset = {
      x: -40,
      y: -85,
    };

    super({
      position,
      canvas,
      ctx: ctx,
      imageSrc: archerImgs[0],
      frames,
      offset,
      towerParams,
      towerExtraParams,
    });
  }

  shoot(): void {
    this.projectiles.push(
      new Arrow({
        position: {
          x: this.center.x - 23,
          y: this.center.y - 100,
        },
        enemy: this.target!,
        ctx: this.ctx,
        canvas: this.canvas,
      }),
    );

    this.getShootAngle();
  }

  getShootAngle(): void {
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

  updateTowerView(towerAngle: number): void {
    const numImages = archerImgs.length;
    // get the angle range for each image
    const imageRange = 360 / numImages;

    // сalculate the index of the image corresponding to the angle
    let imageIndex = Math.round(towerAngle / imageRange);

    // handle the case where the angle is close to 360 degrees
    if (imageIndex === numImages) {
      imageIndex = 0;
    }

    // update the image source using the calculated index
    this.image.src = archerImgs[imageIndex];

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

export default ArcherTower;
