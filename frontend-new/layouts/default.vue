<script setup lang="ts">
// import { ScrollArea } from '@/components/ui/scroll-area'

import { Toaster } from "@/components/ui/toast";

// TOOD: Вынести в useUiStore()
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

const colorMode = useColorMode();
const changeTheme = () => {
  switch (colorMode.preference) {
    case "system":
      colorMode.preference = "dark";
      break;
    case "dark":
      colorMode.preference = "light";
      break;
    case "light":
      colorMode.preference = "system";
      break;
  }
};
</script>

<template>
  <div :class="{'fixed overflow-hidden': isMenuOpen}">
    <div class="w-full flex flex-col gap-4">
      <div
        class="fixed flex flex-col md:hidden z-50 w-full max-h-screen bg-background"
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
              @click="changeTheme"
            >
              <IconMoon v-if="colorMode.preference === 'dark'" />
              <IconSun v-else-if="colorMode.preference === 'light'" />
              <IconLaptopMinimal v-else />
              <span class="sr-only">Toggle theme</span>
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

      <div class="flex flex-row gap-6 h-screen max-h-screen w-full overflow-hidden">
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
        <div class="flex-1 flex mt-16 md:mt-0 w-full">
          <main class="grid flex-1 gap-4 overflow-auto relative z-30">
            <ScrollArea class="overflow-hidden flex-1">
              <slot />
            </ScrollArea>
          </main>
        </div>
      </div>
      <Toaster class="bg-green-500" />
    </div>
  </div>
</template>
