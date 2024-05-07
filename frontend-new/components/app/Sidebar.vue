<script setup lang="ts">
import { format, parse } from '@formkit/tempo'

// import type { Playlist } from '../data/playlists'
// import { cn } from '@/lib/utils'

// import { Button } from '@/components/ui/button'
// import { ScrollArea } from '@/components/ui/scroll-area'

// interface SidebarProps {
//   playlists: Playlist[]
// }

// defineProps<SidebarProps>()

interface ChatItem {
  id: string
  metadata: null
  created_at: string
  title: string
}

const route = useRoute()
const router = useRouter()

const { data: chats, pending: isChatsPending } = await useFetch<ChatItem[]>('/api/v1/chats')
// const { data: chats, pending: isChatsPending } = await useFetch('/api/mock/chats')
</script>

<template>
  <ScrollArea class="flex-1 p-3">
    <div class="text-xl">
      Чаты
    </div>
    <div class="flex flex-col gap-1">
      <NuxtLink
        v-for="item in chats"
        :key="item.id"
        v-slot="{ href, navigate, isActive }"
        :to="{name: 'chats-id', params: { id: item.id }}"
        custom
      >
        <a
          :href="href"
          class="flex flex-col border rounded-md px-2 py-1"
          :class="{
            'bg-primary text-primary-foreground': isActive
          }"
          @click="navigate"
        >
          <div class="line-clamp-1 break-all">
            {{ item.title || 'Без имени' }}
          </div>
          <div class="text-xs text-muted-foreground">
            {{ format(parse(item.created_at), "DD.MM.YYYY в HH:mm") }}
          </div>
        </a>
      </NuxtLink>
    </div>
    <hr class="divider">
  </ScrollArea>

  <div class="flex-none p-3 mt-auto w-full flex flex-col gap-2">
    <NuxtLink :to="{ name: 'finetune'}">
      <Button class="w-full flex gap-2">
        <IconWrench class="w-4 h-4" />
        Уточнить модель
      </Button>
    </NuxtLink>
    <NuxtLink :to="{name: 'databases'}">
      <Button class="w-full flex gap-2">
        <IconDatabase class="w-4 h-4" />
        Настройки подключений
      </Button>
    </NuxtLink>
  </div>
  <AppFooter class="flex-none mt-auto border-t" />

  <!-- <div class="flex flex-col">
    <ScrollArea class="flex-1 px-1">
      <div class="space-y-4 py-4">
        <div class="px-3 py-2">
          <h2 class="mb-2 text-lg font-semibold tracking-tight">
            Базы данных
          </h2>
          <div class="space-y-1">
            <Button variant="secondary" class="w-full justify-start">
              Самокат Прод
            </Button>
            <Button variant="secondary" class="w-full justify-start">
              Самокат Тест
            </Button>
            <Button variant="secondary" class="w-full justify-start">
              Btn Text
            </Button>
            <NuxtLink to="/onboarding">
              <Button variant="link" class="w-full justify-start">
                Добавить
              </Button>
            </NuxtLink>
          </div>
        </div>

        <div class="px-3 py-2">
          <h2 class="mb-2 text-lg font-semibold tracking-tight flex flex-row gap-1">
            <IconStar :size="20" />
            <span>Избранное</span>
          </h2>
          <div class="space-y-1">
            <Button v-for="(item, idx) in Array.from(Array(15).keys())" :key="idx" variant="secondary" class="w-full justify-start">
              Btn Text
            </Button>
            <Button variant="secondary" class="w-full justify-start">
              Btn Text
            </Button>
            <Button variant="secondary" class="w-full justify-start">
              Btn Text
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>

    <AppFooter class="flex-none mt-auto bg-green-200" />
  </div> -->
</template>
