<template>
  <nav class="bg-gray-100 border-b-2 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <router-link class="text-xl font-semibold text-gray-900 hover:text-gray-600" to="/">AIBI</router-link>
        <div class="hidden md:block">
          <ul class="flex space-x-8">
            <li>
              <router-link class="text-gray-700 hover:text-gray-500 hover:border-b-2 hover:border-gray-500" to="/connect">Connect to Database</router-link>
            </li>
            <li>
              <router-link class="text-gray-700 hover:text-gray-500 hover:border-b-2 hover:border-gray-500" to="/connections">Connections</router-link>
            </li>
            <li>
              <router-link class="text-gray-700 hover:text-gray-500 hover:border-b-2 hover:border-gray-500" to="/query">Query Data</router-link>
            </li>
            <li>
              <router-link class="text-gray-700 hover:text-gray-500 hover:border-b-2 hover:border-gray-500" to="/chat">Chat</router-link>
            </li>
            <li>
              <router-link class="text-gray-700 hover:text-gray-500 hover:border-b-2 hover:border-gray-500" to="/chat_dev">ChatDev</router-link>
            </li>
          </ul>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button type="button">
            <!-- Icon for mobile menu button -->
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar-test'
}
</script>

<style scoped>
@import url("../input.css");
/* Custom styles can still go here if needed */
</style>
