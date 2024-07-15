import { createAsyncThunk } from "@reduxjs/toolkit";

import apiFetch from "@/utils/apiFetch";
import { getThemeUrl } from "@/endpoints/apiUrl";
import { errorSlice } from "@/store/error/reducer";
import { da } from "date-fns/locale";
import { TTheme } from "@/store/theme/type";

export const getThemeThunk = createAsyncThunk(
  "theme/getTheme",
  async (user_id: string, { dispatch }) => {
    try {
      return await apiFetch({
        url: `${getThemeUrl}/${user_id}`,
        method: "GET",
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
    }
  },
);

export const setThemeThunk = createAsyncThunk(
  "theme/setTheme",
  async (data: { user_id: string; theme_type: TTheme }, { dispatch }) => {
    try {
      const res = await apiFetch({
        url: `${getThemeUrl}/${data.user_id}`,
        method: "PUT",
        body: { theme_type: data.theme_type },
      });
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
    }
  },
);
