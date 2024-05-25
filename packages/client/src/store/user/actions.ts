import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

import apiFetch from "@/utils/apiFetch";
import { authUrl, userUrl } from "@/endpoints/apiUrl";
import { errorSlice } from "../error/reducer";

import { TLogIn, TPassword, TResponse, TSignUp } from "./type";

export const getUserThunk: AsyncThunk<
  TResponse | string,
  void,
  AsyncThunkConfig
> = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: `${authUrl}/user`,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const logInThunk: AsyncThunk<undefined, TLogIn, AsyncThunkConfig> =
  createAsyncThunk(
    "user/logIn",
    async (body, { dispatch, rejectWithValue }) => {
      try {
        await apiFetch({
          url: `${authUrl}/signin`,
          method: "POST",
          body,
        });

        await dispatch(getUserThunk());
      } catch (error) {
        const errorMessage = (error as Error).message;

        dispatch(errorSlice.actions.addNotify(errorMessage));
        return rejectWithValue(errorMessage);
      }
    },
  );

export const logOutThunk: AsyncThunk<undefined, void, AsyncThunkConfig> =
  createAsyncThunk("user/logOut", async (_, { dispatch, rejectWithValue }) => {
    try {
      await apiFetch({
        url: `${authUrl}/logout`,
        method: "POST",
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  });

export const signUpThunk: AsyncThunk<undefined, TSignUp, AsyncThunkConfig> =
  createAsyncThunk(
    "user/signUp",
    async (body, { dispatch, rejectWithValue }) => {
      try {
        await apiFetch({
          url: `${authUrl}/signup`,
          method: "POST",
          body,
        });

        await dispatch(getUserThunk());
      } catch (error) {
        const errorMessage = (error as Error).message;

        dispatch(errorSlice.actions.addNotify(errorMessage));
        return rejectWithValue(errorMessage);
      }
    },
  );

export const changePassThunk: AsyncThunk<
  undefined,
  TPassword,
  AsyncThunkConfig
> = createAsyncThunk(
  "user/password",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      await apiFetch({
        url: `${userUrl}/password`,
        method: "PUT",
        body,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const changeAvatarThunk: AsyncThunk<
  TResponse | string,
  FormData,
  AsyncThunkConfig
> = createAsyncThunk(
  "user/avatar",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: `${userUrl}/profile/avatar`,
        method: "PUT",
        body,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
