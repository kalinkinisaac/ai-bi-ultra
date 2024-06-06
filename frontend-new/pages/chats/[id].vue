<script setup lang="ts">
import { type ChatResponse } from "@/types";

import { format } from "@formkit/tempo";
import type { MessageContent } from "deep-chat/dist/types/messages";

const route = useRoute();

const query = ref("");

const { data: messages, pending } = await useFetch<ChatResponse[]>("/api/v1/chat_messages", {
  params: {
    chat_id: route.params.id,
  },
  transform: (data): MessageContent => {
    return data.map((message: ChatResponse) => {
      return {
        ...message,
        text: message.content,
      };
    });
  },
});

const onSubmit = async () => {
  const newMessage: ChatResponse = {
    id: "",
    chat_id: String(route.params.id),
    content: query.value,
    role: "user",
    created_at: format(new Date(), "YYYY-MM-DDTHH:mm:ssZ"), // 2024-04-16T20:54:11+0300
  };
  messages.value?.push(newMessage);
  query.value = "";
};

console.log(messages.value.forEach((m) => console.log(m)));
</script>

<template>
  <div>
    <PlaygroundChat
      v-model="query"
      :messages
      :chat-id="String(route.params.id)"
      @submit="onSubmit"
    >
      <!--      chat id {{ route.params.id }}-->
      <!--      <pre>pending</pre>-->
      <!--      <pre>{{ pending }}</pre>-->
      <!--      <pre>data</pre>-->
      <!--      <pre>{{ messages }}</pre>-->
    </PlaygroundChat>
  </div>
</template>
