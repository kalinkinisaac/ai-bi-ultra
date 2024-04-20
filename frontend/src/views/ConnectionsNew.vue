<template>
  <div class="min-h-screen overflow-y-auto pl-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">All connections</h2>
    <button
      class="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase text-xs px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
      @click="fetchConnections">
      Refresh Connections
    </button>
    <div class="space-y-4 mt-4">
      <connection-item
        v-for="connection in connections"
        :key="connection.db_connection_id"
        :connection="connection"
        @toggle-tables="toggleTables"
        @edit-description="editDescription">
      </connection-item>
    </div>
<!--    <edit-modal-->
<!--      v-if="isEditing"-->
<!--      :description="editData.description"-->
<!--      @save="saveDescription"-->
<!--      @cancel="cancelEdit">-->
<!--    </edit-modal>-->
  </div>

<!--  <fwb-dropdown text="Click me" placement="top">-->
<!--    <fwb-list-group>-->
<!--      <fwb-list-group-item>Item #1</fwb-list-group-item>-->
<!--      <fwb-list-group-item>Item #2</fwb-list-group-item>-->
<!--      <fwb-list-group-item>Item #3</fwb-list-group-item>-->
<!--    </fwb-list-group>-->
<!--  </fwb-dropdown>-->

  <Modal v-model:visible="isVisible">
      <div>your content...</div>
  </Modal>
</template>

<script>
import axios from 'axios';
import ConnectionItem from '../components/connections/ConnectionItem.vue';
import EditModal from '../components/connections/EditModal.vue';
import 'usemodal-vue3'
import { Modal } from 'usemodal-vue3';
console.log(Modal);
export default {
  name: 'DatabaseConnectionsList',
  components: { ConnectionItem, EditModal },
  data() {
    return {
      connections: [],
      isEditing: false,
      editData: {
        column: null,
        description: ''
      },
      isVisible: true,
    };
  },
  mounted() {
    this.fetchConnections();
  },
  methods: {
    async fetchConnections() {
      try {
        const response = await axios.get('/api/v1/table-descriptions/database/list', {
          headers: {
            // 'Authorization': 'Bearer <Your_Token_Here>',
            'Content-Type': 'application/json'
          }
        });
        this.connections = response.data.map(conn => ({
          ...conn,
          active: false,
          tables: conn.tables.map(table => ({ ...table, active: false }))
        }));
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    },

    toggleTables(connection) {
      connection.active = !connection.active;
    },

    editDescription(column) {
      this.editData.column = column;
      this.editData.description = column.description || '';
      this.isEditing = true;
    },

    async saveDescription() {
      try {
        const updatedDescription = this.editData.description;
        await axios.post('/api/path/to/update/description', {
          columnId: this.editData.column.id,
          description: updatedDescription
        });
        this.editData.column.description = updatedDescription;
        this.isEditing = false;
      } catch (error) {
        console.error('Failed to save description:', error);
      }
    },

    cancelEdit() {
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
/* You can add styles specific to this component here */
</style>
