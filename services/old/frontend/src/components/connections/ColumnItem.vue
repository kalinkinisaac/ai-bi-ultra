<template>
  <div class="cursor-pointer w-full flex flex-col items-start justify-between gap-2 rounded-lg hover:bg-slate-200 my-1 text-sm">
    <div @click="$emit('toggle-tables', connection)" class="cursor-pointer w-full flex items-start gap-2 p-2 rounded-xl transition-colors hover:bg-slate-100">
      <svg class="h-4 w-4 text-blue-500 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{'rotate-90': connection.active}">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <span class="font-bold">{{ connection.db_connection_alias }}</span>
      <span class="text-xs text-gray-500 ml-2">{{ connection.db_connection_id }}</span>
    </div>
    <div v-if="connection.active" class="flex flex-col gap-2">
      <table-item v-for="table in connection.tables" :key="table.id" :table="table" @edit-description="$emit('edit-description', $event)"></table-item>
    </div>
  </div>
</template>

<script>
import TableItem from './TableItem.vue';

export default {
  props: ['connection'],
  components: { TableItem }
};
</script>
