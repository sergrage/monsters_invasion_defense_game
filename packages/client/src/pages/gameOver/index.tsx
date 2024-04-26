import React, { FC } from "react";

import style from "./style.module.scss";
import Title from "@/ui/title";
import Layout from "@/components/Layout";
import Button from "@/ui/button";

const GameOverPage: FC = () => {
  return (
    <Layout.Page>
      <div className={style.wrapper}>
        <h1 className={style.title}>GAME OVER</h1>
        <p className={style.score}>YOUR SCORE: 500</p>

        <div className="">
          <img src="/src/assets/img/lightning.png" alt="" />
          <img src="/src/assets/img/lightning.png" alt="" />
          <img src="/src/assets/img/lightningDark.png" alt="" />
        </div>
        <Button.Flat name="Start Again?" formBtn={true} formBtnRed={true} />
      </div>
    </Layout.Page>
  );
};

export default GameOverPage;
