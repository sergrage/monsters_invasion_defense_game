import { TForumThread } from "../type";

interface User {
  name: string;
  avatar: string;
}

export interface ForumTopicMessageProps {
  item: TForumThread;
}
