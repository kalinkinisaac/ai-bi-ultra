<script setup lang="ts">
import { useGlobalChats } from "~/stores/useGlobalChats";

const { chats, isChatsLoading, addTempChat } = useGlobalChats();

const latestChatId = computed<string>(() => {
  return chats;
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-4xl text-gray-700">Welcome to our application!</h1>
    <p class="text-xl text-gray-500">This is a simple welcome page.</p>
    <div class="flex justify-center gap-4 mt-4">
      <NuxtLink
        :to="{
          name: 'chats-id',
          params: { id: latestChatId },
        }"
      >
        <Button>Go to latest chat</Button>
      </NuxtLink>
      <NuxtLink
        :to="{
          name: 'chats-id',
        }"
        @click="addTempChat"
      >
        <Button>New chat</Button>
      </NuxtLink>
    </div>
  </div>
</template>
