import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiFetch from "@/utils/apiFetch";
import { authUrl } from "@/endpoints/apiUrl";

const initialState = {
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logIn: state => {
      state.isAuth = true;
    },

    logOut: state => {
      state.isAuth = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(logIn.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = false;
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

export const getUser: any = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = apiFetch({
      url: `${authUrl}/user`,
    });

    return response; // will update user state
  } catch (e: any) {
    console.error(e);
  }
});

export const logIn: any = createAsyncThunk(
  "auth/logIn",
  async (body: { login: string; password: string }) => {
    try {
      apiFetch({
        url: `${authUrl}/signin`,
        method: "POST",
        body,
      });

      getUser();
    } catch (e: any) {
      console.error(e);
    }
  },
);

export const logOut: any = createAsyncThunk("auth/logOut", async () => {
  try {
    apiFetch({
      url: `${authUrl}/logout`,
      method: "POST",
    });
  } catch (e: any) {
    console.error(e);
  }
});

export const signUp: any = createAsyncThunk(
  "auth/signUp",
  async (body: {
    login: string;
    password: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
  }) => {
    try {
      apiFetch({
        url: `${authUrl}/signup`,
        method: "POST",
        body,
      });

      getUser();
    } catch (e: any) {
      console.error(e);
    }
  },
);

export const authActions = authSlice.actions;
export default authSlice.reducer;
