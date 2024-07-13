<template>
  <div class="cursor-pointer w-full flex flex-col items-start justify-between gap-2 rounded-lg my-1 text-sm">
    <div @click="toggleTables" class="cursor-pointer w-full flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-slate-100">
      <svg class="h-5 w-5 text-blue-500 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{'rotate-90': connection.active}">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <span class="font-bold text-xl">{{ connection.db_connection_alias }}</span>
      <span class="text-s text-gray-500">{{ connection.db_connection_id }}</span>
    </div>
    <div v-if="connection.active" class="w-full flex flex-col gap-2">
      <div v-if="connection.tables.length > 0">
        <table-item
          v-for="table in connection.tables"
          :key="table.id"
          :table="table"
          :db_connection_id="connection.db_connection_id"
          @toggle-columns="toggleColumns"
          @edit-description="handleEditDescription">
        </table-item>
      </div>
      <div v-else class="text-gray-500 italic p-2 pl-4">No tables found.</div>
    </div>
  </div>
</template>

<script>
import TableItem from './TableItem.vue';

export default {
  props: ['connection'],
  components: { TableItem },
  methods: {
    toggleTables() {
      this.$emit('toggle-tables', this.connection);
    },
    toggleColumns(table) {
      table.active = !table.active;  // Toggle the 'active' state of the table
      this.$forceUpdate(); // Optionally force Vue to re-render the component
    },
    handleEditDescription(column) {
      this.$emit('edit-description', column);
    }
  }
};
</script>
