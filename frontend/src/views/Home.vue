<template>
  <div class="home text-center">
    <h1>Welcome to AIBI</h1>
    <p class="lead">The platform for analysts and IT managers to access data through natural language.</p>
    <div class="mt-4">
      <router-link class="btn btn-primary mr-2" to="/connect">Connect to Database</router-link>
      <router-link class="btn btn-secondary" to="/query">Query Data</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-test'
}
</script>