<script setup lang="ts">
const transitionMode = ref<"slide" | "fade">("slide");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");
const route = useRoute();
watch(
  () => route.path,
  (page) => {
    transitionSlide.value = page === "/" ? "slide-left" : "slide-right";
  },
);
</script>

<style>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
<template>
  <div class="flex flex-col min-h-screen relative">
    <navigation-header />
    <NuxtPage
      v-if="true"
      class="container grow"
      :transition="{
        name: transitionMode === 'slide' ? transitionSlide : transitionFade,
        mode: 'out-in',
      }"
    />
    <Footer class="container" />
  </div>
</template>
