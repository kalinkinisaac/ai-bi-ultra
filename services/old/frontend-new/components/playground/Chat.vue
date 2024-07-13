<script setup lang="ts">
import type { ChatResponse } from "@/types";
import { EChatRespondent } from "@/types";

import { format } from "@formkit/tempo";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { type DatabaseConnectionsResponse } from "@/types/db";

withDefaults(
  defineProps<{
    messages: ChatResponse[] | null;
  }>(),
  {
    messages: null,
  },
);
const emit = defineEmits<{
  submit: [];
}>();
const query = defineModel<string>("query");
const connection = defineModel<string>("connection");

// Form
const formSchema = toTypedSchema(
  z.object({
    query: z.string().min(1),
    connection: z.string().min(1),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

// Settings
const { data } = await useFetch<DatabaseConnectionsResponse[]>("/api/v1/database-connections");
if (data.value?.length) {
  connection.value = data.value[0].id;
}
const isSyncPending = ref(false);
const sync = () => {
  isSyncPending.value = true;
  $fetch("/api/v1/table-descriptions/sync-schemas", {
    method: "POST",
    body: {
      db_connection_id: connection.value,
    },
  })
    .then((data) => {
      // Вывести кол-во синканутых таблиц
      // data.length
    })
    .catch((reason) => {
      console.error("error", reason);
    })
    .finally(() => {
      isSyncPending.value = false;
    });
};

// const query = ref('')
const onSubmit = async () => {
  const { valid, errors } = await form.validate();
  console.log("PlaygroundChat: onSubmit hui", valid, errors);

  console.log("PlaygroundChat: onSubmit");
  emit("submit");

  const subscribeToThoughts = async () => {

    console.log(query.value, connection.value);
    const eventSource = new EventSource('/api/v2/fake-stream-sql-generation?text=' + query.value + '&connection_id=' + connection.value, {withCredentials: true});

    eventSource.onmessage = (event) => {
      console.log(event.data)
    }
  };

  subscribeToThoughts();
};
</script>

<template>
  <div class="relative flex h-screen min-h-[50vh] flex-col rounded-xl bg-muted/20 p-4 lg:col-span-2">
    <div class="absolute flex flex-row gap-2 z-10">
      <Select v-model="connection">
        <SelectTrigger>
          <SelectValue
            placeholder="Выберите БД"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="(el, idx) in data"
            :key="idx"
            :value="el.id"
          >
            <!-- {{ el.alias || 'Без имени' }} -->
            <div class="flex items-center text-left gap-3 text-muted-foreground">
              <div class="grid gap-0.5">
                <span class="font-medium text-foreground">
                  {{ el.alias || 'Без имени' }}
                </span>
                <p
                  class="text-xs"
                  data-description
                >
                  {{ el.id }}
                </p>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        v-if="connection"
        variant="outline"
        :disabled="isSyncPending"
        @click="sync"
      >
        <!-- <LazyIconLoaderCircle
            v-if="isSyncPending"
            class="w-4 h-4 animate-spin"
          /> -->
        <IconRefreshCcw
          class="w-4 h-4"
          :class="{'animate-spin': isSyncPending }"
        />
        <div class="hidden md:block">
          Синх-ция таблиц
        </div>
      </Button>
    </div>
    <Badge
      variant="outline"
      class="absolute right-4 top-3"
    >
      Вывод
    </Badge>

    <ScrollArea
      class="flex-1 flex w-full items-end pb-3 pt-14"
    >

      <!-- <slot /> -->

      <div class="flex flex-col gap-3 w-full">
        <template
          v-for="message in messages"
          :key="message.id"
        >
          <div
            class="p-4 text-sm rounded-md"
            :class="{
              'bg-primary/10 rounded-bl-none self-end': message.role === EChatRespondent.user,
              'bg-foreground text-primary-foreground rounded-bl-none self-start': message.role === EChatRespondent.assistant
            }"
          >
            <div class="text-xs opacity-50">{{ format(message.created_at, 'HH:mm') }}</div>
            <span class="font-bold">{{ message.role === EChatRespondent.user ? 'Вы' : 'AI' }}:</span>
            {{ message.content }}
            <div v-if="message.sql" class="p-2 border border-opacity-30 rounded-md">
              <Shiki lang="sql" :code="message.sql" />
              <pre>message.sql</pre>
              <pre>{{message.sql}}</pre>
            </div>
          </div>
        </template>
      </div>
    </ScrollArea>

    <form class="flex-none relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label
        for="message"
        class="sr-only"
      >
        Запрос
      </Label>
      <Textarea
        v-model="query"
        placeholder="Введите ваш запрос..."
        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        @keydown.ctrl.enter="onSubmit"
      />
      <div class="flex items-center p-3 pt-0">
        <Button
          type="submit"
          size="sm"
          class="ml-auto gap-1.5"
          :disabled="isSyncPending"
          @click.prevent="onSubmit"
        >
          Отправить
          <IconCornerDownLeft class="size-3.5" />
        </Button>
      </div>
    </form>
  </div>
</template>
