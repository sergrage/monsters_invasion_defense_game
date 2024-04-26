import React, { FC } from "react";

import style from "./style.module.scss";
import Title from "@/ui/title";
import Layout from "@/components/Layout";

const GameOverPage: FC = () => {
  return (
    <Layout.Page>
      <div className={style.wrapper}>
        <h1 className={style.title}>GAME OVER</h1>
        <p className={style.score}>SCORE: 500</p>
        <button>Start Again?</button>
      </div>
    </Layout.Page>
  );
};

export default GameOverPage;
