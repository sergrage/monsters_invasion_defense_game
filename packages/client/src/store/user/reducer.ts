import { createSlice } from "@reduxjs/toolkit";

import { TResponse, TUser, TUserState } from "./type";
import { changeAvatarThunk, getUserThunk, logOutThunk } from "./actions";

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload as TUser;
      })
      .addCase(logOutThunk.fulfilled, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(changeAvatarThunk.fulfilled, (state, action) => {
        state.user!.avatar = (action.payload as TResponse).avatar;
      })

      .addMatcher(
        action => action.type.endsWith("/pending"),
        state => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        action => action.type.endsWith("/fulfilled"),
        state => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        action => action.type.endsWith("/rejected"),
        state => {
          state.isLoading = false;
        },
      );
  },
});

export const authActions = userSlice.actions;
export default userSlice.reducer;
