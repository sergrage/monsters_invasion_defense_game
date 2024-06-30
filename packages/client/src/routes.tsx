import Leaderboard from "@/pages/leaderBoard";
import Game from "@/pages/game";
import GameStartPage from "@/pages/gameStart";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Forum from "@/pages/forum";
import Profile from "@/pages/profile";
import ForumTopics from "@/pages/forumTopic";

import { routes } from "@/pages/routes";

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
    path: routes.profile,
    element: <Profile />,
  },
  {
    path: routes.leaderboard,
    element: <Leaderboard />,
  },
  {
    path: routes.forum,
    element: <Forum />,
  },
  {
    path: routes.forumTopics,
    element: <ForumTopics />,
  },
];

export default dataRoutes;
