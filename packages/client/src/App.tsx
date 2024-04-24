import { FC } from "react";

import { routes } from "@/pages/routes";
import { Navigate, Route, Routes } from "react-router";

import Layout from "@/components/Layout";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";
import Forum from "@/pages/forum";
import Game from "@/pages/game";

const App: FC = () => {
  return (
    <Layout.Main>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.game} element={<Game />} />
        <Route path={routes.forum} element={<Forum />} />

        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </Layout.Main>
  );
};

export default App;
