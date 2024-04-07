<template>
  <div class="flex h-screen w-full bg-gray-100">
    <ChatListMenu :chats="chats" :activeChatId="activeChatId" @changeChat="changeChat"
                  class="w-64 bg-gray-200 overflow-auto"/>
    <!--    <div class="flex-1 overflow-y-auto p-4">-->
    <!--      <deep-chat-->
    <!--          style="border-radius: 4px; width: calc(100vw - 256px - 2 * 16px); height: calc(100vh - 62px - 2 * 16px); "-->

    <!--          :textInput.prop="{ placeholder: { text: 'Type your message...' } }"-->
    <!--          :requestInterceptor="requestInterceptor"-->
    <!--          :responseInterceptor="responseInterceptor"-->
    <!--          :request="{-->
    <!--          url: '/api/v1/prompts/sql-generations/nl-generations',-->
    <!--          // url: '/api/v1/test',-->
    <!--          method: 'POST',-->
    <!--          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},-->
    <!--          // additionalBodyProps: {key: 'value'}-->
    <!--        }"-->
    <!--      ></deep-chat>-->
    <ChatWindow :activeChatId="activeChatId"/>
    <!--    </div>-->
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
  // mounted() {
  //   this.fetchChatList();
  // },
  data() {
    return {
      // Example chat names
      // chats: [
      //   {id: 1, name: "General Discussion"},
      //   {id: 2, name: "Vue Tips & Tricks"},
      //   {id: 3, name: "Test chat"},
      //   {id: 4, name: "Another chat"},
      // ],
      activeChatId: null, // Initialize with no chat selected
    }
  },
  methods: {
    // async fetchChatList() {
    //   try {
    //     const response = await fetch('/api/v1/chats');
    //     if (!response.ok) throw new Error('Failed to fetch chat list');
    //     const chats = await response.json();
    //     this.chats = chats.map(chat => ({id: chat.id, name: chat.title}));
    //   } catch (error) {
    //     console.error('Error fetching chat list:', error);
    //   }
    // },
    changeChat(chatId) {
      this.activeChatId = chatId;
      // Assuming you have a method to fetch messages for the selected chat
      // this.fetchMessagesForChat(chatId);
    },
    // async fetchMessagesForChat(chatId) {
      // Implement fetching messages based on chatId and update a corresponding data property
      // This property should then be passed down to ChatWindow as a prop
    // },
    // changeChat(chatId) {
    //   this.activeChatId = chatId; // Update the active chat ID
    // },
    // requestInterceptor(requestDetails) {
    //   console.log('NNNN');
    //   console.log(requestDetails);
    //   // Transform the outgoing request to match your backend's expected format
    //   const promptText = requestDetails.body.messages[0].text; // Extract the text from the message
    //
    //   // Construct the payload as required by your backend API
    //   const payload = {
    //     llm_config: {"llm_name": "gpt-4-turbo-preview"},
    //     max_rows: 100,
    //     sql_generation: {
    //       "low_latency_mode": false,
    //       "llm_config": {"llm_name": "gpt-4-turbo-preview"},
    //       "evaluate": false,
    //       "metadata": {},
    //       "prompt": {
    //         "text": promptText,
    //         "db_connection_id": '660449d4297f4ac62a25e0a5',//this.selectedConnectionId, // Ensure this ID is set correctly in your component's data
    //         "metadata": {}
    //       }
    //     }
    //   };
    //
    //   // Replace the original request body with the transformed payload
    //   requestDetails.body = payload;
    //
    //   return requestDetails;
    // },
    // responseInterceptor(response) {
    //   console.log('KJEKEKKEKE');
    //   console.log(response);
    //   // Transform the incoming response to match what deep-chat expects
    //   // This assumes your backend sends back a JSON object with a "text" property for the response
    //   if (response && response.sql_generation_id) {
    //     const transformedResponse = {
    //       text: response.text // The message to be displayed by deep-chat
    //     };
    //     return transformedResponse;
    //   } else {
    //     // If the response format is not what's expected, throw an error or return a default message
    //     console.error('Unexpected response format:', response);
    //     return {error: 'Error: Unexpected response format from the server.'};
    //   }
    // },
    // ... other methods ...
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