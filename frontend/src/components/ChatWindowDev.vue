<template>
  <div class="flex-1 overflow-y-auto p-4">
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

export default {
  name: "ChatDev",


  data() {
    return {
      messages: [
          // {"role": "ai", "text": "code ```sql\ncode a\n\na\n```"},
          // {"role": "ai", "text": "Final Answer: ``` \nSELECT COUNT(ord_id) AS total_orders FROM orders_aibi; -- Counts the total number of orders by counting unique ord_id entries\n```"}
      ], // Messages to display in the chat window
      chatRequest: {
        url: `/api/v1/stream-sql-generation`, // API endpoint to fetch messages based on chatId
        method: 'POST',
        headers: {'Content-Type': 'application/json', /*'Accept': 'application/json'*/}
      },
      connections: [], // Placeholder for connections
      db_connection_id: null, // Store the selected DB connection ID

    }
  },
  methods: {


    requestInterceptor(requestDetails) {
      console.log('requestInterceptor');
      console.log(requestDetails);
      // Transform the outgoing request to match your backend's expected format
      // const promptText = requestDetails.body.messages[0].text; // Extract the text from the message


      // Construct the payload as required by your backend API
      const payload = {
        prompt: {
            "db_connection_id": "660449d4297f4ac62a25e0a5",
            "text": "Какой тип транспорта доставляет быстрее всего?",
        }
        // chat_id: this.activeChatId
      };

      // Replace the original request body with the transformed payload
      requestDetails.body = payload;

      return requestDetails;
    },
    responseInterceptor(response) {
      console.log('responseInterceptor');
      console.log(response);
      // Transform the incoming response to match what deep-chat expects
      // This assumes your backend sends back a JSON object with a "text" property for the response
      if (response) {
        const transformedResponse = {
          text: response.text // The message to be dinpm install highlight.jssplayed by deep-chat
        };
        return transformedResponse;
      } else {
        // If the response format is not what's expected, throw an error or return a default message
        console.error('Unexpected response format:', response);
        return {error: 'Error: Unexpected response format from the server.'};
      }
    },

  }
};
</script>
