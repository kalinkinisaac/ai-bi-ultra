// TODO: Импортировать все дочерние типы наружу
// import * as dbTypes from './db'
// export { dbTypes }

export enum EChatRespondent {
  user = "user",
  assistant = "ai",
}

export interface ChatResponse {
  // id: string;
  chat_id: string;
  data: string;
  role: keyof typeof EChatRespondent;
  created_at: string;
  type:
    | "thought"
    | "observation"
    | "info"
    | "error"
    | "final_answer"
    | "user_input";
  data_type: "text" | "image" | "video" | "audio" | "file";
}

export interface ChatPageProps {
  messages: ChatResponse[] | null;
  chatId: string;
}
