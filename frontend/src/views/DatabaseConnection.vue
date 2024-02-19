<template>
  <div class="database-connection">
    <h2>Connect to Your Database</h2>
    <form class="form-container" @submit.prevent="submitConnection">
      <label for="databaseType">Database Type:</label>
      <select id="databaseType" v-model="connectionData.databaseType">
        <option value="Postgres">Postgres</option>
        <option value="BigQuery">BigQuery</option>
        <option value="Databricks">Databricks</option>
        <option value="Snowflake">Snowflake</option>
      </select>
      <label for="db_connection_id">Connection ID:</label>
      <input type="text" id="db_connection_id" v-model="connectionData.db_connection_id"/>
      <label for="use_ssh">Use SSH:</label>
      <input type="checkbox" id="use_ssh" v-model="connectionData.use_ssh"/>
      <label for="connection_uri">Connection URI:</label>
      <input type="text" id="connection_uri" v-model="connectionData.connection_uri"/>
      <button type="submit">Connect</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DatabaseConnection',
  data() {
    return {
      connectionData: {
        databaseType: 'Postgres', // Default selection
        db_connection_id: '',
        use_ssh: false,
        connection_uri: ''
      }
    }
  },
  methods: {
    submitConnection() {
      // TODO: Implement the API call to create the connection using connectionData
      alert('Submit connection details here. Implement the API call.')
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 10px;
}

</style>
