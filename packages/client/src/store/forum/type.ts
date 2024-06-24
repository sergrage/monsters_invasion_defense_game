export type TForumState = {
  forumThreads: null | TForumThread[];
  forumMessage: null | TForumMessage;
  forumMessageReply: null | TForumMessageReply;
  isLoading: boolean;
};

export type TForumThread = {
  id: number;
  title: string;
  views: number;
  created_by: number;
};

export type TForumMessage = {
  id: number;
  text: string;
  thread_id: number;
  created_by: number;
};

export type TForumMessageReply = {
  id: number;
  text: string;
  message_id: number;
  created_by: number;
};
