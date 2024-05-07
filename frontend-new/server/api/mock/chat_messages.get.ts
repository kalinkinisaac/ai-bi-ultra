import type { ChatResponse } from '@/types'
// interface ChatRequest {
//   chat_id: string
// }
// interface ChatResponse {
//   id: string
//   chat_id: string
//   content: string
//   role: string
//   created_at: string
// }

export default defineEventHandler((event): ChatResponse[] => {
  return [
    {
      id: '6612e78b7be060aad384d806',
      chat_id: '6612e78b7be060aad384d804',
      role: 'user',
      content: 'какая аномалия по заказам есть в данных',
      created_at: '2024-04-07T18:35:55.577000+00:00',
    },
    {
      id: '6612e7a17be060aad384d809',
      chat_id: '6612e78b7be060aad384d804',
      role: 'assistant',
      content: 'I don\'t know',
      created_at: '2024-04-07T18:36:15.378000+00:00',
    },
    {
      id: '6616e3a77be060aad384d81a',
      chat_id: '6612e78b7be060aad384d804',
      role: 'user',
      content: 'Эээ заебал покажи',
      created_at: '2024-04-10T19:08:23.211000+00:00',
    },
    {
      id: '6616e3b67be060aad384d81d',
      chat_id: '6612e78b7be060aad384d804',
      role: 'assistant',
      content: 'I don\'t know, the SQL query is invalid.',
      created_at: '2024-04-10T19:08:38.356000+00:00',
    },
  ]
})
