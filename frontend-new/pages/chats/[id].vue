<script setup lang="ts">
import { type ChatResponse } from '@/types'

import { format, parse } from '@formkit/tempo'

const route = useRoute()

const query = ref('')

// const { data } = await useFetch('/api/v1/chat_messages', {
//   params: {
//     chat_id: route.params.id,
//   },
// })
const { data: messages, pending, refresh } = await useFetch<ChatResponse[]>('/api/v1/chat_messages', {
  params: {
    chat_id: route.params.id,
  },
})

// TODO: Test onMount
// onMounted(() => {
  const message: ChatResponse = {
    id: '',
    chat_id: String(route.params.id),
    content: "Какой-то текст в ответе",
    role: 'assistant',
    // created_at: '2024-04-07T18:35:55.577000+00:00',
    created_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ'), // 2024-04-16T20:54:11+0300
    sql: "SELECT COUNT(id) AS total_warehouses -- Counts the total number of unique warehouse IDs\nFROM warehouse_dict;"
  }


  messages.value?.push(message)
// })

const onSubmit = async () => {
  const newMessage: ChatResponse = {
    id: '',
    chat_id: String(route.params.id),
    content: query.value,
    role: 'user',
    // created_at: '2024-04-07T18:35:55.577000+00:00',
    created_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ssZ'), // 2024-04-16T20:54:11+0300
  }
  messages.value?.push(newMessage)
  query.value = ''

  // try {
  //   const res = await $fetch('/api/v1/prompts/sql-generations/nl-generations', {
  //     method: 'POST',
  //     body: { hello: 'world ' },
  //   })

  //   query.value = ''
  // }
  // catch (error) {
  //   console.log('error', error)
  // }
}
</script>

<template>
  <div>
    <PlaygroundChat
      v-model="query"
      :messages
      @submit="onSubmit"
    >
      chat id {{ route.params.id }}
      <pre>pending</pre>
      <pre>{{ pending }}</pre>
      <pre>data</pre>
      <pre>{{ messages }}</pre>
    </PlaygroundChat>
  </div>
</template>
