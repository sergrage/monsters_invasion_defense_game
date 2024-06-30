import Leaderboard from "@/pages/leaderBoard";
import Game from "@/pages/game";
import GameStartPage from "@/pages/gameStart";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Forum from "@/pages/forum";

import { routes } from "@/pages/routes";
import { AppDispatch, RootState } from "./store";

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: PageInitContext;
};

type Route = {
  path: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  fetchData?: (args: PageInitArgs) => Promise<unknown>;
};

const dataRoutes = [
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.signup,
    element: <Signup />,
  },
  {
    path: routes.game,
    element: <Game />,
  },
  {
    path: routes.gameStart,
    element: <GameStartPage />,
  },
  {
    path: routes.leaderboard,
    element: <Leaderboard />,
  },
  {
    path: routes.forum,
    element: <Forum />,
  },
].map((item: Route) => {
  return {
    ...item,
    fetchData: item?.fetchData ? item.fetchData : () => Promise.resolve(),
  };
});

export default dataRoutes;
