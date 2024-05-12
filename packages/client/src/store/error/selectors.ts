import { createSelector } from "reselect";
import { ApplicationStore } from "@/store";

export const getErrorState = createSelector(
  (state: ApplicationStore) => state.error,
  item => item,
);
