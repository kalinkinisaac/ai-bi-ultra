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

export interface ChatResponse {
  // id: string;
  chat_id: string;
  content: string | ApexCharts.ApexOptions;
  role: keyof typeof EChatRespondent;
  created_at?: string;
  assistant_message_type: keyof typeof EChatAssistantMessageType;
  content_type: "text" | "image" | "video" | "audio" | "file" | "chart";
}

export interface ChatPageProps {
  messages: ChatResponse[] | null;
  chatId: string;
}
