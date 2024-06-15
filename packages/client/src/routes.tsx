import Leaderboard from "@/pages/leaderBoard";
import Game from "@/pages/game";
import GameStartPage from "@/pages/gameStart";
import Login from "@/pages/login";
import Forum from "@/pages/forum";

import { routes } from "@/pages/routes";

const dataRoutes = [
  {
    path: routes.login,
    element: <Login />,
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
].map(item => ({ ...item }));

export default dataRoutes;
