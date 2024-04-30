import { FC } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import zombieAlarm from "@/assets/img/zombieAlarm.png";

import cn from "classnames";

const LeaderBoardPage: FC = () => {
  return (
    <Layout.Page>
      <div className={style.hero}>
        <div className={cn(style.wrapper)}>
          <h2 className={cn(style.title)}>Leaderboard</h2>
          <h3 className={cn(style.gametitle)}>
            Monsters Invasion Defense Game
          </h3>

          <Image
            className={style.zombieAlarm}
            src={zombieAlarm}
            alt="zombieAlarm"
          ></Image>
        </div>
      </div>
    </Layout.Page>
  );
};

export default LeaderBoardPage;
