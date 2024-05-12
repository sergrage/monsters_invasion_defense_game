import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState, IError, INotify } from "@/store/error/type";
import * as stream from "stream";

export const errorSlice = createSlice({
  initialState: {} as ErrorState,
  name: "error",
  reducers: {
    setGlobalError: (state, action: PayloadAction<IError>) => {
      state.globalError = {
        errors: action.payload.errors,
        status: action.payload.status,
      };
      state.hasError = true;
    },
    addNotify: (state, action: PayloadAction<INotify | string>) => {
      if (typeof action.payload === "string")
        state.notifyError = [
          ...(state.notifyError || []),
          { message: action.payload, status: "warning" },
        ];
      else state.notifyError = [...(state.notifyError || []), action.payload];
      state.hasError = true;
    },
    removeNotify: (state, action: PayloadAction<number>) => {
      state.notifyError = state.notifyError?.filter(
        (_, index) => index !== action.payload,
      );
      state.hasError = !!state.notifyError?.length || !!state.globalError;
    },
    resetError: state => {
      state.globalError = undefined;
      state.notifyError = undefined;
      state.hasError = false;
    },
  },
});
