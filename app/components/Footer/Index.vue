<script setup lang="ts">
const year = new Date().getFullYear()
const route = useRoute();
const blogClass = computed(() => {
  return route.name === "blog";
});
</script>

<template>
  <footer
    :class="{ 'md:text-center': blogClass }"
    class="footer-container animate-fade-in-blur-3d"
  >
    &copy; Ivan Kelava • CC BY-NC-SA 4.0
    {{ year }}
  </footer>
</template>

<style scoped>
.footer-container {
  @apply text-left w-full text-gray-600 dark:text-gray-400;
}

.animate-fade-in-blur-3d {
  animation: fadeInBlur3D 0.963s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  display: inline-block; /* helps with transform */
}
@keyframes fadeInBlur3D {
  0% {
    opacity: 0;
    filter: blur(9px) brightness(0.639);
    transform: perspective(963px) translateZ(-96px);
  }
  100% {
    opacity: 1;
    filter: blur(0) brightness(1);
    transform: perspective(963px) translateZ(0);
  }
}
</style>
