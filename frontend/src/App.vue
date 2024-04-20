<template>
<!--  <h1 class="text-4xl text-blue-500">Test Tailwind</h1>-->
  <div id="app" class="flex flex-col h-screen">
    <Navbar />
    <div class="flex-1 overflow-y-auto">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
/* Styles removed as Tailwind handles layout and spacing */
</style>
