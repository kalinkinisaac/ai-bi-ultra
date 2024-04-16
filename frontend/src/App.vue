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
import {SuperTokensConfig} from "@/config";
console.log("@!!(@!IBENL@!JEBNL@!JNEKL@!JNEKLJ@!NEKJLN!ASASZZZZ");
console.log(SuperTokensConfig);
export default {
  name: 'App1',
  components: {
    Navbar
  }
}
</script>

<!-- No global padding or margin is required; Tailwind utility classes handle the spacing -->
<style>
/* Styles removed as Tailwind handles layout and spacing */
</style>