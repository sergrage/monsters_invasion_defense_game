export type LeaderboardState = {
  leaderboardUsers: LeaderboardResponse[] | null;
  status: "idle" | "loading" | "resolved" | "rejected";
  error: string | null;
};

export type LeaderboardResponse = {
  id: number;
  user: {
    name: string;
    login: string;
    avatar: string;
  };
  rank: number;
  zombieKills: number;
  earnMoney: number;
  date: string;
};
