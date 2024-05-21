import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
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
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
