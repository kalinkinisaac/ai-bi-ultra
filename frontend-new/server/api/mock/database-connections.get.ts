interface SshSettings {
  host: string | null
  username: string | null
  password: string
  port: number
  private_key_password: string
}

interface DatabaseConnectionsResponse {
  id: string
  alias: string
  use_ssh: boolean
  connection_uri: string
  path_to_credentials_file: string | null
  llm_api_key: string
  ssh_settings: SshSettings | null
  file_storage: null
  metadata: null
  created_at: string
}

export default defineEventHandler((event): DatabaseConnectionsResponse[] => {
  return [
    {
      id: '65e8a30a81503cf7265b9fcc',
      alias: 'soso',
      use_ssh: false,
      connection_uri: 'gAAAAABl6KMEFTxWeJpk6tTPGZYf7WZRNQiJsTKFdBczucfjWm2hTSxDErRZpWhpj3awYwdFPMK6E8p8hCDoBU7zy_R4y6E55hb_1kj-ztMQbLTDirQxa4kq0r2ZjyHrNShoWjGgprkxzsMzxOXcTwzqtsotuJ77uexWVU-24EjrZ_ejQBFc8vcMzQ5Wq139Hh2qr8jiVc0pPSZsDJ2Izniihiek0F77mQ==',
      path_to_credentials_file: null,
      llm_api_key: '',
      ssh_settings: {
        host: null,
        username: null,
        password: '',
        port: 22,
        private_key_password: '',
      },
      file_storage: null,
      metadata: null,
      created_at: '2024-03-06T17:08:20.141000+00:00',
    },
    {
      id: '65e8a31d81503cf7265b9fd4',
      alias: '',
      use_ssh: false,
      connection_uri: 'gAAAAABl6KMWkoqDBfVKFbEGOIgCwbvtxX7K7PRl54IPzYvWkg1uBdLe9Hs-2YrzMpsdptVMfxCKiZcwck57WSPfXTOYJDOX6PSNqs57k4QtPq2J3rZyzng8pgj8JfBmVSa5tXYAiIDHOEp_s0BuoCVE8rOTyiV5gVp2w3CjbI9PJ7pog7SiAeQ9NfuIsXAvp9nBmYys6tTQKA2-0yjEnuSfi0LQdixVNg==',
      path_to_credentials_file: null,
      llm_api_key: '',
      ssh_settings: {
        host: null,
        username: null,
        password: '',
        port: '22',
        private_key_password: '',
      },
      file_storage: null,
      metadata: null,
      created_at: '2024-03-06T17:08:38.982000+00:00',
    },
    {
      id: '65e8a33681503cf7265b9fdc',
      alias: 'hui',
      use_ssh: false,
      connection_uri: 'gAAAAABl6KMw7K58pFZs6GnSKySq5Xxaqelm3Z_1plIr9mEKGawZ3t8GEfrzm2OxvCH6I2jO4963g4Fuk6x2mVqJCZhxhU5rYphSEZgd03Gxp4tB949win6_G-pDovuR7S_JybWJMb6i5oLw5SuBo1qSpLW_kvgxLFz5MmUpV-IE1SRZd3xj1_GOFbDsMUwr3_-CvkxJ5j34VJGHx_fgOTGfMwP9H-SI2g==',
      path_to_credentials_file: null,
      llm_api_key: '',
      ssh_settings: {
        host: null,
        username: null,
        password: '',
        port: '22',
        private_key_password: '',
      },
      file_storage: null,
      metadata: null,
      created_at: '2024-03-06T17:09:04.418000+00:00',
    },
    {
      id: '6602d5d772e270a8c60aa549',
      alias: 'NOVOE',
      use_ssh: false,
      connection_uri: 'gAAAAABmAtXRXIgSUpYO-oek1j-HRsABV4FPO9ls13mvfLc6VJcLdr9mB1-on1_4g3M3Pw8dNjogC_8ss8GKN6RfykokX3kHepI8OVmPMFvynqTKBRxJ6lF5zGqar7wRBN44o4xnaJw8bgwQPrw6AiKP9Byt1gG0OTD0CtWwC_33-HKR_NnN1flEL320MTBY0icZTGiWpaD3Z4lzDiTR6NJZ8TFaJv5JMQ==',
      path_to_credentials_file: null,
      llm_api_key: '',
      ssh_settings: {
        host: null,
        username: null,
        password: '',
        port: '22',
        private_key_password: '',
      },
      file_storage: null,
      metadata: null,
      created_at: '2024-03-26T14:04:01.779000+00:00',
    },
  ]
})
