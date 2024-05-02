import { FC } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import zombieAlarm from "@/assets/img/zombieAlarm.png";
import tempData from "./temp_data";

import cn from "classnames";

const LeaderBoardPage: FC = () => {
  return (
    <Layout.Page>
      <section className={style.leaderboard}>
        <div className={cn(style.wrapper)}>
          <h2 className={cn(style.title)}>Leaderboard</h2>
          <Image
            className={style.zombieAlarm}
            src={zombieAlarm}
            alt="zombieAlarm"
          />
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Kills</th>
                <th scope="col">User</th>
                <th scope="col">Total money</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {tempData
                .sort((a, b) => a.rank - b.rank)
                .map(item => (
                  <tr onClick={() => console.log("jmi")} key={item.id}>
                    <td className={style.boldText}>{item.rank}</td>
                    <td>{item.zombieKills}</td>
                    <td>
                      <div className={style.user}>
                        <img
                          src={item.user.avatar}
                          className={style.avatar}
                          alt="RRR! AVATAR!"
                        />
                        <p>{item.user.login}</p>
                      </div>
                    </td>
                    <td>{item.earnMoney}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout.Page>
  );
};

export default LeaderBoardPage;
