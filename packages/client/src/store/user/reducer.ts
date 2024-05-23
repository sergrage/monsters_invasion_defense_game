import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./type";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
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
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
