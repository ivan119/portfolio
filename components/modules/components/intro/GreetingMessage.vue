<template>
  <ClientOnly>
    <p class="mt-12 text-sm text-gray-600 dark:text-gray-400">
      {{ greeting }}
    </p>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const greeting = computed(() => {
  return colorMode.value === 'dark' 
    ? '✨ Nice evening!' 
    : '☀️ Have a good one!'
})
</script>