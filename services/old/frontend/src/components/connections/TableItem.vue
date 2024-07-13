<template>
  <div class="cursor-pointer flex flex-col items-start gap-2 p-2 pl-4 rounded-lg transition-colors">
    <div class="flex flex-row items-center p-2 rounded-lg hover:bg-slate-100">
    <div class="flex items-center gap-2 p-2 rounded-xl " @click="toggleColumns">
      <svg class="h-4 w-4 text-blue-500 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" :class="{'rotate-90': table.active}">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <span class="font-bold text-lg">{{ table.table_name }}</span>
    </div>
    <!-- Editable description trigger -->
    <div @click.stop="editTable" class="text-gray-500 text-sm cursor-pointer">
      <span v-if="!editingTable && this.table.description">{{ this.table.description }}</span>
      <span v-else-if="!editingTable">Click to add a description</span>
      <input v-show="editingTable" v-model="tableDescription" @keyup.enter="saveTableDescription"
             @blur="saveTableDescription" class="border p-1 text-sm"/>
      <button v-show="editingTable" @click.stop="saveTableDescription" class="text-green-500">✓</button>
      <button v-show="editingTable" @click.stop="cancelTableEdit" class="text-red-500">✗</button>
    </div>
      </div>
    <ul v-if="table.active" class="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 pl-4 mt-2">
      <li v-for="column in table.columns"
          :key="column.name"
          class="p-2 rounded-lg relative flex flow-row cursor-pointer hover:bg-slate-100"
          @click="editDescription(column, $event)">
        <div class="justify-between text-sm mr-2">
          <span><strong>{{ column.name }}</strong> {{ column.data_type }}</span>
          <span v-if="column.is_primary_key" class="bg-green-200 text-green-800 px-2 py-1 rounded">Primary Key</span>
        </div>
        <div class="text-gray-500 text-s">
          <span v-if="!column.editing && column.description">{{ column.description }}</span>
          <span v-else-if="!column.editing">Click to add a description</span>
          <input v-else v-model="column.description" class="border p-1 text-sm"/>
          <button v-if="column.editing" @click.stop="saveDescription(column)" class="text-green-500">✓</button>
          <button v-if="column.editing" @click.stop="cancelEdit(column)" class="text-red-500">✗</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  props: ['table', 'db_connection_id'],
  data() {
    return {
      editingTable: false,
      tableDescription: this.table.description || '',
      columns: this.table.columns.map(column => ({
        ...column,
        editing: false,
        originalDescription: column.description || ''
      }))
    };
  },
  methods: {
    editTable(event) {
      event.stopPropagation();
      this.editingTable = true;
      this.tableDescription = this.table.description || '';
    },
    async saveTableDescription() {
      try {
        const response = await axios.put(`/api/v1/table-descriptions/${this.table.id}`, {
          id: this.table.id,
          description: this.tableDescription
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.table.description = this.tableDescription; // Update the local state
        this.editingTable = false;
        console.log('Table description updated:', response.data);
      } catch (error) {
        console.error('Failed to update table description:', error);
        alert('Failed to update table description.');
      }
    },
    cancelTableEdit() {
      this.editingTable = false;
      this.tableDescription = this.table.description; // Reset the description to the original
    },

    toggleColumns() {
      this.table.active = !this.table.active; // Toggle visibility of columns
    },
    editDescription(column, event) {
      event.stopPropagation();
      if (!column.editing) {
        column.editing = true;
      }
    },
    async saveDescription(column) {
      try {
        const response = await axios.put(`/api/v1/table-descriptions/${this.table.id}`, {
          columns: [{
            name: column.name,
            description: column.description,
            is_primary_key: column.is_primary_key,
            data_type: column.data_type,
            low_cardinality: column.low_cardinality,
            categories: column.categories,
            foreign_key: column.foreign_key
          }]
        }, {
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            'Content-Type': 'application/json'
          }
        });
        console.log('Update successful:', response.data);
        column.originalDescription = column.description; // Update original description after successful API call
        column.editing = false;
      } catch (error) {
        console.error('Failed to update description:', error);
        alert('Failed to update description.'); // Optionally alert the user
      }
    },
    cancelEdit(column) {
      column.editing = false;
      column.description = column.originalDescription; // Reset to original description
    }
  }
};
</script>

