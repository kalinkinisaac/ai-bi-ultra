<template>
  <div class="max-w-xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">All connections</h2>
    <button
      class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-5 ease-linear transition-all duration-150"
      type="button"
      @click="fetchConnections"
    >
      Refresh Connections
    </button>
    <div class="space-y-4">
      <div
        class="connection-item p-4 border border-gray-300 rounded-lg"
        v-for="connection in connections"
        :key="connection.id"
      >
        <h3 class="text-lg font-semibold text-gray-700">{{ connection.alias }}</h3>
        <p class="text-gray-600">Connection ID: {{ connection.id }}</p>
        <p class="text-gray-600">Use SSH: <span class="font-semibold" :class="{'text-green-500': connection.use_ssh, 'text-red-500': !connection.use_ssh}">{{ connection.use_ssh ? 'Yes' : 'No' }}</span></p>
        <p class="text-gray-600">Connection URI: {{ connection.connection_uri }}</p>
        <p class="text-gray-600">Created At: {{ connection.created_at }}</p>
      </div>
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
