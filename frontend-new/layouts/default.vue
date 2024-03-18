  <script setup lang="ts">
  import { ScrollArea } from '@/components/ui/scroll-area';
  const isMenuOpen = ref(false)
  const toggleMenu = () => isMenuOpen.value =  !isMenuOpen.value
  </script>

  <template>
    <div :class="{'fixed overflow-hidden': isMenuOpen}">
      <div class="w-full flex flex-col gap-4">
        <div class="fixed flex flex-col md:hidden z-10 w-full max-h-screen bg-background" :class="{'h-screen': isMenuOpen}">
          <div class="flex-none flex flex-row justify-between items-center p-3 border-b w-full">
            <AppHeader />
            <div class="flex flex-row gap-2">
              <Button variant="outline" size="icon" @click="toggleMenu">
                <IconPencilLine />
              </Button>
              <Button variant="outline" size="icon" @click="toggleMenu">
                <IconMenu v-if="!isMenuOpen" />
                <IconX v-else />
              </Button>
            </div>
          </div>

          <ScrollArea v-if="isMenuOpen" class="flex-1">
            <div v-for="(item, idx) in Array.from(Array(40).keys())" :key="idx">sidebar</div>
          </ScrollArea>

          <AppFooter v-if="isMenuOpen" class="flex-none mt-auto" />
        </div>

        <div class="flex flex-row gap-6 h-screen max-h-screen overflow-hidden">
          <div class="hidden md:flex flex-none flex-col w-[300px] border-r gap-4">
            <div class="flex-none flex flex-row justify-between items-center p-3 border-b w-full">
              <AppHeader />
              <div class="flex flex-row gap-2">
                <Button variant="outline" size="icon" @click="toggleMenu">
                  <IconPencilLine />
                </Button>
              </div>
            </div>

            <ScrollArea class="flex-1">
              <div v-for="(item, idx) in Array.from(Array(40).keys())" :key="idx">sidebar {{ idx }}</div>
            </ScrollArea>

            <AppFooter class="flex-none mt-auto" />
          </div>
          <div class="flex-1 flex mt-16 md:mt-0">
            <ScrollArea class="overflow-hidden flex-1 p-3">
              <slot />
            </ScrollArea>
        </div>
        </div>
      </div>
    </div>
  </template>
