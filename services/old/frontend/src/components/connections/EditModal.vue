<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-gray-600 opacity-50" @click="cancel"></div>
    <div class="relative bg-white p-4 rounded-lg shadow-lg z-10">
      <h3 class="text-lg">Edit Description</h3>
      <input :value="description" @input="updateDescription($event.target.value)" class="border p-2 w-full mt-2"/>
      <button @click="save" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
      <button @click="cancel" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Cancel</button>
    </div>
  </div>
</template>


<script>
export default {
  props: ['description'],
  methods: {
    updateDescription(event) {
      this.$emit('update:description', event.target.value);
    },
    save() {
      this.$emit('save');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
/* Style as needed */
</style>
