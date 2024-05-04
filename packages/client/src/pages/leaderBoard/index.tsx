import { FC, useState } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import zombieAlarm from "@/assets/img/zombieAlarm.png";
import toasty from "@/assets/img/leaderborad/toasty.png";
import toasty_sound from "@/assets/sound/toasty.mp3";

import tempData from "./temp_data";

import cn from "classnames";
import Title from "@/ui/title";

const LeaderBoardPage: FC = () => {
  const [showToasty, setShowToasty] = useState(false);
  const [showBlood, setShowBlood] = useState(false);

  const handleClick = () => {
    setShowToasty(true);
    handleSound();
    setTimeout(() => {
      setShowToasty(false);
    }, 1000);
  };

  const handleSound = () => {
    const toastySound = document.getElementById(
      "toastySound",
    ) as HTMLAudioElement;
    toastySound.play();
  };

  const handleMouseEnter = () => {
    setShowBlood(true);
  };

  const handleMouseLeave = () => {
    setShowBlood(false);
  };

  return (
    <Layout.Page>
      <section className={style.leaderboard}>
        {showToasty && (
          <Image
            className={cn(style.toasty, {
              [style.show]: showToasty,
            })}
            src={toasty}
            alt="Dan Forden"
          />
        )}
        <audio id="toastySound">
          <source src={toasty_sound} type="audio/mpeg" />
          Разрешите звук
        </audio>
        <div className={cn(style.wrapper)}>
          <Title.H2
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={style.title}
            extraClass={style.bloody}
            state={showBlood}
            title={
              <>
                Leaderboard
                <div className={style.drop} />
                <div className={style.drop} />
                <div className={style.drop} />
                <div className={style.drop} />
                <div className={style.drop} />
              </>
            }
          />
          <Image
            className={style.zombieAlarm}
            src={zombieAlarm}
            alt="zombieAlarm"
          />
        </div>
        <div className={cn(style.tableWrapper, style.masked)}>
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
                .map((item, index) => (
                  <tr key={item.id}>
                    {index === 0 ? (
                      <td
                        className={cn(style.boldText, style.twinkling)}
                        onClick={handleClick}
                      >
                        {item.rank}
                      </td>
                    ) : (
                      <td className={style.boldText}>{item.rank}</td>
                    )}
                    <td>{item.zombieKills}</td>
                    <td>
                      <div className={style.user}>
                        <Image
                          className={style.avatar}
                          src={item.user.avatar}
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
