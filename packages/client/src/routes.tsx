import Leaderboard from "@/pages/leaderBoard";
import Game from "@/pages/game";
import Login from "@/pages/login";

import { routes } from "@/pages/routes";

const Routes = [
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.game,
    element: <Game />,
  },
  {
    path: routes.leaderboard,
    element: <Leaderboard />,
  },
].map(item => ({ ...item }));

export default Routes;
