import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { leaderboardSlice } from "./leaderboard/reducer";
import { errorSlice } from "./error/reducer";
import userReducer from "./user/reducer";
import ssrReducer from "./ssrSlice";

export const reducer = combineReducers({
  error: errorSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  user: userReducer,
  ssr: ssrReducer,
});

const store = configureStore({
  reducer,
  preloadedState:
    typeof window === "undefined" ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
