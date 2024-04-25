import { FC } from "react";

import { routes } from "@/pages/routes";
import { Navigate, Route, Routes } from "react-router";

import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Forum from "@/pages/forum";
import Game from "@/pages/game";
import ErrorPage from "@/pages/error";
import Layout from "@/components/Layout";

const App: FC = () => {
  return (
    <Layout.Main>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.game} element={<Game />} />
        <Route path={routes.forum} element={<Forum />} />
        <Route path={routes.error404} element={<ErrorPage.error404 />} />
        <Route path={routes.error500} element={<ErrorPage.error500 />} />

        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </Layout.Main>
  );
};

export default App;
