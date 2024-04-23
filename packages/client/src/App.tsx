import React, { FC } from "react";

import { routes } from "@/pages/routes";
import Layout from "@/components/Layout";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import { Navigate, Route, Routes } from "react-router";
import Forum from "@/pages/forum";
import ForumTopic from "@/pages/forumTopic";
import Game from "@/pages/game";
import GameOverPage from "@/pages/gameOver";

const App: FC = () => {
  return (
    <Layout.Main>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.game} element={<Game />} />
        <Route path={routes.forum} element={<Forum />} />
        <Route path={routes.forumTopics} element={<ForumTopic />} />
        <Route path={routes.gameOver} element={<GameOverPage />} />
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </Layout.Main>
  );
};

export default App;
