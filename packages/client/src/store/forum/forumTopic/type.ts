interface User {
  name: string;
  avatar: string;
}

export interface ForumTopicMessageProps {
  item: {
    id: number;
    date: string;
    user: User;
    message: string;
  };
}
