import Building from "@/game/classes/gameEntities/Buildings/Building";
import Arrow from "@/game/classes/gameEntities/Projectiles/Arrow";

import archerImgs from "@/assets/img/towers/archerTower/archer/index";
import towerImg from "@/assets/img/towers/archerTower/tower.png";
import { IContext } from "@/game/interfaces";

class ArcherTower extends Building {
  towerAngle: number | undefined;

  constructor({ position, canvas, c }: IContext) {
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
      towerImg: {
        1: towerImg,
        2: towerImg,
        3: towerImg,
        4: towerImg,
        5: towerImg,
      },
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
      c: c,
      imageSrc: archerImgs,
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
        c: this.c,
        canvas: this.canvas,
      }),
    );

    this.getShootAngle();
  }

  getShootAngle(): void {
    const angle = Math.atan2(
      this.target!.center.y - this.position.y,
      this.target!.center.x - this.position.x,
    );

    let towerAngle = (angle * 360) / Math.PI;

    if (towerAngle < 0) {
      towerAngle = -towerAngle;
    }

    this.updateTowerView(towerAngle);
  }

  updateTowerView(towerAngle: number): void {
    console.log(towerAngle);

    let newSrc = "";

    if (337.5 < towerAngle || towerAngle <= 22.5) {
      newSrc = archerImgs.img0;
    } else if (22.5 < towerAngle && towerAngle <= 67.5) {
      newSrc = archerImgs.img45;
    } else if (67.5 < towerAngle && towerAngle <= 112.5) {
      newSrc = archerImgs.img90;
    } else if (112.5 < towerAngle && towerAngle <= 157.5) {
      newSrc = archerImgs.img135;
    } else if (157.5 < towerAngle && towerAngle <= 202.5) {
      newSrc = archerImgs.img180;
    } else if (202.5 < towerAngle && towerAngle <= 247.5) {
      newSrc = archerImgs.img225;
    } else if (247.5 < towerAngle && towerAngle <= 292.5) {
      newSrc = archerImgs.img270;
    } else if (292.5 < towerAngle && towerAngle <= 337.5) {
      newSrc = archerImgs.img315;
    }

    this.image.src = newSrc;
  }
}

export default ArcherTower;
