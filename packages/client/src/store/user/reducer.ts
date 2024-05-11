import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./type";

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
});
