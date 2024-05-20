import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  message: null,
  isLoading: false,
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },

    setMessage(state, action) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = null;
    },

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
