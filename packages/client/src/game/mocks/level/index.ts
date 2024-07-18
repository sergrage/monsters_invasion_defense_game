import { ILevel } from "@/game/interfaces";

const level_1: ILevel = {
  coins: 150,
  hearts: 10,
  waves: [
    // Wave 1
    {
      ShieldZombie: { amount: 8, delay: 0 },
      ConeZombie: { amount: 6, delay: 10000 },
    },

    // Wave 2
    {
      ShieldZombie: { amount: 12, delay: 10000 },
      ConeZombie: { amount: 5, delay: 5000 },
      SaucepanZombie: { amount: 8, delay: 0 },
    },

    // Wave 3
    {
      ShieldZombie: { amount: 12, delay: 0 },
      ConeZombie: { amount: 8, delay: 0 },
      SaucepanZombie: { amount: 8, delay: 3000 },
      HelmetZombie: { amount: 10, delay: 10000 },
    },

    // Wave 4
    {
      ShieldZombie: { amount: 12, delay: 0 },
      ConeZombie: { amount: 8, delay: 0 },
      HelmetZombie: { amount: 10, delay: 10000 },
      SaucepanZombie: { amount: 12, delay: 10000 },
      BossHelmetZombie: { amount: 1, delay: 20000 },
    },
  ],
};

export default level_1;
