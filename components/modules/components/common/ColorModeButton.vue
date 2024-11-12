<template>
  <button
    @click="toggleColorMode"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    aria-label="Toggle color mode"
  >
    <span v-if="colorMode.value === 'dark'" class="text-xl">🌙</span>
    <span v-else class="text-xl">☀️</span>
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>