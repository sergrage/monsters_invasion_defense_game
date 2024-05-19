import { createSelector } from "reselect";
import { RootState } from "@/store";

export const getErrorState = createSelector(
  (state: RootState) => state.error,
  item => item,
);
