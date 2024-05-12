import towersPreview from "@/assets/img/towers/towersPreview";
import shooterImgs from "@/assets/img/towers/archerTower/archer/index";
import towerImgs from "@/assets/img/towers/archerTower/tower/index";
import projectileImgs from "@/assets/img/projectiles/index";

import { ITowerParams } from "@/game/interfaces";

const archerTower: ITowerParams = {
  title: "Archer tower",
  preview: towersPreview.archer,
  width: 144,
  height: 144,
  radius: 250,
  speed: 3,
  damage: 20,
  price: 50,
  upgradePrice: 25,
  imgs: shooterImgs,

  offset: {
    x: -40,
    y: -85,
  },

  frames: {
    max: 15,
    current: 0,
    elapsed: 0,
    hold: 3,
  },

  extraParams: {
    width: 131,
    height: 153,
    towerImgs: towerImgs,
    offset: {
      x: -33,
      y: -68,
    },
  },

  projectile: {
    offset: {
      x: 23,
      y: 100,
    },
    imageSrc: projectileImgs.arrow,
    needRotation: true,
  },
};

export default archerTower;
