<template>
  <div class="database-connection">
    <h2>Connect to Your Database</h2>
    <form class="form-container" @submit.prevent="submitConnection">
      <label for="databaseType">Database Type:</label>
      <select id="databaseType" v-model="connectionData.databaseType">
        <option value="Postgres">Postgres</option>
        <option value="BigQuery">BigQuery</option>
        <option value="Databricks">Databricks</option>
        <option value="Snowflake">Snowflake</option>
      </select>
      <label for="db_connection_id">Connection ID:</label>
      <input type="text" id="db_connection_id" v-model="connectionData.db_connection_id"/>
      <label for="use_ssh">Use SSH:</label>
      <input type="checkbox" id="use_ssh" v-model="connectionData.use_ssh"/>
      <label for="connection_uri">Connection URI:</label>
      <input type="text" id="connection_uri" v-model="connectionData.connection_uri"/>
      <button type="submit">Connect</button>
    </form>
    <!-- Success message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <!-- Error message -->
    <div v-if="errorMessage" class="error-message">
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
