<template>
  <div class="connections-list">
    <h2>All connections</h2>
    <button @click="fetchConnections">Refresh Connections</button>
    <div class="connection-item" v-for="connection in connections" :key="connection.id">
      <h3>{{ connection.alias }}</h3>
      <p>Connection ID: {{ connection.id }}</p>
      <p>Use SSH: {{ connection.use_ssh ? 'Yes' : 'No' }}</p>
      <p>Connection URI: {{ connection.connection_uri }}</p>
      <p>Created At: {{ connection.created_at }}</p>
    </div>
  </div>
</template>



<script>
import axios from 'axios'; // Make sure to import axios

export default {
  name: 'DatabaseConnectionsList',
  data() {
    return {
      connections: [], // This will hold the list of connections
    }
  },
  mounted() {
    this.fetchConnections(); // Fetch connections when the component is mounted
  },
  methods: {
    async fetchConnections() {
      try {
        const response = await axios.get('/api/v1/database-connections');
        this.connections = response.data; // Set the connections data with response
        console.log('Fetched connections:', this.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
        // Handle the error accordingly (display an error message, etc.)
      }
    }
  }
}
</script>

<style scoped>
.connections-list {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 10px;
}

.connection-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}

</style>
