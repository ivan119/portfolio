<script setup lang="ts">
const dateNow = new Date();
const route = useRoute();
const blogClass = computed(() => {
  return route.name === "blog";
});
</script>

<template>
  <footer
    :class="{ 'md:text-center': blogClass }"
    class="text-left py-4 text-gray-600 dark:text-gray-400"
  >
    &copy; Ivan Kelava • CC BY-NC-SA 4.0
    {{ dateNow.getFullYear() }}
  </footer>
</template>
