import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const getThreadState = createSelector(
  (state: RootState) => state.forum,
  item => item,
);
