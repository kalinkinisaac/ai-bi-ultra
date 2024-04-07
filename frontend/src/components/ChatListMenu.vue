<template>
  <div class="chat-list h-screen overflow-auto bg-gray-200 p-2 shadow-md">
    <div v-for="chat in chats" :key="chat.id"
         @click="selectChat(chat.id)"
         :class="['chat-item', 'cursor-pointer', 'p-4', 'm-2', 'bg-white', 'rounded', 'hover:bg-gray-100', 'transition-colors', {'active-chat': chat.id === activeChatId}]">
      {{ chat.name }}
    </div>
  </div>
</template>


<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "ChatListMenu",
  props: {
    // Declare activeChatId as a prop
    activeChatId: {
      type: [String, Number],
      required: false,
      default: null
    }
  },
  data() {
    return {
      chats: [], // Initialize the chat list
    };
  },
  mounted() {
    this.fetchChatList();
  },
  methods: {
    async fetchChatList() {
      try {
        const response = await fetch('/api/v1/chats');
        if (!response.ok) throw new Error('Failed to fetch chat list');
        const chatsData = await response.json();
        this.chats = chatsData.map(chat => ({id: chat.id, name: chat.title}));
      } catch (error) {
        console.error('Error fetching chat list:', error.message);
        // Handle error (e.g., show an error message)
      }
    },
    selectChat(chatId) {
      this.$emit('changeChat', chatId); // Emit the changeChat event with the selected chatId
    },
  },
});
</script>


<style scoped>


.chat-list {
  background-color: #e9ecef; /* Change to your preferred color */
  width: 250px; /* Set your preferred width */
  height: 100vh; /* Full height */
  padding: 10px 0; /* Vertical padding */
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow to the right of the menu */
}

.chat-item {
  padding: 10px 20px;
  margin: 5px 10px;
  background-color: #ffffff; /* Each item's background color */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.chat-item:hover {
  background-color: #f2f2f2;
}

.active-chat {
  background-color: #3490dc; /* Blue background for active chat */
  color: white; /* White text for better contrast */
}
</style>
<script setup lang="ts">
</script>