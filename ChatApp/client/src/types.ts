export type UserInfo = {
  id: number;
  username: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type Message = {
  id: number;
  text: string;
  author: UserInfo;
  createdAt: Date;
};

export type CreateMessageParams = {
  authorId: number;
  text: string;
};

export type FetchMessagePayload = {
  messages: Message[];
};
