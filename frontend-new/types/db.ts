interface SshSettings {
  host: string | null;
  username: string | null;
  password: string;
  port: number;
  private_key_password: string;
}

export interface DatabaseConnectionsResponse {
  id: string;
  alias: string;
  use_ssh: boolean;
  connection_uri: string;
  path_to_credentials_file: string | null;
  llm_api_key: string;
  ssh_settings: SshSettings | null;
  file_storage: null;
  metadata: null;
  created_at: string;
}

export interface DatabaseConnectionsResponseError {
  error_code: string;
  message: string;
  description: string;
  detail: DatabaseConnectionsDetail;
}

interface DatabaseConnectionsDetail {
  alias: string;
  use_ssh: boolean;
  connection_uri: string;
  path_to_credentials_file: any;
  llm_api_key: any;
  ssh_settings: any;
  file_storage: any;
}
