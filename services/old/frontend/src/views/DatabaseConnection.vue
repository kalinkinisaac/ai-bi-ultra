<template>
  <div class="max-w-lg mx-auto my-10 p-6 border border-gray-300 rounded-md shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Connect to Your Database</h2>
    <form class="space-y-4" @submit.prevent="submitConnection">
      <div>
        <label for="databaseType" class="block text-sm font-medium text-gray-700">Database Type:</label>
        <select id="databaseType" v-model="connectionData.databaseType"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="Postgres">Postgres</option>
          <option value="BigQuery">BigQuery</option>
          <option value="Databricks">Databricks</option>
          <option value="Snowflake">Snowflake</option>
        </select>
      </div>
      <div>
        <label for="db_connection_id" class="block text-sm font-medium text-gray-700">Connection ID:</label>
        <input type="text" id="db_connection_id" v-model="connectionData.db_connection_id"
               class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="use_ssh" v-model="connectionData.use_ssh"
               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        <label for="use_ssh" class="ml-2 block text-sm text-gray-700">Use SSH:</label>
      </div>
      <div>
        <label for="connection_uri" class="block text-sm font-medium text-gray-700">Connection URI:</label>
        <input type="text" id="connection_uri" v-model="connectionData.connection_uri"
               class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Connect
      </button>
    </form>
    <!-- Success message -->
    <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-800 border border-green-400 rounded">
      {{ successMessage }}
    </div>
    <!-- Error message -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
      {{ errorMessage }}
    </div>
  </div>
</template>


<script>
import axios from 'axios'; // Make sure to install axios if you haven't: npm install axios

export default {
  name: 'DatabaseConnection',
  data() {
    return {
      connectionData: {
        databaseType: 'Postgres', // Default selection
        db_connection_id: '',
        use_ssh: false,
        connection_uri: ''
      },
      llmApiKey: '', // You will need to figure out how to manage and populate this value securely.
      sshSettings: {}, // This should be populated with the necessary SSH details.
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitConnection() {
      this.successMessage = '';
      this.errorMessage = '';

      try {
        // You may need to construct the data payload based on the different database types and conditions
        const payload = {
          alias: this.connectionData.db_connection_id, // or however you decide to define the alias
          use_ssh: this.connectionData.use_ssh,
          connection_uri: this.connectionData.connection_uri,
          llm_api_key: this.llmApiKey, // This value shouldn't be hardcoded for security reasons
          ssh_settings: this.sshSettings // You will need to define how to populate this object
          // Add any other fields needed for the request here
        };

        const response = await axios.post('/api/v1/database-connections', payload, {
          headers: {
            'Content-Type': 'application/json',
            // Any additional headers you require
          }
        });


        this.successMessage = 'Connection successful!'; // Set success message
        // Log the response data for debugging
        console.log('Connection success:', response.data);

        // You could trigger some success logic here
      } catch (error) {
        console.error('Connection error:', error);
        this.errorMessage = 'Failed to connect to the database. ' + error.response.data.detail;
        if (error.response) {
          // Server responded with a status code that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }

      }
    }
  }
}
</script>


<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 10px;
}

</style>
