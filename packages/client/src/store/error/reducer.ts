import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState, IError, INotify } from "@/store/error/type";
import { v4 as uuidv4 } from "uuid";

export const errorSlice = createSlice({
  initialState: {} as ErrorState,
  name: "error",
  reducers: {
    setGlobalError: (state, action: PayloadAction<IError>) => {
      state.globalError = {
        error: action.payload.error,
        status: action.payload.status,
      };

      state.hasError = true;
    },
    addNotify: (state, action: PayloadAction<Omit<INotify, "id"> | string>) => {
      const newNotification: INotify =
        typeof action.payload === "string"
          ? { id: uuidv4(), message: action.payload, status: "warning" }
          : { ...action.payload, id: uuidv4() };

      state.notifyError = [...(state.notifyError || []), newNotification];
      state.hasError = true;
    },
    removeNotify: (state, action: PayloadAction<string>) => {
      state.notifyError = state.notifyError?.filter(
        notify => notify.id !== action.payload,
      );
      state.hasError = !(state.notifyError && state.notifyError.length > 0);
    },
    resetError: state => {
      state.globalError = undefined;
      state.notifyError = undefined;
      state.hasError = false;
    },
  },
});
