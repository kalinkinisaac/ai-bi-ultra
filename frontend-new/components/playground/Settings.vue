<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger
// } from '@/components/ui/tooltip'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'

// import { ScrollArea } from '@/components/ui/scroll-area'

// const form = ref({
//   database: '',
// })

// const query = ref('')
// const answer = ref({})
// const onSubmit = () => {
//   // alert('hui')

//   console.log('res', res)
//   // answer.value =
// }
</script>

<template>
  <form class="grid w-full items-start gap-6">
    <fieldset class="grid gap-6 rounded-lg border p-4">
      <legend class="-ml-1 px-1 text-sm font-medium">
        Настройки
      </legend>
      <div class="grid gap-3">
        <Label for="model">Model</Label>
        <Select>
          <SelectTrigger
            id="model"
            class="[&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="genesis">
              <div class="flex items-center gap-3 text-muted-foreground">
                <IconRabbit class="size-5" />
                <div class="grid gap-0.5">
                  <p>
                    Neural
                    <span class="font-medium text-foreground">
                      Genesis
                    </span>
                  </p>
                  <p
                    class="text-xs"
                    data-description
                  >
                    Our fastest model for general use cases.
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="explorer">
              <div class="flex items-center gap-3 text-muted-foreground">
                <IconBird class="size-5" />
                <div class="grid gap-0.5">
                  <p>
                    Neural
                    <span class="font-medium text-foreground">
                      Explorer
                    </span>
                  </p>
                  <p
                    class="text-xs"
                    data-description
                  >
                    Performance and speed for efficiency.
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="quantum">
              <div class="flex items-center gap-3 text-muted-foreground">
                <IconTurtle class="size-5" />
                <div class="grid gap-0.5">
                  <p>
                    Neural
                    <span class="font-medium text-foreground">
                      Quantum
                    </span>
                  </p>
                  <p
                    class="text-xs"
                    data-description
                  >
                    The most powerful model for complex computations.
                  </p>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid gap-3">
        <Label for="temperature">Temperature</Label>
        <Input
          id="temperature"
          type="number"
          placeholder="0.4"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-3">
          <Label for="top-p">Top P</Label>
          <Input
            id="top-p"
            type="number"
            placeholder="0.7"
          />
        </div>
        <div class="grid gap-3">
          <Label for="top-k">Top K</Label>
          <Input
            id="top-k"
            type="number"
            placeholder="0.0"
          />
        </div>
      </div>
    </fieldset>
    <fieldset class="grid gap-6 rounded-lg border p-4">
      <legend class="-ml-1 px-1 text-sm font-medium">
        Messages
      </legend>
      <div class="grid gap-3">
        <Label for="role">Role</Label>
        <Select default-value="system">
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">
              System
            </SelectItem>
            <SelectItem value="user">
              User
            </SelectItem>
            <SelectItem value="assistant">
              Assistant
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid gap-3">
        <Label for="content">Content</Label>
        <Textarea
          id="content"
          placeholder="You are a..."
          class="min-h-[9.5rem]"
        />
      </div>
    </fieldset>
  </form>
</template>
