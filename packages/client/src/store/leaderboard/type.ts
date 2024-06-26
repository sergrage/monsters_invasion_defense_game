export interface LeaderboardState {
  data: ILeader[];
  loading: boolean;
}

export interface IUser {}

export interface ILeader {
  data: {
    name: string;
    login: string;
    avatar: string;

    kills: number;
    earnMoney: number;
    date: string;
  };
}
