<template>
  <div class="query-data">
    <h2>Query Your Data</h2>
    <textarea v-model="naturalQuestion" placeholder="Type your question in natural language"></textarea>
    <button @click="submitQuestion">Generate SQL Query</button>
    <div v-if="generatedSql">
      <h3>Generated SQL Query:</h3>
      <pre>{{ generatedSql }}</pre>
    </div>
    <button v-if="generatedSql" @click="runQuery">Run Query</button>
    <div v-if="queryResults">
      <h3>Query Results:</h3>
      <!-- Display the results as a table or another suitable format -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'QueryData',
  data() {
    return {
      naturalQuestion: '',
      generatedSql: '',
      queryResults: null,
      db_connection_id: 'your_db_connection_id', // Replace with your actual database connection ID
      apiUrl: 'http://app/api/v1/prompts/sql-generations' // Adjust as needed for your API endpoint
    };
  },
  methods: {
    async submitQuestion() {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            low_latency_mode: false,
            llm_config: {
              llm_name: "mistralai/Mixtral-8x7B-Instruct-v0.1",
              api_base: "https://yourapibaseurl.com/v1" // Replace with the actual LLM config API base URL
            },
            evaluate: true,
            metadata: {},
            prompt: {
              text: this.naturalQuestion,
              db_connection_id: this.db_connection_id,
              metadata: {}
            }
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.generatedSql = data.sql; // Stores the generated SQL statement.
        // Optionally, call this.runQuery() here if you wish to execute the generated SQL immediately
      } catch (error) {
        console.error('Error submitting question:', error);
        alert('Failed to submit the natural language question.');
      }
    },
    async runQuery() {
      // Assuming a separate endpoint exists for executing SQL, replace 'yourQueryExecutionApiUrl' with the actual endpoint
      try {
        const executeApiUrl = 'yourQueryExecutionApiUrl'; // Replace this URL with the actual one for executing queries
        const response = await fetch(executeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            sql: this.generatedSql,
            db_connection_id: this.db_connection_id // May be required based on API specification
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.queryResults = data; // Stores the query results.
      } catch (error) {
        console.error('Error running query:', error);
        alert('Failed to execute the SQL query.');
      }
    }
  }
};
</script>

<style scoped>
/* Add styles for your query data page here */
</style>
