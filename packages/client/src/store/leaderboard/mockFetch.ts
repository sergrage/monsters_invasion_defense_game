import { mockLeaderboardData } from "./mockData";
import { LeaderboardResponse } from "./type";

export const fetchLeaderboardData = async (): Promise<
  LeaderboardResponse[]
> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockLeaderboardData);
    }, 3000);
  });
};
