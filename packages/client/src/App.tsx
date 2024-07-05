import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";

import { useAppSelector } from "./hooks/useAppSelector";
import { routes } from "@/pages/routes";
import { getUserThunk } from "@/store/user/actions";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getUserState } from "./store/user/selector";

import ProtectedRoute from "@/components/protectedRoute";
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
import OAuthPage from "@/pages/OAuth";
import Layout from "@/components/layout";
import ZombieLoader from "./ui/zombieLoader";

import AudioCore from "@/audioCore/Core";
import "./assets/internationalization/i18n.js";

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

  let location = useLocation();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getUserState).isLoading;
  const isAuth = useAppSelector(getUserState).isAuth;

  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  useEffect(() => {
    window.audioGlobal.pauseAll();
    if (location.pathname == "/play") {
      window.audioGlobal.play("MenuMusic");
    }
  }, [location]);

  return (
    <Layout.Main>
      <Routes>
        <Route
          path={routes.login}
          element={
            isAuth ? <Navigate to={routes.gameStart} replace /> : <Login />
          }
        />
        <Route
          path={routes.signup}
          element={
            isAuth ? <Navigate to={routes.gameStart} replace /> : <Signup />
          }
        />
        <Route path={routes.auth} element={<OAuthPage />} />

        <Route
          path={routes.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.game}
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.forum}
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.forumTopics}
          element={
            <ProtectedRoute>
              <ForumTopic />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.gameStart}
          element={
            <ProtectedRoute>
              <GameStartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.gameOver}
          element={
            <ProtectedRoute>
              <GameOverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.leaderboard}
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route path={routes.error404} element={<ErrorPage.error404 />} />
        <Route path={routes.error500} element={<ErrorPage.error500 />} />
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>

      {isLoading && <ZombieLoader />}
    </Layout.Main>
  );
};

export default App;
