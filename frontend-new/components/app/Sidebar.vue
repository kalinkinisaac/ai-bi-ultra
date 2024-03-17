<script setup lang="ts">
// import type { Playlist } from '../data/playlists'
// import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// interface SidebarProps {
//   playlists: Playlist[]
// }

// defineProps<SidebarProps>()
</script>

<template>
  <div class="flex flex-col max-h-screen">
    <ScrollArea class=" px-1">
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
            <Button v-for="(item, idx) in Array.from(Array(5).keys())" :key="idx" variant="secondary" class="w-full justify-start">
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

        <!-- <div class="py-2">
          <h2 class="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
        </div> -->
      </div>
    </ScrollArea>

    <AppFooter class="flex-none mt-auto bg-green-200" />
  </div>
</template>
