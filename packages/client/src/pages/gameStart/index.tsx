import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from "./style.module.scss";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logOutThunk } from "@/store/user/actions";

import Layout from "@/components/layout";
import GameMenu from "@/components/gameMenu";

import Button from "@/ui/button/index";
import IconButton from "@/ui/button/iconBtn";

import { routes } from "@/pages/routes";
import { toggleFullscreen } from "@/utils/fullscreenMode";

import logoutIcon from "@/assets/icons/logout.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import LanguageSwitcher from "@/assets/internationalization/languageSwitcher";

const GameStartPage: FC = () => {
  const { t } = useTranslation();

  const gameMenu = [
    { title: t(TRANSLATIONS.START_GAME), route: routes.game },
    { title: t(TRANSLATIONS.LEADERBOARD), route: routes.leaderboard },
    { title: t(TRANSLATIONS.GAME_FORUM), route: routes.forum },
  ];

  let interval: NodeJS.Timer | undefined;

  const dispatch = useAppDispatch();

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

  const handleLogOut = () => {
    dispatch(logOutThunk());
  };

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
            name={t(TRANSLATIONS.FULL_SCREEN)}
            onClick={() => toggleFullscreen()}
            formBtn={true}
            formBtnBlue={true}
            noAnimate={true}
          />
        </div>
      </div>

      <div className={style.iconsWrapper}>
        <IconButton
          name={"Settings"}
          icon={settingsIcon}
          onClick={() => navigate(routes.profile)}
          className={style.exitBtn}
        />
        <IconButton
          name={"Log out"}
          icon={logoutIcon}
          onClick={handleLogOut}
          className={style.exitBtn}
        />
        <LanguageSwitcher />
      </div>
    </Layout.Page>
  );
};

export default GameStartPage;
