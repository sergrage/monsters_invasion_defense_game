import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";

import { routes } from "@/pages/routes";
import { Navigate, Route, Routes } from "react-router";
import * as React from "react";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";
import Forum from "@/pages/forum";
import ForumTopic from "@/pages/forumTopic";
import Game from "@/pages/game";
import GameStartPage from "@/pages/gameStart";
import GameOverPage from "@/pages/gameOver";
import Leaderboard from "@/pages/leaderBoard";
import ErrorPage from "@/pages/error";
import Layout from "@/components/layout";
import ZombieLoader from "./ui/zombieLoader";

import AudioCore from "@/audioCore/Core";

declare global {
  interface Window {
    audioGlobal: AudioCore;
    musicIsOn: boolean;
  }
}

const App: FC = () => {
  if (!window.audioGlobal) {
    window.audioGlobal = new AudioCore([
      "MenuClick",
      "MenuMusic",
      "Coins",
      "ZombyFall",
      "Laser",
      "Arrow",
      "Bullet",
      "Cannon",
    ]);
  }

  // на будущее - показывает уведомления и ошибки
  // const message = useAppSelector(state => state.notify.message);
  // const error = useAppSelector(state => state.notify.error);
  const isLoading = useAppSelector(state => state.notify.isLoading);

  let location = useLocation();

  React.useEffect(() => {
    window.audioGlobal.pauseAll();
    if (location.pathname == "/play") {
      window.audioGlobal.play("MenuMusic");
    }
  }, [location]);

  return (
    <Layout.Main>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.game} element={<Game />} />
        <Route path={routes.forum} element={<Forum />} />
        <Route path={routes.forumTopics} element={<ForumTopic />} />
        <Route path={routes.gameStart} element={<GameStartPage />} />
        <Route path={routes.gameOver} element={<GameOverPage />} />
        <Route path={routes.leaderboard} element={<Leaderboard />} />
        <Route path={routes.error404} element={<ErrorPage.error404 />} />
        <Route path={routes.error500} element={<ErrorPage.error500 />} />
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>

      {isLoading && <ZombieLoader />}
    </Layout.Main>
  );
};

export default App;
