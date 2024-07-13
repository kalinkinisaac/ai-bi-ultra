<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorMode = useColorMode();
</script>

<template>
  <div>
    <NuxtLink :to="{ name: 'index'}">
      <div class="font-bold text-xl">
        Aibi
      </div>
    </NuxtLink>
  </div>
</template>
