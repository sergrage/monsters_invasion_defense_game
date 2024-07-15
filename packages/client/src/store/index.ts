import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { leaderboardSlice } from "./leaderboard/reducer";
import { errorSlice } from "./error/reducer";
import forumReducer from "./forum/reducer";
import userReducer from "./user/reducer";
import { themeSlice } from "@/store/theme/reducer";

export const store = configureStore({
  reducer: combineReducers({
    error: errorSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
    user: userReducer,
    forum: forumReducer,
    theme: themeSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
