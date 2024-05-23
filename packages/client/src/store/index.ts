import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/reducer";
import { leaderboardSlice } from "./leaderboard/reducer";

import notifyReducer from "./notification/reducer";
import authReducer from "./auth/reducer";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    leaderboard: leaderboardSlice.reducer,
    notify: notifyReducer,
    auth: authReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
