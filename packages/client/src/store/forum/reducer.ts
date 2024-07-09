import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TForumMessage,
  TForumMessageReply,
  TForumState,
  TForumThread,
} from "./type";
import {
  getforumMessageReplyThunk,
  postforumMessageThunk,
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
      .addCase(
        postforumMessageThunk.fulfilled,
        (state, action: PayloadAction<TForumMessage | null>) => {
          if (action.payload) {
            const forumItem = state.forumThreads?.find(
              item => item.id === action.payload?.thread_id,
            );
            if (forumItem) {
              forumItem.forum_messages.push(action.payload);
            } else {
              console.error("Нет треда с таким id:", action.payload.thread_id);
            }
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
