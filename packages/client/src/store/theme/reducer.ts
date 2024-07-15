import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITheme, ThemeState, TTheme } from "./type";
import { RootState } from "..";
import { getLeadersThunk } from "@/store/leaderboard/actions";
import { getThemeThunk, setThemeThunk } from "@/store/theme/actions";

const initialState: ThemeState = {
  data: {} as ITheme,
  loading: false,
};

export const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.data.theme_type = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getThemeThunk.pending, state => {
      state.loading = true;
    });

    builder.addCase(getThemeThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(getThemeThunk.rejected, state => {
      state.loading = false;
    });

    builder.addCase(setThemeThunk.pending, state => {
      state.loading = true;
    });

    builder.addCase(setThemeThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.data.theme_type = action.payload.theme_type;
      }
      state.loading = false;
    });
    builder.addCase(setThemeThunk.rejected, state => {
      state.loading = false;
    });
  },
});

export const getThemeState = (state: RootState) => state.theme;
