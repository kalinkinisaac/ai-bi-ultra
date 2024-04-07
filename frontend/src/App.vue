<template>
  <div id="app" class="flex flex-col h-screen">
    <Navbar />
    <div class="flex-1 overflow-hidden">
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

<!-- No global padding or margin is required; Tailwind utility classes handle the spacing -->
<style>
/* Styles removed as Tailwind handles layout and spacing */
</style>