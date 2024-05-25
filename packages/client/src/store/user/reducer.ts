import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiFetch from "@/utils/apiFetch";
import { authUrl, userUrl } from "@/endpoints/apiUrl";

import {
  TLogIn,
  TPassword,
  TResponse,
  TSignUp,
  TUser,
  TUserState,
} from "./types";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

const initialState: TUserState = {
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

export const getUserThunk: AsyncThunk<
  TResponse | string,
  void,
  AsyncThunkConfig
> = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await apiFetch({
      url: `${authUrl}/user`,
    });

    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
        return rejectWithValue((error as Error).message);
      }
    },
  );

export const logOutThunk: AsyncThunk<undefined, void, AsyncThunkConfig> =
  createAsyncThunk("user/logOut", async (_, { rejectWithValue }) => {
    try {
      await apiFetch({
        url: `${authUrl}/logout`,
        method: "POST",
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
        return rejectWithValue((error as Error).message);
      }
    },
  );

export const changePassThunk: AsyncThunk<
  undefined,
  TPassword,
  AsyncThunkConfig
> = createAsyncThunk("user/password", async (body, { rejectWithValue }) => {
  try {
    await apiFetch({
      url: `${userUrl}/password`,
      method: "PUT",
      body,
    });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const changeAvatarThunk: AsyncThunk<
  TResponse | string,
  FormData,
  AsyncThunkConfig
> = createAsyncThunk("user/avatar", async (body, { rejectWithValue }) => {
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
});

export const authActions = userSlice.actions;
export default userSlice.reducer;
