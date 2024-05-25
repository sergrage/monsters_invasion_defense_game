import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiFetch from "@/utils/apiFetch";
import { authUrl, userUrl } from "@/endpoints/apiUrl";

import { UserState } from "./types";

const initialState: UserState = {
  isAuth: false,
  user: null,
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
        state.user = action.payload;
      })
      .addCase(logOutThunk.fulfilled, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(changeAvatarThunk.fulfilled, (state, action) => {
        state.user!.avatar = action.payload.avatar;
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

export const getUserThunk: any = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: `${authUrl}/user`,
      });

      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logInThunk: any = createAsyncThunk(
  "user/logIn",
  async (
    body: { login: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await apiFetch({
        url: `${authUrl}/signin`,
        method: "POST",
        body,
      });

      await dispatch(getUserThunk());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logOutThunk: any = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await apiFetch({
        url: `${authUrl}/logout`,
        method: "POST",
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const signUpThunk: any = createAsyncThunk(
  "user/signUp",
  async (
    body: {
      login: string;
      password: string;
      first_name: string;
      second_name: string;
      email: string;
      phone: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await apiFetch({
        url: `${authUrl}/signup`,
        method: "POST",
        body,
      });

      await dispatch(getUserThunk());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const changePassThunk: any = createAsyncThunk(
  "user/password",
  async (
    body: { oldPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      await apiFetch({
        url: `${userUrl}/password`,
        method: "PUT",
        body,
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const changeAvatarThunk: any = createAsyncThunk(
  "user/avatar",
  async (body: FormData, { rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: `${userUrl}/profile/avatar`,
        method: "PUT",
        body,
      });

      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authActions = userSlice.actions;
export default userSlice.reducer;
