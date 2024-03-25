<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { ScrollArea } from '@/components/ui/scroll-area'
// const form = ref({
//   database: '',
// })
</script>

<template>
  <main class="grid flex-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
    <div class="relative hidden flex-col items-start gap-8 md:flex">
      <form class="grid w-full items-start gap-6">
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">
            Настройки
          </legend>
          <div class="grid gap-3">
            <Label for="model">Model</Label>
            <Select>
              <SelectTrigger
                id="model"
                class="[&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genesis">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <IconRabbit class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground">
                          Genesis
                        </span>
                      </p>
                      <!-- <p
                        class="text-xs"
                        data-description
                      >
                        Our fastest model for general use cases.
                      </p> -->
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="explorer">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <IconBird class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground">
                          Explorer
                        </span>
                      </p>
                      <!-- <p
                        class="text-xs"
                        data-description
                      >
                        Performance and speed for efficiency.
                      </p> -->
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="quantum">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <IconTurtle class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground">
                          Quantum
                        </span>
                      </p>
                      <!-- <p
                        class="text-xs"
                        data-description
                      >
                        The most powerful model for complex computations.
                      </p> -->
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-3">
            <Label for="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="0.4"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-3">
              <Label for="top-p">Top P</Label>
              <Input
                id="top-p"
                type="number"
                placeholder="0.7"
              />
            </div>
            <div class="grid gap-3">
              <Label for="top-k">Top K</Label>
              <Input
                id="top-k"
                type="number"
                placeholder="0.0"
              />
            </div>
          </div>
        </fieldset>
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">
            Messages
          </legend>
          <div class="grid gap-3">
            <Label for="role">Role</Label>
            <Select default-value="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  System
                </SelectItem>
                <SelectItem value="user">
                  User
                </SelectItem>
                <SelectItem value="assistant">
                  Assistant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-3">
            <Label for="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              class="min-h-[9.5rem]"
            />
          </div>
        </fieldset>
      </form>
    </div>
    <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/20 p-4 lg:col-span-2">
      <Badge
        variant="outline"
        class="absolute right-4 top-3"
      >
        Вывод
      </Badge>
      <div class="flex-1 flex w-full items-end pb-3 pt-8">
        <ScrollArea class="w-full">
          <div class="flex flex-col gap-3 w-full">
            <div class="bg-muted/30 p-4 rounded-md rounded-bl-none text-sm self-end">
              <span class="font-bold">Я:</span> Сколько заказов надо еще сделать чтобы накопить на крутой скутер?!
            </div>
            <div class="bg-foreground text-primary-foreground p-4 rounded-md rounded-bl-none text-sm self-start">
              <span class="font-bold">Батя:</span> Иди уроки делай, чел..
            </div>
            <div class="bg-muted/30 p-4 rounded-md rounded-bl-none text-sm self-end">
              <span class="font-bold">Я:</span> Пон, а я думал мы друзя
            </div>
            <div class="bg-foreground text-primary-foreground p-4 rounded-md rounded-bl-none text-sm self-start">
              <span class="font-bold">Батя:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum harum
              quam vitae laboriosam adipisci, voluptate nulla unde soluta odit odio sint, quas consectetur voluptas cum
              eaque ipsa enim eius accusamus!
              <div>
                <code>тут будет SQL в виде кода окей?</code>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <form class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label
          for="message"
          class="sr-only"
        >
          Запрос
        </Label>
        <Textarea
          id="message"
          placeholder="Введите ваш запрос..."
          class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div class="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <IconPaperclip class="size-4" />
                  <span class="sr-only">Прикрепить файл</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Прикрепить файл</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="submit"
            size="sm"
            class="ml-auto gap-1.5"
          >
            Отправить
            <IconCornerDownLeft class="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  </main>
</template>
