export type TForumState = {
  forumThreads: null | TForumThread[];
  forumMessage: null | TForumMessage;
  forumMessageReply: null | TForumMessageReply;
  isLoading: boolean;
};

export type TForumThread = {
  id: number;
  login: string;
  title: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  forum_messages: TForumMessage[];
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
