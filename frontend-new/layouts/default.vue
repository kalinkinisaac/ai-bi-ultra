<template>
  <div class="">
    <div class="w-full h-full flex flex-col gap-4">
      <AppHeader class="flex flex-row bg-red-200" />
      <div class="border-t pt-4 flex-1 flex gap-4 w-full">
        <AppSidebar class="max-w-xs flex flex-col" />
        <div class=" border-l pl-4 w-ful">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
