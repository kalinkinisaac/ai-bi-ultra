<template>
  <div class="max-w-2xl mx-auto my-8 space-y-6">
    <h2 class="text-3xl font-bold text-center text-gray-800">Query Your Data</h2>

    <div class="space-y-4">
      <div>
        <label for="databaseType" class="block text-sm font-medium text-gray-700">Select a connection</label>
        <select v-model="selectedConnectionId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option disabled value="">Select a connection</option>
          <option v-for="connection in connections" :key="connection.id" :value="connection.id">
            {{ connection.alias }} ({{ connection.id }})
          </option>
        </select>
      </div>
      <button @click="syncSchemas" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sync Schemas
      </button>
      <textarea v-model="naturalQuestion" placeholder="Type your question in natural language" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"></textarea>
      <button @click="submitQuestion" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Generate SQL Query
      </button>
    </div>

    <div v-if="nlResponse" class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <h3 class="font-bold">Generated response in natural language:</h3>
      <pre class="whitespace-pre-wrap">{{ nlResponse }}</pre>
    </div>
    <div v-if="generatedSql" class="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
      <h3 class="font-bold">Generated SQL Query:</h3>
      <pre class="whitespace-pre-wrap">{{ generatedSql }}</pre>
    </div>
  </div>
</template>



<script>
export default {
  name: 'QueryData',
  data() {
    return {
      naturalQuestion: '',
      nlResponse: '',
      generatedSql: '',
      queryResults: null,
      db_connection_id: '', // This will now be dynamically set by the user
      selectedConnectionId: '',
      connections: [],
      apiUrl: '/api/v1/prompts/sql-generations/nl-generations' // Updated endpoint
    };
  },
  mounted() {
    this.fetchConnections();
  },


  methods: {
    async syncSchemas() {
      try {
        const response = await fetch('/api/v1/table-descriptions/sync-schemas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            db_connection_id: this.selectedConnectionId
            ,
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error syncing schemas:', error);
      }
    },
    // This is your existing method, with modifications to use the new endpoint.
    async submitQuestion() {
      var data;
      const debug = false;
      try {
        const payload = {
          llm_config: {"llm_name": "gpt-4-turbo-preview"},
          max_rows: 100,
          sql_generation: {
            "low_latency_mode": false,
            "llm_config": {"llm_name": "gpt-4-turbo-preview"},
            "evaluate": false,
            "metadata": {},
            "prompt": {
              "text": this.naturalQuestion,
              "db_connection_id": this.selectedConnectionId,
              "metadata": {}
            }
          }
        };
        if (debug) {
          data = {
            id: "65e380f5666a3b904a71393f",
            metadata: null,
            created_at: "2024-03-02T19:41:41.800439+00:00",
            llm_config: {llm_name: "gpt-4-turbo-preview", api_base: null},
            sql_generation_id: "65e380e5666a3b904a71393e",
            text: "Кок",
          }
        } else {
          const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });


          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          data = await response.json();
          console.log(data);
          this.nlResponse = data.text; // Stores the generated SQL statement.
        }
        // Optionally, call this.runQuery() here if you wish to execute the generated SQL immediately
      } catch (error) {
        console.error('Error submitting question:', error);
        alert('Failed to get nl answer.');
      }

      try {
        const response = await fetch(`/api/v1/sql-generations/${data.sql_generation_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
        console.log(data);
        this.generatedSql = data.sql;
      } catch (error) {
        console.error('Error getting sql query:', error);
        alert('Failed to get sql.');
      }

    },

    async fetchConnections() {
      try {
        const response = await fetch('/api/v1/database-connections', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming the API returns an array of connection objects with "id" and "alias"
        const data = await response.json();
        this.connections = data.map(conn => ({id: conn.id, alias: conn.alias}));
      } catch (error) {
        console.error('Error fetching connections:', error);
        // Handle the error accordingly
      }
    },

    // The rest of your existing methods.
    async runQuery() {
      // Assuming a separate endpoint exists for executing SQL, replace 'yourQueryExecutionApiUrl' with the actual endpoint
      try {
        const executeApiUrl = '/api/prompts/sql-generations/nl-generations'; // Replace this URL with the actual one for executing queries
        const response = await fetch(executeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            sql: this.generatedSql,
            db_connection_id: this.selectedConnectionId
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
.query-data {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 10px;
}

/* ... existing styles ... */
.message-container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.message-box {
  background-color: #e5e5ea;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 75%;
  align-self: flex-start;
}
</style>

