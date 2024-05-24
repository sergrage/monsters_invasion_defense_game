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
  name: "auth",
  initialState,

  reducers: {
    logIn: state => {
      state.isAuth = true;
    },

    logOut: state => {
      state.isAuth = false;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    changeAvatar(state, action) {
      state.user!.avatar = action.payload;
    },

    clearUser(state) {
      state.user = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logInThunk.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(logOutThunk.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(changeAvatarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user!.avatar = action.payload.avatar;
      })

      .addMatcher(
        action => action.type.endsWith("/pending"),
        state => {
          state.isLoading = true;
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

export const getUserThunk: any = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = await apiFetch({
      url: `${authUrl}/user`,
    });

    return response;
  } catch (e: any) {
    console.error(e);
  }
});

export const logInThunk: any = createAsyncThunk(
  "auth/logIn",
  async (body: { login: string; password: string }, { dispatch }) => {
    try {
      await apiFetch({
        url: `${authUrl}/signin`,
        method: "POST",
        body,
      });

      await dispatch(getUserThunk());
    } catch (e: any) {
      console.error(e);
    }
  },
);

export const logOutThunk: any = createAsyncThunk("auth/logOut", async () => {
  try {
    await apiFetch({
      url: `${authUrl}/logout`,
      method: "POST",
    });
  } catch (e: any) {
    console.error(e);
  }
});

export const signUpThunk: any = createAsyncThunk(
  "auth/signUp",
  async (
    body: {
      login: string;
      password: string;
      first_name: string;
      second_name: string;
      email: string;
      phone: string;
    },
    { dispatch },
  ) => {
    try {
      await apiFetch({
        url: `${authUrl}/signup`,
        method: "POST",
        body,
      });

      await dispatch(getUserThunk());
    } catch (e: any) {
      console.error(e);
    }
  },
);

export const changeAvatarThunk: any = createAsyncThunk(
  "auth/profile/avatar",
  async (body: FormData, { dispatch }) => {
    try {
      const response = await apiFetch({
        url: `${userUrl}/profile/avatar`,
        method: "PUT",
        body,
      });

      return response;
    } catch (e: any) {
      console.error(e);
    }
  },
);

export const authActions = userSlice.actions;
export default userSlice.reducer;
