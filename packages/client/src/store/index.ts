import {
  combineReducers,
  combineSlices,
  configureStore,
  Store,
} from "@reduxjs/toolkit";
import { userSlice } from "./user/reducer";
import { leaderboardSlice } from "./leaderboard/reducer";
import { UserState } from "@/store/user/type";
import { LeaderboardState } from "@/store/leaderboard/type";
import { errorSlice } from "@/store/error/reducer";
import { ErrorState } from "@/store/error/type";

export interface ApplicationStore {
  error: ErrorState;
  user: UserState;
  // leaderboard: LeaderboardState;
}
export const RootReducer = combineSlices(errorSlice, userSlice);

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export function createApplicationStore(): Store<ApplicationStore> {
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
