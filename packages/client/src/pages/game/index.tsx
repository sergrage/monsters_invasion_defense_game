import { FC, useState, useEffect, useRef } from "react";
// import Layout from "@/components/layout";
import Game from "@/game/game";
import Coins from "@/components/game/coins/coins";
import Hearts from "@/components/game/hearts/hearts";
import EventObserver from "@/game/classes/behavioral/observer";
import EventSubject from "@/game/classes/behavioral/eventSubject";
import MapGenerator from "@/game/classes/creational/mapGenerator";
import EnemiesGenerator from "@/game/classes/creational/EnemiesGenerator";
import TilesGenerator from "@/game/classes/creational/tilesGenerator";
import TowersSelector from "@/game/classes/gameEntities/Buildings/TowerSelector";
import PlacementTile from "@/game/classes/gameEntities/PlacementTile";
import TowerMenu from "@/game/classes/gameEntities/Buildings/TowerMenu";

import placementTilesData from "@/game/mocks/placementTilesData";
import waypoints from "@/game/mocks/waypoints";
import level from "@/game/mocks/level/index";

import towerMenuImgs from "@/assets/img/towerMenu";
import myImage from "@/game/img/gameMap.png";
import style from "./style.module.scss";

const GamePage: FC = () => {
  const [coins, setCoins] = useState<number>(level.coins);
  const [hearts, setHearts] = useState<number>(level.hearts);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const canvasRef = useRef(null);

  const handleCoinsChangedEvent = (coins: number) => setCoins(coins);
  const handleHeartsChangedEvent = (hearts: number) => setHearts(hearts);
  const handleGameOverEvent = () => setIsGameOver(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    // // Create instances of dependencies
    const mapGenerator = new MapGenerator(
      1280,
      768,
      canvasRef.current,
      myImage,
    );
    const enemiesGenerator = new EnemiesGenerator(mapGenerator.ctx, waypoints);
    const tilesGenerator = new TilesGenerator(
      mapGenerator.ctx,
      placementTilesData,
      PlacementTile,
    );
    const eventSubject = new EventSubject();
    const towerSelector = new TowersSelector(coins);
    const towerMenu = new TowerMenu();

    const game = new Game(
      coins,
      hearts,
      mapGenerator,
      enemiesGenerator,
      tilesGenerator,
      eventSubject,
      level,
      towerSelector,
      towerMenu,
    );

    const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
    const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);
    const gameOverObserver = new EventObserver(handleGameOverEvent);

    game.eventSubject.attach("coinsChanged", coinsChangedObserver);
    game.eventSubject.attach("heartsChanged", heartsChangedObserver);
    game.eventSubject.attach("gameOver", gameOverObserver);

    game.initialize();
    game.initGame();
  }, []);

  return (
    <>
      <div className={style.game}>
        <canvas ref={canvasRef} id="gameCanvas"></canvas>
        {isGameOver && (
          <div id="gameOver" className={style.gameOver}>
            GAME OVER
          </div>
        )}
        <div className={style.gameStats}></div>
        <div className={style.gameStatsContainer}>
          <Coins coins={coins} />
          <Hearts hearts={hearts} />
        </div>
        <article className={style.towerSelectorContainer} id="towerSelector">
          <div className={style.selector}></div>
        </article>
        <article className={style.towerMenu} id="towerMenu">
          <button title="Upgrade tower">
            <img src={towerMenuImgs.upgrade} alt="Upgrade tower" />
          </button>
          <button title="Sell tower">
            <img src={towerMenuImgs.sell} alt="Sell tower" />
          </button>
        </article>
      </div>
    </>
  );
};

export default GamePage;
