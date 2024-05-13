import { useState, useEffect, useRef } from "react";
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
import ScreenZombie from "@/ui/screenZombie";

import useWindowSize from "@/hooks/useWindowSize";

import placementTilesData from "@/game/mocks/placementTilesData";
import waypoints from "@/game/mocks/waypoints";
import level from "@/game/mocks/level/index";

import {
  SCREEN_ZOMBIE_MESSAGE_1,
  SCREEN_ZOMBIE_MESSAGE_2,
  SCREEN_ZOMBIE_MESSAGE_FINAL,
} from "@/constants/index";
import sellImg from "@/assets/img/towerMenu/sell.png";
import upgrImg from "@/assets/img/towerMenu/upgr.png";
import myImage from "@/game/img/gameMap.png";
import style from "./style.module.scss";

let isInit = true;
let isBadScreen = false;

const GamePage = () => {
  const canvasRef = useRef(null);

  const [coins, setCoins] = useState<number>(level.coins);
  const [hearts, setHearts] = useState<number>(level.hearts);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [disclaimerText, setDisclaimerText] = useState<string>(
    SCREEN_ZOMBIE_MESSAGE_1,
  );

  const [windowWidth, windowHeight] = useWindowSize();

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

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }

    if (windowWidth < 1250 || windowHeight < 900) {
      setShowDisclaimer(true);
      if (isBadScreen) {
        setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_2);
      } else {
        isBadScreen = true;
      }
    } else {
      setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_FINAL);

      setTimeout(() => {
        setShowDisclaimer(false);
        setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_1);
        isBadScreen = false;
      }, 1000);
    }
  }, [windowWidth, windowHeight]);

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
            <img src={upgrImg} alt="Upgrade tower" />
          </button>
          <button title="Sell tower">
            <img src={sellImg} alt="Sell tower" />
          </button>
        </article>
      </div>
      {showDisclaimer && <ScreenZombie text={disclaimerText} />}
    </>
  );
};

export default GamePage;
