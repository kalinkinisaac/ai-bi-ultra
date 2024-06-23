import { defineStore } from "pinia";
import type { Message, ChatsResponse } from "~/types";

interface ChatEntity {
  title: string;
  created_at?: string;
  messages: Message[];
}

export const useGlobalChats = defineStore("chats", {
  state: () => ({
    chats: new Map<string, ChatEntity>(), // Use a Map for easy lookup by chat ID
    isFetching: false,
  }),
  getters: {
    getChatById(state): (id: string) => { messages: Message[] | null } {
      return (id: string) => ({
        messages: state.chats.get(id)?.messages || null,
      });
    },
  },
  actions: {
    async fetchChats() {
      this.isFetching = true;

      try {
        const response = await $fetch<ChatsResponse[]>("/api/v1/chats", {
          retry: 3,
        });
        this.chats = response.reduce((acc, chat) => {
          acc.set(chat.id, {
            title: chat.title,
            created_at: chat.created_at,
            messages: [],
          });
          return acc;
        }, new Map<string, ChatEntity>());
      } catch (error) {
        console.error(error);
      } finally {
        this.isFetching = false;
      }
    },

    async fetchMessagesForChat(chatId: string) {
      this.isFetching = true;
      try {
        const messages = await $fetch<Message[]>(`/api/v1/chat_messages`, {
          query: { chat_id: chatId },
        });
        console.log("got res: ", messages);
        const prevChat = this.chats.get(chatId);
        if (prevChat) {
          this.chats.set(chatId, {
            title: prevChat.title,
            created_at: prevChat.created_at,
            messages: messages,
          });
        } else {
          console.error(`Chat with id ${chatId} not found`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isFetching = false;
      }
    },

    addTempChat() {
      const newId = Date.now().toString();
      this.chats.set(newId, {
        title: "Без названия",
        created_at: new Date(),
        messages: [],
      });
    },

    replaceTempChatId(oldId: string, newId: string) {
      if (this.chats.has(oldId)) {
        const tempData = this.chats.get(oldId);
        this.chats.delete(oldId);
        this.chats.set(newId, tempData);
      }
    },

    addMessageToChat(chatId: string, message: Message) {
      const prevChat = this.chats.get(chatId);
      if (prevChat) {
        this.chats.set(chatId, {
          title: prevChat.title,
          created_at: prevChat.created_at,
          messages: [...prevChat.messages, message],
        });
      } else {
        console.error(`Chat with id ${chatId} not found`);
      }
    },
  },
});
