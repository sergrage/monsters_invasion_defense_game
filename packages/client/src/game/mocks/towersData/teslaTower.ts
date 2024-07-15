import previewImg from "@/assets/img/towers/towersPreview/teslaT.png";
import imgs from "@/assets/img/towers/teslaTower/index";
import lighterImg from "@/assets/img/projectiles/Lighter.png";

import { ITowerParams } from "@/game/interfaces";

const teslaTower: ITowerParams = {
  title: "Tesla tower",
  preview: previewImg,
  width: 236,
  height: 335,
  radius: 250,
  damage: 25,
  speed: 3.5,
  price: 120,
  upgradePrice: 45,
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
    imageSrc: lighterImg,
    needRotation: false,
  },
};

export default teslaTower;
