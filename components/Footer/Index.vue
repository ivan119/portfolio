<script setup lang="ts">
const dateNow = new Date();
</script>

<template>
  <footer class="text-left py-4 text-gray-600 dark:text-gray-400">
    &copy; Ivan Kelava • CC BY-NC-SA 4.0 {{ dateNow.getFullYear() }}
  </footer>
</template>
