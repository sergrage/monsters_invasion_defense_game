export interface LeaderboardState {
  data: LeaderboardResponse[] | null;
  loading: boolean;
}

export interface IUser {
  name: string;
  login: string;
  avatar: string;
}

export interface LeaderboardResponse {
  id: number;
  user: IUser;
  rank: number;
  zombieKills: number;
  earnMoney: number;
  date: string;
}
