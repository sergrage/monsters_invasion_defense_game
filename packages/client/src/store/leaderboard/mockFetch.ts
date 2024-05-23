import { mockLeaderboardData } from "./mock";
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
