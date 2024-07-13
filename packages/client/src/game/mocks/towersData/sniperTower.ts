import previewImg from "@/assets/img/towers/towersPreview/sniperT.png";
import shooterImgs from "@/assets/img/towers/sniperTower/sniper/index";
import towerImgs from "@/assets/img/towers/sniperTower/tower/index";
import bulletImg from "@/assets/img/projectiles/Bullet.png";

import { ITowerParams } from "@/game/interfaces";

const sniperTower: ITowerParams = {
  title: "Sniper tower",
  preview: previewImg,
  width: 72,
  height: 144,
  radius: 300,
  speed: 1,
  damage: 55,
  price: 85,
  upgradePrice: 45,
  imgs: shooterImgs,

  offset: {
    x: 5,
    y: -60,
  },

  frames: {
    max: 20,
    current: 0,
    elapsed: 0,
    hold: 10,
  },

  extraParams: {
    width: 80,
    height: 80,
    towerImgs: towerImgs,
    offset: {
      x: -5,
      y: -10,
    },
  },

  projectile: {
    offset: {
      x: 23,
      y: 100,
    },
    imageSrc: bulletImg,
    needRotation: true,
  },
};

export default sniperTower;
