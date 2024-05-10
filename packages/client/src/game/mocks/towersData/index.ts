import towersPreview from "@/assets/img/towers/towersPreview";

import archerImgs from "@/assets/img/towers/archerTower/archer/index";
import archerTowerImgs from "@/assets/img/towers/archerTower/tower/index";
import teslaImgs from "@/assets/img/towers/teslaTower/index";

import projectileImgs from "@/assets/img/projectiles/index";

import { ITowerParams } from "@/game/interfaces";

const archerTower: ITowerParams = {
  title: "Archer tower",
  preview: towersPreview.archer,
  width: 144,
  height: 144,
  radius: 250,
  speed: 3,
  price: 50,
  upgradePrice: 25,
  imgs: archerImgs,

  offset: {
    x: -40,
    y: -85,
  },

  frames: {
    max: 15, // total number of animation frames
    current: 0, // starting at the first frame
    elapsed: 0, // no elapsed frames initially
    hold: 3, // number of frames to skip before the next animation frame
  },

  extraParams: {
    width: 131,
    height: 153,
    towerImg: archerTowerImgs[0],
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

const teslaTower: ITowerParams = {
  title: "Tesla tower",
  preview: towersPreview.electro,
  width: 236,
  height: 335,
  radius: 250,
  speed: 3,
  price: 50,
  upgradePrice: 25,
  imgs: teslaImgs,

  offset: {
    x: -80,
    y: -220,
  },

  frames: {
    max: 10,
    current: 0,
    elapsed: 0,
    hold: 3,
  },

  projectile: {
    offset: {
      x: 105,
      y: 310,
    },
    imageSrc: projectileImgs.lighter,
    needRotation: false,
  },
};

export default [archerTower, teslaTower];
