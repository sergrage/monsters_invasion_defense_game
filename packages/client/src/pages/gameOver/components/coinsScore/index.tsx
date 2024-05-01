import React, { FC } from "react";

import coin from "@/assets/img/lightning.png";
import darkCoin from "@/assets/img/lightningDark.png";

import style from "./style.module.scss";
import Image from "@/ui/image";

export type TProps = {
  levelScore: number;
  userScore: number;
};
const CoinsScore: FC<TProps> = ({ levelScore, userScore }) => {
  const coins = [
    userScore >= 0.3 * levelScore,
    userScore >= 0.5 * levelScore,
    userScore >= 0.7 * levelScore,
  ];

  return (
    <div className={style.wrapper}>
      {coins.map((item, index) => (
        <Image
          key={index}
          className={style.coin}
          src={item ? coin : darkCoin}
          alt={item ? "coin" : "darkCoin"}
        ></Image>
      ))}
    </div>
  );
};

export default CoinsScore;
