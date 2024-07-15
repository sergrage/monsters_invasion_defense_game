import { ILevel } from "@/game/interfaces";

const level_1: ILevel = {
  coins: 150,
  hearts: 10,
  waves: [
    // Wave 1
    {
      ShieldZombie: 5,
      ConeZombie: 4,
    },

    // Wave 2
    {
      ShieldZombie: 8,
      ConeZombie: 5,
      SaucepanZombie: 8,
    },

    // Wave 3ˇ
    {
      ShieldZombie: 12,
      ConeZombie: 8,
      HelmetZombie: 10,
    },

    // Wave 4ˇ
    {
      ShieldZombie: 12,
      ConeZombie: 8,
      HelmetZombie: 20,
      SaucepanZombie: 18,
    },
  ],
};

export default level_1;
