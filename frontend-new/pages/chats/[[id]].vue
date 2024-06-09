<script setup lang="ts">
import { useGlobalChats } from "~/stores/useGlobalChats";

const route = useRoute();

const chatStore = useGlobalChats();

await chatStore.fetchMessagesForChat(route.params.id);
console.log("render");
</script>

<template>
  <PlaygroundChat :chat-id="route.params.id" />
</template>
