import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TForumMessage,
  TForumMessageReply,
  TForumState,
  TForumThread,
} from "./type";
import {
  getforumMessageReplyThunk,
  postforumThreadThunk,
  getforumAllThreadsThunk,
} from "./actions";

const initialState: TForumState = {
  forumThreads: [],
  forumMessage: null,
  forumMessageReply: null,
  isLoading: false,
};

const forumSlice = createSlice({
  name: "forum",
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(
        getforumAllThreadsThunk.fulfilled,
        (state, action: PayloadAction<TForumThread[] | null>) => {
          if (action.payload) {
            state.forumThreads = action.payload;
          }
        },
      )
      .addCase(
        postforumThreadThunk.fulfilled,
        (state, action: PayloadAction<TForumThread | null>) => {
          if (action.payload) {
            state.forumThreads?.push(action.payload);
          }
        },
      )
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

export const forumActions = forumSlice.actions;
export default forumSlice.reducer;
