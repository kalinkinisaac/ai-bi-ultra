export default defineEventHandler((event) => {
  return {
    alias: '',
    use_ssh: false,
    connection_uri: '',
    ssh_settings: {
      host: '',
      port: null,
      username: '',
      password: '',
    },
    metadata: {
      dh_internal: {
        organization_id: '',
      },
    },
    id: '',
    created_at: '',
    bigquery_credential_file_content: '',
  }
})
