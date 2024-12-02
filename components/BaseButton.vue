<template>
  <component
    :is="component"
    :to="to || href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="transition-colors duration-200 inline-flex items-center"
    :class="buttonClasses"
  >
    <img
      v-if="icon"
      :src="icon"
      :alt="alt"
      :loading="loading"
      class="w-4 h-4 rounded-sm"
      width="16"
      height="16"
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
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: 'default',
  alt: '',
  loading: 'eager'
})

const buttonClasses = computed(() => [
  props.icon ? 'text-sm px-3 py-1 rounded-full' : '',
  props.variant === 'default' ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' : '',
  props.variant === 'primary' ? 'text-2xl text-teal-500 hover:text-teal-600' : '',
])

const component = computed(() => {
  if (props.to || props.href) return defineNuxtLink({})
  return 'button'
})
</script>
