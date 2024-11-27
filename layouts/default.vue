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
const watchRoute = computed(() => {
  return route.path;
});
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
<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto slide-enter-active"
  >
    <navigation-header :show-logo="showLogo" @show-intro="testFunc" />
    <IntroComponent
      v-if="!showMainContent && watchRoute === '/'"
      class="grow no-animation"
      @update:show-main-content="(args) => changeState(args)"
      @show-logo="(args) => (showLogo = args)"
    />
    <template v-if="showMainContent">
      <main class="flex-1">
        <NuxtPage
          class="slide-enter-active container grow"
          :transition="{
            name: transitionMode === 'slide' ? transitionSlide : transitionFade,
            mode: 'out-in',
          }"
        />
      </main>
      <Footer class="container" />
    </template>
  </div>
</template>
