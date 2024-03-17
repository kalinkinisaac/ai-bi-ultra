<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NuxtLink :to="{name: 'index'}">
          <NavigationMenuLink :class="navigationMenuTriggerStyle()">
          Index
          </NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>index</NavigationMenuTrigger>
          <NavigationMenuContent>
          <NavigationMenuLink>
            11s
            <NuxtLink :to="{name: 'index'}">index</NuxtLink>
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>


      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>
            <NuxtLink :to="{name: 'settings'}">settings</NuxtLink>

          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
