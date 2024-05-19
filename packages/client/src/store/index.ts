import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/reducer";
import { leaderboardSlice } from "./leaderboard/reducer";
import { errorSlice } from "@/store/error/reducer";

export const store = configureStore({
  reducer: combineReducers({
    error: errorSlice.reducer,
    user: userSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
