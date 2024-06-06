<script setup lang="ts">
import "deep-chat";

import { type DatabaseConnectionsResponse } from "@/types/db";
import type { RequestDetails, ResponseDetails } from "deep-chat/dist/types/interceptors";
import type { ChatPageProps } from "~/types/chat";

const { chatId, messages } = withDefaults(defineProps<ChatPageProps>(), {
  messages: null,
});

const emit = defineEmits<{
  submit: [];
}>();

console.log(chatId);
const connection = defineModel<string>("connection");

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

const requestInterceptor = (requestDetails: RequestDetails) => {
  const promptText = requestDetails.body.messages[0].text;
  requestDetails.body = {
    prompt: {
      db_connection_id: connection.value,
      text: promptText,
    },
  };

  return requestDetails;
};

const responseInterceptor = (response: ResponseDetails) => {
  if (response && response.chat_id) {
    const transformedResponse = {
      text: response.text,
    };
    if (response.chat_id && response.chat_id !== chatId) {
      return;
    }

    return transformedResponse;
  } else {
    console.error("Unexpected response format:", response);
    return { error: "Error: Unexpected response format from the server." };
  }
};

const chatRequest = {
  url: `/api/v1/stream-sql-generation_in_chat`,
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};
</script>

<template>
  <div
    class="relative flex h-screen min-h-[50vh] flex-col rounded-xl bg-muted/20 p-4 lg:col-span-2"
  >
    <div class="flex w-fit flex-row gap-2 z-10 mb-2">
      <Select v-model="connection">
        <SelectTrigger>
          <SelectValue placeholder="Выберите БД" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="(el, idx) in data" :key="idx" :value="el.id">
            <!-- {{ el.alias || 'Без имени' }} -->
            <div
              class="flex items-center text-left gap-3 text-muted-foreground"
            >
              <div class="grid gap-0.5">
                <span class="font-medium text-foreground">
                  {{ el.alias || "Без имени" }}
                </span>
                <p class="text-xs" data-description>
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
          :class="{ 'animate-spin': isSyncPending }"
        />
        <div class="hidden md:block">Синх-ция таблиц</div>
      </Button>
    </div>

    <deep-chat
      style="
        height: 100%;
        width: 100%;
        border-radius: 8px;
        background: black;
        border-width: 1px;
        border-color: #27272a;
      "
      :textInput.prop="{
        placeholder: { text: 'Type your message...' },
        styles: {
          container: {
            width: '100%',
            background: 'black',
            padding: '8px',
            marginBottom: '0px',
          },
          text: {
            color: 'white',
          },
        },
      }"
      :messageStyles.prop="{
        default: {
          shared: {
            bubble: {
              maxWidth: '100%',
              backgroundColor: 'unset',
              marginTop: '16px',
              marginBottom: '16px',
            },
          },
          user: {
            outerContainer: {
              backgroundColor: '#1a1a1a' /* Slightly lighter black */,
            },
            bubble: {
              marginLeft: '0px',
              color: '#ffffff' /* White */,
              backgroundColor: '#333333' /* Dark gray */,
            },
          },
          ai: {
            outerContainer: {
              backgroundColor: '#000000' /* Black */,
              borderTop: '1px solid #333333' /* Dark gray */,
              borderBottom: '1px solid #333333' /* Dark gray */,
            },
            bubble: {
              marginLeft: '0px',
              color: '#ffffff' /* White */,
              backgroundColor: '#4d4d4d' /* Medium gray */,
              max,
            },
          },
        },
      }"
      :avatars.prop="{
        user: {
          styles: {
            position: 'left',
            avatar: { scale: '1.5', padding: '6px', borderRadius: '50%' },
            container: { padding: '6px', backgroundColor: '' },
          },
        },
        ai: {
          src: '/img_1.png',
          styles: {
            position: 'left',
            avatar: { scale: '1.5', padding: '6px' },
            container: { padding: '6px' },
          },
        },
      }"
      :initialMessages.prop="messages"
      :requestInterceptor="requestInterceptor"
      :responseInterceptor="responseInterceptor"
      :request="chatRequest"
      :stream.prop="true"
    />

    <!--    <form-->
    <!--      class="flex-none relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"-->
    <!--    >-->
    <!--      <Label for="message" class="sr-only"> Запрос </Label>-->
    <!--      <Textarea-->
    <!--        v-model="query"-->
    <!--        placeholder="Введите ваш запрос..."-->
    <!--        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"-->
    <!--        @keydown.ctrl.enter="onSubmit"-->
    <!--      />-->
    <!--      <div class="flex items-center p-3 pt-0">-->
    <!--        <Button-->
    <!--          type="submit"-->
    <!--          size="sm"-->
    <!--          class="ml-auto gap-1.5"-->
    <!--          :disabled="isSyncPending"-->
    <!--          @click.prevent="onSubmit"-->
    <!--        >-->
    <!--          Отправить-->
    <!--          <IconCornerDownLeft class="size-3.5" />-->
    <!--        </Button>-->
    <!--      </div>-->
    <!--    </form>-->
  </div>
</template>
