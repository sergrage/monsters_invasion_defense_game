import { createSlice } from "@reduxjs/toolkit";

type UserState = {};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
});

export const userReducer = userSlice.reducer;
