<script setup lang="ts">
const dateNow = new Date();
const route = useRoute();
const blogClass = computed(() => {
  return route.name === "blog";
});
</script>

<template>
  <footer :class="{ 'md:text-center': blogClass }" class="footer-container">
    &copy; Ivan Kelava • CC BY-NC-SA 4.0
    {{ dateNow.getFullYear() }}
  </footer>
</template>
