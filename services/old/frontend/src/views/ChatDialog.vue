<template>
  <div class="flex h-screen w-full bg-gray-100">
    <ChatListMenu :chats="chats" :activeChatId="activeChatId" @changeChat="changeChat"
                  class="w-64 bg-gray-200 overflow-auto"/>
    <ChatWindow :activeChatId="activeChatId" @changeChat="changeChat"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ChatListMenu from '../components/ChatListMenu.vue'; // Adjust the path as necessary
// import 'deep-chat';
import ChatWindow from "@/components/ChatWindow.vue"; // Make sure deep-chat is imported

export default defineComponent({
  name: "ChatDialog",
  components: {
    ChatWindow,
    ChatListMenu
  },

  data() {
    return {

      activeChatId: null, // Initialize with no chat selected
    }
  },
  methods: {

    changeChat(chatId) {
      this.activeChatId = chatId;

    },

  },

})
</script>

<style>
/*!* Override inline styles *!*/
/*.deep-chat-custom[style] {*/
/*  height: auto !important;*/
/*  width: 100% !important;*/
/*  max-width: 100% !important;*/
/*  min-height: 100% !important; !* or a specific min-height if necessary *!*/
/*}*/
</style>