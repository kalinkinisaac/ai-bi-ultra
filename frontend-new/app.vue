<script setup lang="ts">
import hljs from "highlight.js";

window.hljs = hljs;

declare global {
  interface Window {
    hljs: typeof hljs;
  }
}
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
