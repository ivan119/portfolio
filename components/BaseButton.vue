<template>
  <component
  :is="component"
  :to="to || href"
  :target="external ? '_blank' : undefined"
  class="transition-colors ease-linear duration-200 inline-flex items-center"
  :class="[ // Dynamically add classes
    icon ? 'text-sm px-3 py-1 rounded-full' : '',
    variant === 'default' ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' : '',
    variant === 'primary' ? 'text-2xl text-teal-500 hover:text-teal-600' : '',
  ]"
  >
    <img
      v-if="icon"
      :src="icon"
      :alt="alt"
      class="w-4 h-4 rounded-sm"
    />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineNuxtLink } from '#app'

interface Props {
  to?: string
  href?: string
  external?: boolean
  icon?: string
  alt?: string
  variant?: 'default' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: 'default',
  alt: ''
})

const component = computed(() => {
  if (props.to || props.href) return defineNuxtLink({})
  return 'button'
})
</script>
