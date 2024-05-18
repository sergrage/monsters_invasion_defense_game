import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from "./style.module.scss";

import Layout from "@/components/layout";
import GameMenu from "@/components/gameMenu";

import Button from "@/ui/button/index";

import { routes } from "@/pages/routes";

import { toggleFullscreen } from "@/utils/fullscreenMode";

const GameStartPage: FC = () => {
  const gameMenu = [
    { title: "Start Game", route: routes.game },
    { title: "Leader Board", route: routes.leaderboard },
    { title: "Game Forum", route: routes.forum },
  ];

  let interval: NodeJS.Timer | undefined;

  const navigate = useNavigate();

  const [counter, setCounter] = useState<number>(3);

  const [showCounter, setShowCounter] = useState<boolean>(false);

  const fireIneterval = () => {
    setShowCounter(true);
    interval = setInterval(() => {
      if (counter !== 0) {
        setCounter(prev => prev - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(interval);
      navigate(routes.game);
    }
  }, [counter]);

  return (
    <Layout.Page>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.titleWrapp}>
            <h1 className={style.title}>Monsters Invasion</h1>
            <span className={style.subtitle}>Defense Game</span>
          </div>
          <div className={style.contentWrapp}>
            {showCounter ? (
              <p className={style.counter}>{counter}</p>
            ) : (
              <GameMenu
                menu={gameMenu}
                control={{ route: routes.game.slice(1), action: fireIneterval }}
              ></GameMenu>
            )}
          </div>

          <Button.Flat
            name={"Full Screen"}
            onClick={() => toggleFullscreen()}
            formBtn={true}
            formBtnBlue={true}
            noAnimate={true}
          />
        </div>
      </div>
    </Layout.Page>
  );
};

export default GameStartPage;
