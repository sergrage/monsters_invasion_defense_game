const dummyLevel = {
  coins: 100,
  hearts: 3,
  // Number of enemy waves in the level
  numWaves: 3,
  // waves info
  waves: [
    {
      // Wave 1
      numEnemies: {
        shieldZombie: 5,
        coneZombie: 3,
      },
    },
    {
      // Wave 2
      numEnemies: {
        shieldZombie: 7,
        coneZombie: 5,
      },
    },
    {
      // Wave 3
      numEnemies: {
        shieldZombie: 10,
        coneZombie: 8,
      },
    },
  ],
};

export default dummyLevel;
