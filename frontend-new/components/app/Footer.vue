<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <div class="p-3">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          class="flex flex-row gap-2 justify-start"
          size="lg"
        >
          <Avatar class="w-8 h-8">
            <AvatarImage
              src="https://commons.wikimedia.org/wiki/File:Sample_User_Icon.png"
              alt="@radix-vue"
            />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div class="flex flex-col items-start">
            <div class="font-bold">Kirill Ivanov</div>
            <div class="text-xs opacity-60">kivanov@aibi.su</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Мой план</DropdownMenuItem>
        <DropdownMenuItem>Базы данных</DropdownMenuItem>
        <DropdownMenuItem>Организации</DropdownMenuItem>
        <DropdownMenuItem> Настройки </DropdownMenuItem>
        <DropdownMenuItem>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
