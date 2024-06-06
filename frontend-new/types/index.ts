// TODO: Импортировать все дочерние типы наружу
// import * as dbTypes from './db'
// export { dbTypes }

export enum EChatRespondent {
  user = "user",
  assistant = "assistant",
}

export interface ChatResponse {
  id: string;
  chat_id: string;
  content: string;
  role: keyof typeof EChatRespondent;
  created_at: string;
  sql?: string; // TODO: Только для теста, убрать (!)
}
