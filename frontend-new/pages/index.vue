<script setup lang="ts">
import type { ChatResponse } from "@/types";

const prompt = ref({
  query: "",
  connection: "",
});

const onSubmit = async () => {
  // prompt with query
  const res = await $fetch<ChatResponse>("/api/v1/prompts/sql-generations/nl-generations-in-chat", {
    method: "POST",
    body: {
      sql_generation: {
        prompt: {
          text: prompt.value.query,
          db_connection_id: prompt.value.connection,
          metadata: {},
        },
      },
    },
  });
  console.log("res onSubmit", res);
  // TODO: Change check?
  if (res?.chat_id !== undefined) {
    // trigger refresh chats (store)

    // replace to new chat
    navigateTo({
      name: "chats-id",
      params: {
        id: res.chat_id,
      },
    });
  }
};
</script>

<template>
  <PlaygroundChat
    v-model:query="prompt.query"
    v-model:connection="prompt.connection"
    @submit="onSubmit"
  />
</template>
