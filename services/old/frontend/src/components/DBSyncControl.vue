<template>
  <div class="db-sync-control flex items-center justify-between p-4 shadow rounded-lg bg-white">
    <div class="flex-grow">
      <label for="databaseType" class="block text-sm font-medium text-gray-700">Select a connection</label>
      <select v-model="selectedConnectionId" @change="onConnectionChange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-gray-400 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option disabled value="">Select a connection</option>
        <option v-for="connection in connections" :key="connection.id" :value="connection.id">
          {{ connection.alias }} ({{ connection.id }})
        </option>
      </select>
    </div>
    <button @click="syncSchemas" :disabled="isSyncing" class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Sync Schemas
    </button>
  </div>
  <div v-if="syncStatus" class="mt-2 text-center">
    <span v-if="syncStatus === 'success'" class="text-green-600">Synchronization completed successfully.</span>
    <span v-else-if="syncStatus === 'error'" class="text-red-600">Error during synchronization.</span>
    <span v-if="isSyncing" class="text-blue-600">Synchronizing...</span>
  </div>
</template>



<script>
export default {
  data() {
    return {
      connections: [],
      selectedConnectionId: '',
      syncStatus: '',
      isSyncing: false,
    };
  },
  mounted() {
    this.fetchConnections();
  },
  methods: {
    async fetchConnections() {
      try {
        const response = await fetch('/api/v1/database-connections');
        if (!response.ok) throw new Error('Failed to fetch database connections');
        const data = await response.json();
        this.connections = data.map(conn => ({
          id: conn.id,
          alias: conn.alias,
        }));
      } catch (error) {
        console.error('Error fetching database connections:', error.message);
      }
    },
    // The rest of your methods remain unchanged...

    async syncSchemas() {
      this.isSyncing = true;
      this.syncStatus = '';
      try {
        const response = await fetch('/api/v1/table-descriptions/sync-schemas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            db_connection_id: this.selectedConnectionId,
          }),
        });
        if (!response.ok) throw new Error('Failed to sync schemas');
        this.syncStatus = 'success';
        this.$emit('db-sync-success');
      } catch (error) {
        console.error('Error syncing schemas:', error);
        this.syncStatus = 'error';
        this.$emit('db-sync-error');
      } finally {
        this.isSyncing = false;
      }
    },
    onConnectionChange() {
      this.resetSyncStatus();
      this.$emit('db-connection-selected', this.selectedConnectionId);
    },
    resetSyncStatus() {
      this.syncStatus = '';
    },

  },
}
</script>

<style scoped>
.db-sync-control {
  /* Style your component */
}

.select-wrapper {
  margin-bottom: 1rem;
}

.sync-button {
  /* Style your button */
}

.sync-status {
  margin-top: 1rem;
}
</style>
