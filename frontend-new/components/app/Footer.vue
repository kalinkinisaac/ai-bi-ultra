<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <div class="px-4 py-2">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" class="flex flex-row gap-2 justify-start" size="lg">
          <Avatar class="w-8 h-8">
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div class="flex flex-col items-start">
            <div class="font-bold">Kirill Fedichkin</div>
            <div class="text-xs opacity-60">afesoo@gmail.com</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Мой план</DropdownMenuItem>
        <DropdownMenuItem>Базы данных</DropdownMenuItem>
        <DropdownMenuItem>Организации</DropdownMenuItem>
        <DropdownMenuItem>Настройки</DropdownMenuItem>
        <DropdownMenuItem>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
</template>
