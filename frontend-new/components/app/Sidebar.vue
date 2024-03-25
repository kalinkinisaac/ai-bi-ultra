<script setup lang="ts">
// import type { Playlist } from '../data/playlists'
// import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

// interface SidebarProps {
//   playlists: Playlist[]
// }

// defineProps<SidebarProps>()

</script>

<template>
  <ScrollArea class="flex-1 p-3">
    <div class="text-xl" />
    <div class="text-xl">
      Чаты
    </div>
    <div
      v-for="(item, idx) in Array.from(Array(20).keys())"
      :key="idx"
    >
      sidebar {{ idx }}
    </div>

    <hr class="divider">
  </ScrollArea>

  <div class="flex-none p-3 mt-auto w-full flex flex-col gap-2">
    <NuxtLink :to="{ name: 'finetune'}">
      <Button class="w-full">
        Уточнить модель
      </Button>
    </NuxtLink>
    <NuxtLink :to="{name: 'databases'}">
      <Button class="w-full">
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
