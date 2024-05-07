interface ChatItem {
  id: string
  metadata: null
  created_at: string
  title: string
}

export default defineEventHandler((event): ChatItem[] => {
  return [
    {
      id: '6612e6d17be060aad384d7f2',
      metadata: null,
      created_at: '2024-04-07T18:32:49.725000+00:00',
      title: 'Random name: 77cb01e843d945fe8a81fb5ad861932d',
    },
    {
      id: '6612e6f67be060aad384d7f8',
      metadata: null,
      created_at: '2024-04-07T18:33:26.253000+00:00',
      title: 'Some chat',
    },
    {
      id: '6612e74b7be060aad384d7fe',
      metadata: null,
      created_at: '2024-04-07T18:34:51.800000+00:00',
      title: 'Lorem some name dates or feeling',
    },
    {
      id: '6612e78b7be060aad384d804',
      metadata: null,
      created_at: '2024-04-07T18:35:55.575000+00:00',
      title: 'Random name: 7bcc3f849c0b45ea98faef9d83b312b6',
    },
    {
      id: '6612e7be7be060aad384d80a',
      metadata: null,
      created_at: '2024-04-07T18:36:46.697000+00:00',
      title: 'Random name: be88f5842eb44312b4ec533a32b383f5',
    },
    {
      id: '6612e7e07be060aad384d80f',
      metadata: null,
      created_at: '2024-04-07T18:37:20.794000+00:00',
      title: 'Random name: c330b28b146b41eb9e45ad3971c4d55e',
    },
    {
      id: '6613a2ef7be060aad384d813',
      metadata: null,
      created_at: '2024-04-08T07:55:27.552000+00:00',
      title: 'Random name: 604b744705d04600b2df4b8b09475f33',
    },
    {
      id: '6616e5d07be060aad384d821',
      metadata: null,
      created_at: '2024-04-10T19:17:36.445000+00:00',
      title: 'Random name: 6015a4c1debb47189b1497a8a4e9da6c',
    },
    {
      id: '6616e65f7be060aad384d827',
      metadata: null,
      created_at: '2024-04-10T19:19:59.718000+00:00',
      title: 'Random name: 2827cb35e1504a448fab5adf8686cbb5',
    },
    {
      id: '661c43a97be060aad384d833',
      metadata: null,
      created_at: '2024-04-14T20:59:21.989000+00:00',
      title: 'Random name: 266b8592d38c4827b2a06130e05a869d',
    },
    {
      id: '661c43b87be060aad384d837',
      metadata: null,
      created_at: '2024-04-14T20:59:36.513000+00:00',
      title: 'Random name: a627d86b2a654d6e928e785d0fc84002',
    },
    {
      id: '661c43c27be060aad384d83b',
      metadata: null,
      created_at: '2024-04-14T20:59:46.462000+00:00',
      title: 'Random name: b5b6f314206145e2b1ea8f7613850fd2',
    },
  ]
})
