import { createAsyncThunk } from "@reduxjs/toolkit";

import apiFetch from "@/utils/apiFetch";
import { addLeadersUrl, getLeadersUrl } from "@/endpoints/apiUrl";
import { errorSlice } from "@/store/error/reducer";

const TEAMNAME = "defense_game_crew";
export const getLeadersThunk = createAsyncThunk(
  "leaders/getLeaders",
  async (_, { dispatch }) => {
    try {
      const data = {
        ratingFieldName: "kills",
        cursor: 0,
        limit: 100, // TODO добавить пагинацию
      };
      return await apiFetch({
        url: `${getLeadersUrl}`,
        body: data,
        method: "POST",
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
    }
  },
);

export const addLeaderThunk = createAsyncThunk(
  "leaders/addLeader",
  async (body: any, { dispatch }) => {
    try {
      const data = {
        data: body,
        ratingFieldName: "kills",
        teamName: TEAMNAME,
      };

      return await apiFetch({
        url: `${addLeadersUrl}`,
        body: data,
        method: "POST",
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
    }
  },
);
