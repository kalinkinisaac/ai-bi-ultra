<template>
  <div class="flex-1 overflow-y-auto p-4">
    <DBSyncControl :connections="connections" @db-connection-selected="handleDBConnectionSelected"/>
    <deep-chat
        style="border-radius: 4px; width: calc(100vw - 256px - 2 * 16px); height: calc(100vh - 158px - 2 * 16px);"
        :demo.prop="true"
        :textInput.prop="{ placeholder: { text: 'Type your message...' } }"
        :requestInterceptor="requestInterceptor"
        :responseInterceptor="responseInterceptor"
        :request="chatRequest"
        :initialMessages.prop="messages"
        :stream.prop="true"
    ></deep-chat>
  </div>
</template>

<script>
import 'deep-chat'; // Ensure deep-chat is globally registered or import as a component
import DBSyncControl from './DBSyncControl.vue';

export default {
  components: {
    DBSyncControl
  },
  props: {
    activeChatId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      messages: [], // Messages to display in the chat window
      chatRequest: {
        // url: `/api/v1/prompts/sql-generations/nl-generations-in-chat`, // API endpoint to fetch messages based on chatId
        url: `/api/v1/stream-sql-generation_in_chat`,
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      },
      connections: [], // Placeholder for connections
      db_connection_id: null, // Store the selected DB connection ID

    }
  },
  watch: {
    // React to changes in activeChatId
    activeChatId: {
      immediate: true,
      handler(newVal, oldVal) {
        this.fetchMessages(newVal);
        oldVal;
      }
    }
  },
  methods: {
    handleDBConnectionSelected(connectionId) {
      this.db_connection_id = connectionId;
      // Optionally, reset messages and fetch new ones based on the new connection
      // this.messages = [];
      // this.fetchMessages(this.activeChatId);
    },
    async fetchMessages(chatId) {
      try {
        const response = await fetch(`/api/v1/chat_messages?chat_id=${chatId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        });

        if (response.ok) {
          const data = await response.json();
          // Transform each message to the expected format
          this.messages = data.map(msg => ({
            text: msg.content,
            role: msg.role === "user" ? "user" : "ai" // Assuming 'assistant' maps to 'ai'
          }));
        } else {
          throw new Error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error.message);
        this.messages = []; // Reset messages or handle error appropriately
      }
    },

    requestInterceptor(requestDetails) {
      console.log('NNNN');
      console.log(requestDetails);
      // Transform the outgoing request to match your backend's expected format
      const promptText = requestDetails.body.messages[0].text; // Extract the text from the message


      // Construct the payload as required by your backend API
      // const payload = {
      //   llm_config: {"llm_name": "gpt-4-turbo-preview"},
      //   max_rows: 100,
      //   sql_generation: {
      //     "low_latency_mode": false,
      //     "llm_config": {"llm_name": "gpt-4-turbo-preview"},
      //     "evaluate": false,
      //     "metadata": {},
      //     "prompt": {
      //       "text": promptText,
      //       "db_connection_id": this.db_connection_id,
      //       "metadata": {}
      //     },
      //   },
      //   chat_id: this.activeChatId
      // };

      // Replace the original request body with the transformed payload
      // requestDetails.body = payload;
      let payload;
      if (this.activeChatId) {
        payload = {

          "prompt": {
            "text": promptText,
            "db_connection_id": this.db_connection_id,
            "metadata": {}
          },

          chat_id: this.activeChatId
        };
      } else {
        payload = {

          "prompt": {
            "text": promptText,
            "db_connection_id": this.db_connection_id,
            "metadata": {}
          },

        };
      }


      // Replace the original request body with the transformed payload
      requestDetails.body = payload;

      return requestDetails;
    },
    responseInterceptor(response) {
      console.log('KJEKEKKEKE');
      console.log(response);
      // Transform the incoming response to match what deep-chat expects
      // This assumes your backend sends back a JSON object with a "text" property for the response
      if (response && response.chat_id) {
        const transformedResponse = {
          text: response.text // The message to be displayed by deep-chat
        };
        // emit change chat:
        if(response.chat_id && response.chat_id !== this.activeChatId) {
          // this.$emit('changeChat', response.chat_id);
        }
        // this.$emit('changeChat', response.chat_id);
        // and refresh chat list
        // this.fetchMessages(response.chat_id);
        return transformedResponse;
      } else {
        // If the response format is not what's expected, throw an error or return a default message
        console.error('Unexpected response format:', response);
        return {error: 'Error: Unexpected response format from the server.'};
      }
    },

  },
  created() {
    // Initial fetch for messages when the component is created
    this.fetchMessages(this.activeChatId);
    // this.fetchConnections();
  }
};
</script>
