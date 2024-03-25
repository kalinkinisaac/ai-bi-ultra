<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const form = ref({
  database: '',
})
</script>

<template>
  <div class="relative flex flex-col">
    <div class="absolute left-1">
      <Select v-model="form.database">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Выберите подключение" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="samokat-test">
              КГБ
            </SelectItem>
            <SelectItem value="samokat-prod">
              ФСБ
            </SelectItem>
            <SelectItem value="samokat-3">
              ЦРУ
            </SelectItem>
            <SelectItem value="samokat-2">
              НАТО
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="mt-auto">
      <pre class="mt-10">{{ form }}</pre>
      <p class="text-xl">
        Кароче это начало
      </p>
      <p>asdads</p>

      <div class="mt-auto border">
        asd
      </div>

      <div class="w-full border rounded-md p-1 flex">
        <Button
          variant="outline"
          size="icon"
        >
          <IconLink />
        </Button>
        <Button
          class="ml-auto"
          size="icon"
        >
          <IconSendHorizonal />
        </Button>
      </div>
    </div>
  </div>
</template>
