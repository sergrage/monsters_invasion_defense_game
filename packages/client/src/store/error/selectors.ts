import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const getErrorState = createSelector(
  (state: RootState) => state.error,
  item => item,
);
