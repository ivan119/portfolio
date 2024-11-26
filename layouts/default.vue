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

.slide-enter-active > *:not(.no-animation) {
  animation: slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: backwards;
}

.slide-enter-active > *:not(.no-animation):nth-child(1) { animation-delay: 0.15s }
.slide-enter-active > *:not(.no-animation):nth-child(2) { animation-delay: 0.3s }
.slide-enter-active > *:not(.no-animation):nth-child(3) { animation-delay: 0.45s }
.slide-enter-active > *:not(.no-animation):nth-child(4) { animation-delay: 0.6s }
.slide-enter-active > *:not(.no-animation):nth-child(5) { animation-delay: 0.75s }

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
