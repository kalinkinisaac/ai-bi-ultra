export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // body:
  // {
  //   "llm_config": {
  //       "llm_name": "gpt-4-turbo-preview"
  //   },
  //   "max_rows": 100,
  //   "sql_generation": {
  //       "low_latency_mode": false,
  //       "llm_config": {
  //           "llm_name": "gpt-4-turbo-preview"
  //       },
  //       "evaluate": false,
  //       "metadata": {},
  //       "prompt": {
  //           "text": "Сколько всего складов у нас?",
  //           "db_connection_id": "65e8a30a81503cf7265b9fcc",
  //           "metadata": {}
  //       }
  //   }
  // }

  // res 500
  // {
  //   "id": "6602d49b72e270a8c60aa548",
  //   "metadata": null,
  //   "created_at": "2024-03-26T13:58:51.987710+00:00",
  //   "llm_config": {
  //       "llm_name": "gpt-4-turbo-preview",
  //       "api_base": null
  //   },
  //   "sql_generation_id": "6602d49a72e270a8c60aa547",
  //   "text": "I don't know, the SQL query is invalid."
  // }

  setResponseStatus(event, 201)

  return {
    "id": "6602df2d6e9ece74a958b8c0",
    "metadata": {},
    "created_at": "2024-03-26T14:43:57.494000+00:00",
    "prompt_id": "6602df2d6e9ece74a958b8bf",
    "finetuning_id": null,
    "status": "VALID",
    "completed_at": "2024-03-26T14:44:18.114000+00:00",
    "llm_config": {
      "llm_name": "gpt-4-turbo-preview",
      "api_base": null
    },
    "sql": "SELECT COUNT(id) AS total_warehouses -- Counts the total number of unique warehouse IDs\nFROM warehouse_dict;",
    "tokens_used": 4602,
    "confidence_score": null,
    "error": null
  }
})
