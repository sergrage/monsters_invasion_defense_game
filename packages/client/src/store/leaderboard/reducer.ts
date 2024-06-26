import { createSlice } from "@reduxjs/toolkit";
import { ILeader, LeaderboardState } from "./type";
import { RootState } from "..";
import { getLeadersThunk } from "@/store/leaderboard/actions";

const initialState: LeaderboardState = {
  data: [],
  loading: false,
};

export const leaderboardSlice = createSlice({
  initialState,
  name: "leaderboard",
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLeadersThunk.pending, state => {
      state.loading = true;
    });

    builder.addCase(getLeadersThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(getLeadersThunk.rejected, state => {
      state.loading = false;
    });
  },
});

export const getLeaderBoardState = (state: RootState) => state.leaderboard;
