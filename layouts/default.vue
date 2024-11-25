<script setup lang="ts">
const transitionMode = ref<"slide" | "fade">("slide");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");
const route = useRoute();

const showIntro = ref(false);
const showMainContent = computed(() => {
  return !showIntro.value;
});
const showLogo = ref(true);
const changeState = (value: Boolean) => {
  showIntro.value = !value;
};
const testFunc = () => {
  // TODO: MAKE THIS BETTER
  showLogo.value = false;
  setTimeout(() => {
    showIntro.value = true;
  }, 693);
};
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
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto"
  >
    <navigation-header :show-logo="showLogo" @show-intro="testFunc" />
    <IntroComponent
      v-if="showIntro"
      class="grow"
      @update:show-main-content="(args) => changeState(args)"
      @show-logo="(args) => (showLogo = args)"
    />
    <template v-if="showMainContent">
      <NuxtPage
        class="container grow"
        :transition="{
          name: transitionMode === 'slide' ? transitionSlide : transitionFade,
          mode: 'out-in',
        }"
      />
      <Footer class="container" />
    </template>
  </div>
</template>
