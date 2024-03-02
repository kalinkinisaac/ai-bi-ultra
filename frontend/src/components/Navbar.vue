<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">AIBI</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/connect">Connect to Database</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/connections">Connections</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/query">Query Data</router-link>
          </li>
        </ul>
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
/* You can still add custom styles if needed */
</style>
