// TODO: Импортировать все дочерние типы наружу
// import * as dbTypes from './db'
// export { dbTypes }

export enum EChatRespondent {
  user = "user",
  assistant = "assistant",
}

export enum EChatAssistantMessageType {
  thought = "thought",
  observation = "observation",
  info = "info",
  error = "error",
  final_answer = "final_answer",
  user_input = "user_input",
}

export interface Message {
  // id of message itself
  id: string;
  chat_id: string;
  role: keyof typeof EChatRespondent;
  content: string;
  content_type: "text" | "image" | "video" | "audio" | "file" | "chart";
  assistant_message_type: keyof typeof EChatAssistantMessageType;
  created_at: string;
}

export interface ChatsResponse {
  id: string;
  metadata: Record<any, any> | null;
  created_at: string;
  title: string;
}

export interface ChatPageProps {
  messages: Message[] | null;
  chatId: string;
}
