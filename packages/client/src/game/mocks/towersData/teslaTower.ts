import towersPreview from "@/assets/img/towers/towersPreview";
import imgs from "@/assets/img/towers/teslaTower/index";
import projectileImgs from "@/assets/img/projectiles/index";

import { ITowerParams } from "@/game/interfaces";

const teslaTower: ITowerParams = {
  title: "Tesla tower",
  preview: towersPreview.tesla,
  width: 236,
  height: 335,
  radius: 250,
  damage: 25,
  speed: 3.5,
  price: 70,
  upgradePrice: 35,
  imgs: imgs,

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

export default teslaTower;
