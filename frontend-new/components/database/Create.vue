<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useToast } from '@/components/ui/toast/use-toast'

// TODO: test toast
const { toast } = useToast()

const model = defineModel<boolean>()
const emit = defineEmits<{
  success: []
}>()

const isPasswordShown = ref(false)
const isPending = ref(false)
const dbTypes = {
  postgres: {
    name: 'Postgres',
    protocol: 'postgresql+psycopg2://',
  },
  mysql: {
    name: 'MySQL / MariaDB',
    protocol: 'mysql+pymysql://',
  },
  mssql: {
    name: 'MSSQL Server',
    protocol: 'mssql+pymssql://',
  },
}

const formSchema = toTypedSchema(
  z.object({
    // id: z.string(),
    alias: z.string(),
    connection_uri: z.string().min(1, 'Введите адрес подключения к БД'),
    connection: z.object({
      db_type: z.string({
        required_error: 'Выберите тип БД',
      }),
      user: z.string().min(1),
      password: z.string().min(1),
      host: z.string().min(1),
      // port: z.string(),
      db_name: z.string().min(1),
    }).nullable(),
    // llm_api_key: z.string(),
    // use_ssh: z.boolean(),
    // ssh_settings: z.object({
    //   host: z.string().nullable(),
    //   username: z.string().nullable(),
    //   password: z.string(),
    //   port: z.number(),
    //   private_key_password: z.string(),
    // }).nullable(),
    // path_to_credentials_file: z.string().nullable(),
    // file_storage: z.string().nullable(),
    // metadata: z.string().nullable(),
    // created_at: z.string().datetime({ offset: true }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const errorTypes = {
  invalid_database_connection: 'Не удалось подключиться к базе данных, используя указанные доступы',
}
const error = ref<keyof typeof errorTypes | null>('invalid_database_connection')

const generatedUri = computed(() => {
  const { values } = form
  let uri = ''
  switch (values.connection?.db_type) {
    case 'postgres':
    case 'mysql':
      uri += `${dbTypes[values.connection?.db_type].protocol}${values.connection?.user}:${values.connection?.password}@${values.connection?.host}${values.connection?.port ? `:${values.connection?.port}` : ''}/${values.connection?.db_name}`
      break
    case 'mssql':
      uri += `${dbTypes[values.connection?.db_type].protocol}${values.connection?.user}:${values.connection?.password}@${values.connection?.host}${values.connection?.port ? `:${values.connection?.port}` : ''}/${values.connection?.db_name}`
      break
    default: break
  }
  return uri
})

const onSubmit = async () => {
  console.log('onSubmit!')
  // Чистим старую ошибку от сервера
  error.value = null

  if (form.values.connection) {
    form.setFieldValue('connection_uri', generatedUri.value)
    // errors.connection_uri = 'hui'
  }
  else {
    // form.setValues('connection', {})
    form.resetField('connection')
  }
  // console.log('vals!', form.values)

  const { valid, errors } = await form.validate()
  console.log('isValid!', valid, errors)
  if (valid) {
    console.log('isValid! sent to API')

    if (form.values.connection) {
      form.values.connection_uri = generatedUri.value
    }

    isPending.value = true
    console.log('sent start load', form.values)

    const { connection, ...neededValues } = form.values

    const res = $fetch('/api/v1/database-connections', {
      method: 'POST',
      body: neededValues,
    })
      .then(data => {
        toast({
          title: `База данных "${form.values.alias}" успешно добавлена`,
          description: 'Перейдите в чат, чтобы ее использовать',
        })
        emit('success')
        // new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     reject(data)
        //   }, 3000)
        // })
      })
      .catch((reason) => {
        console.error('error', reason)
        error.value = reason
      })
      .finally(() => {
        console.log('finally')
        isPending.value = false
      })
    console.log('res create', res)
  }
}
</script>

<template>
  <Dialog
    v-model:open="model"
  >
    <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Создание подключения</DialogTitle>
        <DialogDescription>
          Дверь мне запилил!
        </DialogDescription>
      </DialogHeader>

      <Button
        @click="() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
          console.log(11)
        }"
      >
        Add to calendar
      </Button>
      <Toaster />


      <FormField
        v-slot="{ componentField }"
        name="alias"
      >
        <FormItem>
          <FormLabel>Название соединения</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Какое-то название"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Tabs
        default-value="basic"
        class="mt-2"
      >
        <TabsList>
          <TabsTrigger value="basic">
            Базовое
          </TabsTrigger>
          <TabsTrigger value="uri">
            Адрес (URI)
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="basic"
          class="flex flex-col gap-4"
        >
          <div />
          <FormField
            v-slot="{ componentField }"
            name="connection.db_type"
          >
            <FormItem>
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип БД" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="(type, i) in dbTypes"
                      :key="i"
                      :value="i"
                    >
                      {{ type.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="connection.user"
          >
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Логин"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="connection.password"
          >
            <FormItem>
              <FormControl>
                <div class="relative w-full max-w-sm items-center">
                  <Input
                    class="pr-10"
                    placeholder="Пароль"
                    autocomplete="new-password"
                    v-bind="componentField"
                    :type="isPasswordShown ? `text` : `password`"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    class="absolute end-0 inset-y-0"
                    @click="isPasswordShown = !isPasswordShown"
                  >
                    <IconEye
                      v-if="!isPasswordShown"
                      class="size-6 text-muted-foreground"
                    />
                    <IconEyeOff
                      v-else
                      class="size-6 text-muted-foreground"
                    />
                    <!-- <component
                        :is="isPasswordShown ? IconEyeOff: IconEye"
                        class="size-6 text-muted-foreground"
                      /> -->
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="grid grid-cols-4 gap-4">
            <FormField
              v-slot="{ componentField }"
              name="connection.host"
            >
              <FormItem class="col-span-3">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Хост"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField }"
              name="connection.port"
            >
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Порт"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField
            v-slot="{ componentField }"
            name="connection.db_name"
          >
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Название таблицы"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </TabsContent>
        <TabsContent value="uri">
          <FormField
            v-slot="{ componentField }"
            name="connection_uri"
          >
            <FormItem>
              <FormLabel>Адрес для подключения</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="text"
                />
              </FormControl>
              <FormDescription>
                Пример:
                <code>
                  {{ `postgresql+psycopg2://<user>:<password>@<host>:<port>/<db-name>` }}
                </code>
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </TabsContent>
      </Tabs>

      <Alert
        v-if="error"
        variant="destructive"
      >
        <IconAlertCircle class="w-4 h-4" />
        <AlertTitle>У-упс, ошибочка</AlertTitle>
        <AlertDescription>
          {{ errorTypes?.[error] || 'Неизвестная ошибка' }}
        </AlertDescription>
      </Alert>

      <DialogFooter>
        <Button
          type="submit"
          :disabled="isPending"
          @click="onSubmit"
        >
          <LazyIconLoaderCircle
            v-if="isPending"
            class="w-4 h-4 mr-2 animate-spin"
          />
          Сохранить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
