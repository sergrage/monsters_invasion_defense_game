export type LeaderboardState = {
  data: LeaderboardResponse[] | null;
  loading: boolean;
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
