import React, { FC, useState, useEffect } from "react";
import Layout from "@/components/Layout";

import Game from "@/game/game";
import Coins from "@/components/game/coins";
import Hearts from "@/components/game/hearts";
import EventObserver from "@/game/classes/behavioral/observer";
import EventSubject from "@/game/classes/behavioral/eventSubject";
import MapGenerator from "@/game/classes/creational/mapGenerator";
import EnemiesGenerator from "@/game/classes/creational/EnemiesGenerator";
import TilesGenerator from "@/game/classes/creational/tilesGenerator";
import placementTilesData from "@/game/mocks/placementTilesData";
import placementTile from "@/game/classes/gameEntities/PlacementTile";
import waypoints from "@/game/mocks/waypoints";
import PlacementTile from "@/game/classes/gameEntities/PlacementTile";
import myImage from "../../game/img/gameMap.png";

const GamePage: FC = () => {
  const [coins, setCoins] = useState<number>(100);
  const [hearts, setHearts] = useState<number>(3);

  function handleCoinsChangedEvent(coins: number) {
    setCoins(coins);
  }

  function handleHeartsChangedEvent(hearts: number) {
    setHearts(hearts);
  }

  useEffect(() => {
    // // Create instances of dependencies
    const mapGenerator = new MapGenerator(1280, 768, "gameCanvas", myImage);
    const enemiesGenerator = new EnemiesGenerator(mapGenerator.ctx, waypoints);
    const tilesGenerator = new TilesGenerator(
      mapGenerator.ctx,
      placementTilesData,
      PlacementTile,
    );
    const eventSubject = new EventSubject();

    const game = new Game(
      coins,
      hearts,
      mapGenerator,
      enemiesGenerator,
      tilesGenerator,
      eventSubject,
    );

    const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
    const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);

    game.eventSubject.attach("coinsChanged", coinsChangedObserver);
    game.eventSubject.attach("heartsChanged", heartsChangedObserver);

    game.initialize();
    game.initGame();
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas id="gameCanvas"></canvas>
      <div
        id="gameOver"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "72px",
          color: "white",
          WebkitTextStroke: "3px black",
        }}
      >
        GAME OVER
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "80px",
          background:
            "linear-gradient(to left bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "4px",
          right: "8px",
          fontSize: "36px",
          color: "white",
          WebkitTextStroke: "2px black",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Coins coinsDisplayCount={coins} />
        <Hearts heartsDisplayCount={hearts} />
      </div>
    </div>
  );
};

export default GamePage;
