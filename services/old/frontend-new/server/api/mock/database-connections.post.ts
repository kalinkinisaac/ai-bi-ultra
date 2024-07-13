export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    id: "6602d5d772e270a8c60aa549",
    alias: "NOVOE",
    use_ssh: false,
    connection_uri:
      "gAAAAABmAtXRXIgSUpYO-oek1j-HRsABV4FPO9ls13mvfLc6VJcLdr9mB1-on1_4g3M3Pw8dNjogC_8ss8GKN6RfykokX3kHepI8OVmPMFvynqTKBRxJ6lF5zGqar7wRBN44o4xnaJw8bgwQPrw6AiKP9Byt1gG0OTD0CtWwC_33-HKR_NnN1flEL320MTBY0icZTGiWpaD3Z4lzDiTR6NJZ8TFaJv5JMQ==",
    path_to_credentials_file: null,
    llm_api_key: "",
    ssh_settings: {
      host: null,
      username: null,
      password: "",
      port: "22",
      private_key_password: "",
    },
    file_storage: null,
    metadata: null,
    created_at: "2024-03-26T14:04:01.779111+00:00",
  };
});
