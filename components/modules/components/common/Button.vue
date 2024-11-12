<template>
  <button
    :class="[
      'text-lg transition-colors duration-300',
      variant === 'primary' ? 'hover:text-purple-500 dark:hover:text-purple-400' : 'hover:text-blue-500 dark:hover:text-blue-400'
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>