import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

import apiFetch from "@/utils/apiFetch";
import { allThreadsUrl, messagesUrl } from "@/endpoints/apiUrl";
import { errorSlice } from "../error/reducer";
import { TForumMessage, TForumMessageReply, TForumThread } from "./type";

export const getforumAllThreadsThunk: AsyncThunk<
  TForumThread[],
  void,
  AsyncThunkConfig
> = createAsyncThunk(
  "forum/getforumThread",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: allThreadsUrl,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const postforumThreadThunk: AsyncThunk<
  TForumThread,
  { title: string; login: string },
  AsyncThunkConfig
> = createAsyncThunk(
  "forum/postforumThread",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: allThreadsUrl,
        method: "POST",
        body,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const getforumMessageReplyThunk: AsyncThunk<
  TForumMessageReply,
  void,
  AsyncThunkConfig
> = createAsyncThunk(
  "forum/getforumMessage",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: allThreadsUrl,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const postforumMessageThunk: AsyncThunk<
  TForumMessage,
  { thread_id: number; login: string; text: string },
  AsyncThunkConfig
> = createAsyncThunk(
  "forum/postforumMessage",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: messagesUrl,
        method: "POST",
        body,
      });

      return response;
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteforumMessageThunk: AsyncThunk<
  { message_id: number },
  { id: number },
  AsyncThunkConfig
> = createAsyncThunk(
  "forum/deleteforumMessage",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiFetch({
        url: `${messagesUrl}/${body.id}`,
        method: "DELETE",
      });

      return { message_id: body.id };
    } catch (error) {
      const errorMessage = (error as Error).message;

      dispatch(errorSlice.actions.addNotify(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
