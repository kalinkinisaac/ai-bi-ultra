<script setup lang="ts">
import { format, parse } from "@formkit/tempo";
import { useGlobalChats } from "~/stores/useGlobalChats";

interface ChatItem {
  id: string;
  metadata: null;
  created_at: string;
  title: string;
}

const route = useRoute();
const router = useRouter();

const chatStore = useGlobalChats();

const chats = chatStore.chats;
</script>

<template>
  <ScrollArea class="flex-1 p-3">
    <div class="text-xl">Чаты</div>
    <div class="flex flex-col gap-1">
      <NuxtLink
        v-for="[id, item] in chats.entries()"
        :key="id"
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'chats-id', params: { id: id } }"
        custom
      >
        <a
          :href="href"
          class="flex flex-col border rounded-md px-2 py-1"
          :class="{
            'bg-primary text-primary-foreground': isActive,
          }"
          @click="navigate"
        >
          <div class="line-clamp-1 break-all">
            {{ item.title || "Без имени" }}
          </div>
          <div class="text-xs text-muted-foreground" v-if="item.created_at">
            {{ format(parse(item.created_at!), "DD.MM.YYYY в HH:mm") }}
          </div>
        </a>
      </NuxtLink>
    </div>
    <hr class="divider" />
  </ScrollArea>

  <div class="flex-none p-3 mt-auto w-full flex flex-col gap-2">
    <!--    <NuxtLink :to="{ name: 'finetune' }">-->
    <!--      <Button class="w-full flex gap-2">-->
    <!--        <IconWrench class="w-4 h-4" />-->
    <!--        Уточнить модель-->
    <!--      </Button>-->
    <!--    </NuxtLink>-->
    <NuxtLink :to="{ name: 'databases' }">
      <Button class="w-full flex gap-2">
        <IconDatabase class="w-4 h-4" />
        Настройки подключений
      </Button>
    </NuxtLink>
  </div>
  <AppFooter class="flex-none mt-auto border-t" />
</template>
