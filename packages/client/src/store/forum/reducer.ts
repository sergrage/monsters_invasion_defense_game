import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TForumMessage, TForumState, TForumThread } from "./type";
import {
  postforumMessageThunk,
  postforumThreadThunk,
  getforumAllThreadsThunk,
  deleteforumMessageThunk,
} from "./actions";

const initialState: TForumState = {
  forumThreads: [],
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
              if (!forumItem.forum_messages) {
                forumItem.forum_messages = [];
              }
              forumItem.forum_messages.push(action.payload);
            } else {
              console.error("Нет треда с таким id:", action.payload.thread_id);
            }
          }
        },
      )
      .addCase(
        deleteforumMessageThunk.fulfilled,
        (state, action: PayloadAction<{ message_id: number }>) => {
          state.forumThreads?.forEach(thread => {
            thread.forum_messages = thread.forum_messages.filter(
              message => message.id !== action.payload.message_id,
            );
          });
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
