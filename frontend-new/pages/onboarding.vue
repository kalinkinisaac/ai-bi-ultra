<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
    <div>
      <div class="text-xl font-semibold mb-2">Подключения</div>
      <div class="flex flex-row gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Мнимое</CardTitle>
            <CardDescription>Кароче не даете нам инфы</CardDescription>
          </CardHeader>
          <CardContent>
            Можно быстро настроить схемы вашей БД
          </CardContent>
          <CardFooter>
            <Button>Настроить</Button>
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
            <Button>Создать организацию</Button>
          </CardFooter>
        </Card>
      </div>

      <p class="text-lg font-bold mb-4">Подключения</p>
      <p><Button>Click me</Button></p>
      <div class="bg-red-500">asdds</div>
    </div>
</template>
