import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { LeaderboardState } from "./type";
import { AppDispatch, RootState } from "..";
import { fetchLeaderboardData } from "./mockFetch";

const initialState: LeaderboardState = {
  data: [],
  loading: false,
};

export const leaderboardSlice = createSlice({
  initialState,
  name: "leaderboard",
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    setData(state, action: PayloadAction<typeof initialState.data>) {
      state.data = action.payload;
      state.loading = false;
    },
    setError(state) {
      state.loading = false;
    },
  },
});

export const { startLoading, setData, setError } = leaderboardSlice.actions;

export const loadLeaderboardData = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const data = await fetchLeaderboardData();
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError());
  }
};

export const getLeaderBoardState = (state: RootState) => state.leaderboard;
export const selectLeaderboardData = createSelector(
  getLeaderBoardState,
  leaderboardState => leaderboardState.data,
);
export const selectLeaderboardLoading = createSelector(
  getLeaderBoardState,
  leaderboardState => leaderboardState.loading,
);
