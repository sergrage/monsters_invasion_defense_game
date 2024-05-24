import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { leaderboardSlice } from "./leaderboard/reducer";
import userReducer from "./user/reducer";

import notifyReducer from "./notification/reducer";
import { errorSlice } from "./error/reducer";

export const store = configureStore({
  reducer: combineReducers({
    error: errorSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
    user: userReducer,
    notify: notifyReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
