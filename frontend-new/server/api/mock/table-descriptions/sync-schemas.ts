export default defineEventHandler((event) => {
  return {
    result: 'Смотри. Вообще ответ 10, но не все так однозначно, поэтому вот тебе расклад\nЯ бы сказал что это заговор',
    sql: '',
  }
})

// post
// 201 Created

// payload
// {
//     "db_connection_id": "65e8a30a81503cf7265b9fcc"
// }

// res
// [
//   {
//       "id": "65e8a30a81503cf7265b9fcd",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "del_type_dict",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.846684+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fce",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "orders_aibi",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.851623+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fcf",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "del_option_dict",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.852570+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fd0",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "status_dict",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.853728+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fd2",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "warehouse_dict",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.854499+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fd1",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "del_type",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.855308+00:00"
//   },
//   {
//       "id": "65e8a30a81503cf7265b9fd3",
//       "db_connection_id": "65e8a30a81503cf7265b9fcc",
//       "table_name": "pg_stat_statements",
//       "description": null,
//       "table_schema": null,
//       "columns": [],
//       "examples": [],
//       "last_schema_sync": null,
//       "status": "SYNCHRONIZING",
//       "error_message": null,
//       "metadata": null,
//       "created_at": "2024-03-26T13:56:47.856251+00:00"
//   }
// ]
