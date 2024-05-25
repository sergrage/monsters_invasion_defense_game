import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const getUserState = createSelector(
  (state: RootState) => state.user,
  item => item,
);
