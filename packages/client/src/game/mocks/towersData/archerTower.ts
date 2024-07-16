import previewImg from "@/assets/img/towers/towersPreview/archerT.png";
import shooterImgs from "@/assets/img/towers/archerTower/archer/index";
import towerImgs from "@/assets/img/towers/archerTower/tower/index";
import arrowImg from "@/assets/img/projectiles/Arrow.png";

import { ITowerParams } from "@/game/interfaces";

const archerTower: ITowerParams = {
  title: "Archer tower",
  preview: previewImg,
  width: 110,
  height: 110,
  radius: 250,
  speed: 3,
  damage: 20,
  price: 50,
  upgradePrice: 25,
  imgs: shooterImgs,

  offset: {
    x: -30,
    y: -65,
  },

  frames: {
    max: 15,
    current: 0,
    elapsed: 0,
    hold: 3,
  },

  extraParams: {
    width: 80,
    height: 86,
    towerImgs: towerImgs,
    offset: {
      x: -2,
      y: -5,
    },
  },

  projectile: {
    offset: {
      x: 23,
      y: 100,
    },
    imageSrc: arrowImg,
    needRotation: true,
  },
};

export default archerTower;
