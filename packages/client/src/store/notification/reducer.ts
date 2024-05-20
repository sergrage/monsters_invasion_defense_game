import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const notifyActions = notifySlice.actions;
export default notifySlice.reducer;
