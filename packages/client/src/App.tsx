import { FC } from "react";

import { routes } from "@/pages/routes";
import { Navigate, Route, Routes } from "react-router";

import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";
import Forum from "@/pages/forum";
import ForumTopic from "@/pages/forumTopic";
import Game from "@/pages/game";
import GameStartPage from "@/pages/gameStart";
import GameOverPage from "@/pages/gameOver";
import ErrorPage from "@/pages/error";
import Layout from "@/components/layout";

const App: FC = () => {
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
        <Route path={routes.error404} element={<ErrorPage.error404 />} />
        <Route path={routes.error500} element={<ErrorPage.error500 />} />
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </Layout.Main>
  );
};

export default App;
