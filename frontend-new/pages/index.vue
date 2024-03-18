<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
    <div class="flex flex-col">
      <div class="text-xl font-semibold leading-10 mb-4">Создание запроса</div>
      <p><Button>Click me</Button></p>
      <div class="flex flex-col gap-2">
        <div v-for="(item, idx) in Array.from(Array(100).keys())" :key="idx" class="bg-zinc-800 rounded-lg p-3">aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa</div>
      </div>
    </div>
</template>
