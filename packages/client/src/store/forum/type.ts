export type TForumState = {
  forumThreads: null | TForumThread[];
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
  createdAt: string;
  forum_message_replies: TForumMessage[];
  id: number;
  login: string;
  text: string;
  thread_id: number;
  updatedAt: string;
};

export type TForumMessageReply = {
  id: number;
  text: string;
  message_id: number;
  created_by: number;
};

export interface ForumTopicMessageProps {
  item: {
    forum_messages: TForumMessage[];
  };
}
