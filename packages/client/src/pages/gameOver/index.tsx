import React, { FC } from "react";

import style from "./style.module.scss";
import Layout from "@/components/layout";

import CoinsScore from "./components/coinsScore";
import GameMenu from "@/components/gameMenu";

import { routes } from "@/pages/routes";

const GameOverPage: FC = () => {
  const gameMenu = [
    { title: "Main Page", route: routes.gameStart },
    { title: "Leader Board", route: routes.leaderboard },
    { title: "Play Again?", route: routes.gameStart },
  ];

  const levelScore = 100;
  const userScore = 30;

  return (
    <Layout.Page>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.wrapperResult}>
            <h1 className={style.title}>GAME OVER</h1>
            <CoinsScore
              levelScore={levelScore}
              userScore={userScore}
            ></CoinsScore>
            <p className={style.score}>YOUR SCORE: {userScore}</p>
            <GameMenu menu={gameMenu}></GameMenu>
          </div>
        </div>
      </div>
    </Layout.Page>
  );
};

export default GameOverPage;
