<script setup lang="ts">
import { format, parse } from '@formkit/tempo'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { type DatabaseConnectionsResponse } from '@/types/db'

// const { data, pending, error, refresh } = await useFetch('http://localhost:80/api/v1/database-connections')
const { data, refresh } = await useFetch<DatabaseConnectionsResponse[]>('/api/v1/database-connections')
// const { data, refresh } = await useFetch('/api/mock/database-connections')

const isModalCreateOpen = ref(false)
const onCreate = () => {
  isModalCreateOpen.value = true
  console.log('onCreate')
}
</script>

<template>
  <div>
    <div class="relative flex h-full min-h-[50vh] flex-col gap-4 rounded-xl bg-muted/20 p-4 lg:col-span-2">
      <div class="inline-flex gap-2 items-baseline">
        <p class="text-lg font-bold">
          Подключения
        </p>

        <Button
          variant="outline"
          size="icon"
          @click="refresh"
        >
          <IconRefreshCcw class="w-4 h-4" />
        </Button>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Мнимое</CardTitle>
            <CardDescription>Кароче не даете нам инфы</CardDescription>
          </CardHeader>
          <CardContent>
            Можно быстро настроить схемы вашей БД
          </CardContent>
          <CardFooter>
            <Button @click="onCreate">
              Создать
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ваша БД</CardTitle>
            <CardDescription>Более тонкая настройка</CardDescription>
          </CardHeader>
          <CardContent>
            Тонка настройка подключения к БД и схем
          </CardContent>
          <CardFooter>
            <Button>Подключить</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Организация</CardTitle>
            <CardDescription>Полный функционал с ролями и прочим</CardDescription>
          </CardHeader>
          <CardContent>
            Создайте организацию, добавляйте в нее пользователей и роли
          </CardContent>
          <CardFooter>
            <Button disabled>
              Создать организацию
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          v-for="(el, idx) in data"
          :key="idx"
        >
          <CardHeader>
            <CardTitle>{{ el.alias || 'Без имени' }}</CardTitle>
            <CardDescription>Добавлено {{ format(parse(el.created_at), "DD.MM.YYYY в HH:mm") }}</CardDescription>
          </CardHeader>
          <CardContent class="overflow-hidden">
            <div>
              <span class="font-bold">ID:</span> {{ el.id }}
            </div>
            <div>
              <span class="font-bold">SSH:</span> {{ el.use_ssh ? 'Да' : 'Нет' }}
            </div>
            <div class="break-words line-clamp-3">
              <span class="font-bold">connection_uri:</span> {{ el.connection_uri }}
            </div>
          </CardContent>
          <CardFooter class="mt-auto">
            <Button disabled>
              Редактировать
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <DatabaseCreate v-model="isModalCreateOpen" @success="isModalCreateOpen = false" />
  </div>
</template>
