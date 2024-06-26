import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout";
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

import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";

import {
  SCREEN_ZOMBIE_MESSAGE_1,
  SCREEN_ZOMBIE_MESSAGE_2,
  SCREEN_ZOMBIE_MESSAGE_FINAL,
} from "@/constants/index";
import sellImg from "@/assets/img/towerMenu/sell.png";
import upgrImg from "@/assets/img/towerMenu/upgr.png";
import level_1Map from "@/assets/game/levels/Level-1.png";
import style from "./style.module.scss";

import { toggleFullscreen } from "@/utils/fullscreenMode";
import { addLeaderThunk } from "@/store/leaderboard/actions";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserState } from "@/store/user/selector";

let isInit = true;
let isBadScreen = false;

const GamePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUserState).user;
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
    useRef(null);

  const [coins, setCoins] = useState<number>(level.coins);
  const [kills, setKills] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(level.hearts);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [disclaimerText, setDisclaimerText] = useState<string>(
    SCREEN_ZOMBIE_MESSAGE_1,
  );

  const [windowWidth, windowHeight] = useWindowSize();

  const handleCoinsChangedEvent = (coins: number) => setCoins(coins);
  const handleKillsChangedEvent = () => setKills(kills + 1);
  const handleHeartsChangedEvent = (hearts: number) => setHearts(hearts);
  const handleGameOverEvent = () => setIsGameOver(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;
    // Create instances of dependencies
    const mapGenerator = new MapGenerator(
      1280,
      768,
      canvasRef.current,
      level_1Map,
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

    // get canvas offset
    const coords = canvasRef.current.getBoundingClientRect();
    const globalOffset = { x: coords.left, y: coords.top };

    const game = new Game(
      coins,
      hearts,
      globalOffset,
      mapGenerator,
      enemiesGenerator,
      tilesGenerator,
      eventSubject,
      level,
      towerSelector,
      towerMenu,
    );

    const coinsChangedObserver = new EventObserver(handleCoinsChangedEvent);
    const killsChangedObserver = new EventObserver(handleKillsChangedEvent);
    const heartsChangedObserver = new EventObserver(handleHeartsChangedEvent);
    const gameOverObserver = new EventObserver(handleGameOverEvent);

    game.eventSubject.attach("coinsChanged", coinsChangedObserver);
    game.eventSubject.attach("kill", killsChangedObserver);
    game.eventSubject.attach("heartsChanged", heartsChangedObserver);
    game.eventSubject.attach("gameOver", gameOverObserver);

    game.initialize();
    game.initGame();
  }, []);

  // screen zombie disclaimer logic
  useEffect(() => {
    // skip first render
    if (isInit) {
      isInit = false;
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (
      (windowWidth < 1350 && disclaimerText !== SCREEN_ZOMBIE_MESSAGE_FINAL) ||
      (windowHeight < 950 && disclaimerText !== SCREEN_ZOMBIE_MESSAGE_FINAL)
    ) {
      setShowDisclaimer(true);
      if (isBadScreen) {
        // if bad screen second time, show second message
        setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_2);
      } else {
        // if bad screen first time, show default message
        isBadScreen = true;
      }
    } else {
      // if good screen, show final message
      setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_FINAL);

      timer = setTimeout(() => {
        // reset zombie
        setShowDisclaimer(false);
        setDisclaimerText(SCREEN_ZOMBIE_MESSAGE_1);
        isBadScreen = false;
      }, 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    if (isGameOver) {
      dispatch(
        addLeaderThunk({
          name:
            `${user?.first_name} ${user?.second_name}` ??
            "Не виданный ранее убивец",
          login: user?.login ?? "Нет данных",
          avatar: user?.avatar ?? "",
          kills: kills,
          earnMoney: coins,
          date: Date.now().toString(),
        }),
      );
      navigate(routes.gameOver);
    }
  }, [isGameOver]);

  return (
    <Layout.Page pageClass={style.wrapper}>
      <div className={style.game}>
        <canvas ref={canvasRef} id="gameCanvas"></canvas>

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
      {showDisclaimer && (
        <ScreenZombie action={() => toggleFullscreen()} text={disclaimerText} />
      )}
    </Layout.Page>
  );
};

export default GamePage;
