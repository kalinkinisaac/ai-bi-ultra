<template>
  <div class="flex-1 overflow-y-auto p-4">
    <DBSyncControl
      :connections="connections"
      @db-connection-selected="handleDBConnectionSelected"
    />
    <deep-chat
      style="
        border-radius: 4px;
        width: calc(100vw - 256px - 2 * 16px);
        height: calc(100vh - 158px - 2 * 16px);
      "
      :demo.prop="true"
      :textInput.prop="{ placeholder: { text: 'Type your message...' } }"
      :requestInterceptor="requestInterceptor"
      :responseInterceptor="responseInterceptor"
      :validateInput="validateInput"
      :request="chatRequest"
      :initialMessages.prop="messages"
      :stream.prop="true"
      :errorMessages.prop="{ displayServiceErrorMessages: true }"
    >
      <div
        style="
          width: 200px;
          background-color: #f3f3f3;
          border-radius: 10px;
          padding: 12px;
          padding-bottom: 15px;
          display: none;
        "
      >
        <div>
          <div style="text-align: center; margin-bottom: 8px; font-size: 16px">
            <b>Intro panel</b>
          </div>
          <div style="font-size: 15px; line-height: 20px">
            Insert a description to help your users understand how to use the
            component.
          </div>
        </div>
      </div>
    </deep-chat>
  </div>
</template>

<script>
import "deep-chat"; // Ensure deep-chat is globally registered or import as a component
import DBSyncControl from "./DBSyncControl.vue";

export default {
  components: {
    DBSyncControl,
  },
  props: {
    activeChatId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      messages: [], // Messages to display in the chat window
      chatRequest: {
        // url: `/api/v1/prompts/sql-generations/nl-generations-in-chat`, // API endpoint to fetch messages based on chatId
        url: `/api/v1/stream-sql-generation_in_chat`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
      connections: [], // Placeholder for connections
      db_connection_id: null, // Store the selected DB connection ID
    };
  },
  watch: {
    // React to changes in activeChatId
    activeChatId: {
      immediate: true,
      handler(newVal, oldVal) {
        this.fetchMessages(newVal);
        oldVal;
      },
    },
  },
  methods: {
    handleDBConnectionSelected(connectionId) {
      this.db_connection_id = connectionId;
    },
    async fetchMessages(chatId) {
      try {
        const response = await fetch(
          `/api/v1/chat_messages?chat_id=${chatId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Transform each message to the expected format
          this.messages = data.map((msg) => ({
            text: msg.content,
            role: msg.role === "user" ? "user" : "ai", // Assuming 'assistant' maps to 'ai'
          }));
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
        this.messages = []; // Reset messages or handle error appropriately
      }
    },

    requestInterceptor(requestDetails) {
      console.log("ABABBA");
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
          prompt: {
            text: promptText,
            db_connection_id: this.db_connection_id,

            metadata: {},
          },
          // "llm_config": {
          //       "llm_family": "fake",
          //       "llm_name": "fake_model"
          //   },

          chat_id: this.activeChatId,
        };
      } else {
        payload = {
          prompt: {
            text: promptText,
            db_connection_id: this.db_connection_id,
            metadata: {},
          },
          // llm_config: {
          //   llm_family: "fake",
          //   llm_name: "fake_model",
          // },
        };
      }

      // Replace the original request body with the transformed payload
      requestDetails.body = payload;

      return requestDetails;
    },
    responseInterceptor(response) {
      console.log("KJEKEKKEKE");
      console.log(response);
      // Transform the incoming response to match what deep-chat expects
      // This assumes your backend sends back a JSON object with a "text" property for the response
      if (response && response.chat_id) {
        let content;

        // if (response.assistant_message_type === 'chart') {
        //   const chartData = JSON.parse(content);
        //   // html = this.renderChart(chartData);
        // } else if (typeof content === 'object') {
        //   content = JSON.stringify(content, null, 2);
        // }
        if (response.assistant_message_type === 'chart') {
          content = this.renderChart(response.content);
        }
        else if (typeof response.content === 'object') {
          content = JSON.stringify(response.content, null, 2);
        } else {
          content = response.content;
        }



        const transformedResponse = {
          text: response.assistant_message_type + ": " + response.content, // The message to be displayed by deep-chat
        };
        // Optionally, handle chat ID change
        if (response.chat_id && response.chat_id !== this.activeChatId) {
          // this.$emit('changeChat', response.chat_id);
        }
        return transformedResponse;
      } else {
        // If the response format is not what's expected, throw an error or return a default message
        console.error("Unexpected response format:", response);
        return { error: "Error: Unexpected response format from the server." };
      }
    },

    renderChart(chartData) {
      const chartId = `chart-${Date.now()}`;
      this.$nextTick(() => {
        Highcharts.chart(chartId, {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Order Dynamics Over Time'
          },
          xAxis: {
            categories: chartData.x
          },
          yAxis: {
            title: {
              text: 'Number of Orders'
            }
          },
          series: [{
            name: 'Orders',
            data: chartData.y
          }]
        });
      });

      return `<div id="${chartId}" style="width: 100%; height: 400px;"></div>`;
    },

    validateInput(text, files) {
      // console.log('validating');
      // console.log((this.db_connection_id !== null) && text)
      // return (this.db_connection_id !== null) && text;
      return text;
    },
  },
  created() {
    // Initial fetch for messages when the component is created
    this.fetchMessages(this.activeChatId);
    // this.messages += [
    //   {
    //     html: `
    //   <div class="deep-chat-temporary-message">
    //     <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px">What do shrimps eat?</button>
    //     <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 6px">Can a shrimp fry rice?</button>
    //     <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 6px">What is a pistol shrimp?</button>
    //   </div>`,
    //     role: 'ai',
    //   }]
    // this.fetchConnections();
  },
};
</script>
