import type { ChatResponse } from "~/types/index";

export interface ChatItem {
  id: string;
  metadata: null;
  created_at: string;
  title: string;
}

export interface ChatPageProps {
  messages: ChatResponse[] | null;
  chatId: string;
}
