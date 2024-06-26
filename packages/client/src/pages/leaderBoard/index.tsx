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
import { getLeaderBoardState } from "@/store/leaderboard/reducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import ZombieLoader from "@/ui/zombieLoader";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import { ILeader } from "@/store/leaderboard/type";
import { getLeadersThunk } from "@/store/leaderboard/actions";

const getDate = (date: string) => {
  const t = Number(date);
  const d = new Date(t);
  console.log(d);

  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};

const LeaderBoardPage: FC = () => {
  const { t } = useTranslation();
  const [showToasty, setShowToasty] = useState(false);
  const [showBlood, setShowBlood] = useState(false);

  const dispatch = useAppDispatch();
  const leaderBoard = useAppSelector(getLeaderBoardState);

  useEffect(() => {
    dispatch(getLeadersThunk());
  }, []);

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

  useEffect(() => {
    // console.log(leaderBoard);
  }, [leaderBoard]);

  if (leaderBoard.loading) {
    return <ZombieLoader />;
  }
  console.log(leaderBoard);

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
              {leaderBoard.data.map((item: ILeader, index: number) => (
                <tr key={`leader_${index}`}>
                  <td
                    className={cn(
                      style.boldText,
                      index === 0 && style.twinkling,
                    )}
                    onClick={handleClick}
                  >
                    {index + 1}
                  </td>
                  <td>{item.data.kills}</td>
                  <td>
                    <div className={style.user}>
                      {item.data.avatar && (
                        <Image
                          className={style.avatar}
                          src={item.data.avatar}
                          alt="RRR! AVATAR!"
                        />
                      )}

                      <p>{item.data.login}</p>
                    </div>
                  </td>
                  <td>{item.data.earnMoney}</td>
                  <td>{getDate(item.data.date)}</td>
                  {/*<td>{item.earnMoney}</td>*/}
                  {/*<td>{getDate(item.date)}</td>*/}
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
