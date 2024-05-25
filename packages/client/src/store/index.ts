import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { leaderboardSlice } from "./leaderboard/reducer";
import { errorSlice } from "./error/reducer";
import userReducer from "./user/reducer";

export const store = configureStore({
  reducer: combineReducers({
    error: errorSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
    user: userReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
