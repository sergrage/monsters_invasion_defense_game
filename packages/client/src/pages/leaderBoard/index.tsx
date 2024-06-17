import { FC, useEffect, useState } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import zombieAlarm from "@/assets/img/zombieAlarm.png";
import toasty from "@/assets/img/leaderborad/toasty.png";
import toasty_sound from "@/assets/sound/toasty.mp3";
import cn from "classnames";
import Title from "@/ui/title";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  loadLeaderboardData,
  selectLeaderboardData,
  selectLeaderboardLoading,
} from "@/store/leaderboard/reducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import ZombieLoader from "@/ui/zombieLoader";
import { LeaderboardResponse } from "@/store/leaderboard/type";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

const LeaderBoardPage: FC = () => {
  const { t } = useTranslation();
  const [showToasty, setShowToasty] = useState(false);
  const [showBlood, setShowBlood] = useState(false);

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectLeaderboardData);
  const loading = useAppSelector(selectLeaderboardLoading);

  useEffect(() => {
    dispatch(loadLeaderboardData());
  }, [dispatch]);

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

  if (loading) {
    return <ZombieLoader />;
  }

  return (
    <Layout.Page>
      <section className={style.leaderboard}>
        {showToasty && (
          <Image
            className={cn(style.toasty, showToasty && style.show)}
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
            className={cn(style.title, showBlood && style.bloody)}
          >
            Leaderboard
            <div className={style.drop} />
            <div className={style.drop} />
            <div className={style.drop} />
            <div className={style.drop} />
            <div className={style.drop} />
          </Title.H2>
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
                <th scope="col">{t(TRANSLATIONS.RANK)}</th>
                <th scope="col">{t(TRANSLATIONS.KILLS)}</th>
                <th scope="col">{t(TRANSLATIONS.USER)}</th>
                <th scope="col">{t(TRANSLATIONS.TOTAL_MONEY)}</th>
                <th scope="col">{t(TRANSLATIONS.DATE)}</th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.slice()
                .sort(
                  (a: LeaderboardResponse, b: LeaderboardResponse) =>
                    a.rank - b.rank,
                )
                .map((item: LeaderboardResponse, index: number) => (
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
