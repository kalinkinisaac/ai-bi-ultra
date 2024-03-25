<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'

// TOOD: Вынести в useUiStore()
const isMenuOpen = ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

</script>

<template>
  <div :class="{'fixed overflow-hidden': isMenuOpen}">
    <div class="w-full flex flex-col gap-4">
      <div
        class="fixed flex flex-col md:hidden z-10 w-full max-h-screen bg-background"
        :class="{'h-screen': isMenuOpen}"
      >
        <div class="flex-none flex flex-row justify-between items-center p-3 border-b w-full">
          <AppHeader />
          <div class="flex flex-row gap-2">
            <Button
              variant="outline"
              size="icon"
              @click="navigateTo({name: 'index'})"
            >
              <IconPencilLine />
            </Button>
            <Button
              variant="outline"
              size="icon"
              @click="toggleMenu"
            >
              <IconMenu v-if="!isMenuOpen" />
              <IconX v-else />
            </Button>
          </div>
        </div>

        <template v-if="isMenuOpen">
          <AppSidebar />
        </template>
      </div>

      <div class="flex flex-row gap-6 h-screen max-h-screen overflow-hidden">
        <div class="hidden md:flex flex-none flex-col w-[300px] border-r">
          <div class="flex-none flex flex-row justify-between items-center p-3 border-b w-full">
            <AppHeader />
            <div class="flex flex-row gap-2">
              <Button
                variant="outline"
                size="icon"
                @click="navigateTo({name: 'index'})"
              >
                <IconPencilLine />
              </Button>
            </div>
          </div>

          <AppSidebar />
        </div>
        <div class="flex-1 flex p-4 mt-16 md:mt-0">
          <!-- <ScrollArea class="overflow-hidden flex-1 p-3"> -->
          <slot />
          <!-- </ScrollArea> -->
        </div>
      </div>
    </div>
  </div>
</template>
