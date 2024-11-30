<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "#imports";

const transitionMode = ref<"slide" | "fade">("slide");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");
const route = useRoute();

const showIntro = ref(false);
const showMainContent = computed(() => !showIntro.value);
const showLogo = ref(true);
const changeState = (value: Boolean) => {
  showIntro.value = !value;
};

const testFunc = () => {
  showLogo.value = false;
  setTimeout(() => {
    showIntro.value = true;
  }, 693);
};

// Watch route changes for slide direction
const transitionSlideDirection = computed(() => {
  return route.path === "/" ? "slide-left" : "slide-right";
});

// Compute whether to use page transition
const usePageTransition = computed(() => {
  const blacklist = ["blog", "projects"];
  return !blacklist.some((path) => route.path.startsWith(`/${path}`));
});

// Update transition on route change
const transition = computed(() => {
  return {
    name:
      transitionMode.value === "slide"
        ? transitionSlideDirection.value
        : transitionFade,
    mode: "out-in", // This is to ensure that there is a transition effect during route changes
  };
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto slide-enter-active"
  >
    <navigation-header :show-logo="showLogo" @show-intro="testFunc" />
    <IntroComponent
      v-if="!showMainContent"
      class="grow no-animation"
      @update:show-main-content="(args) => changeState(args)"
      @show-logo="(args) => (showLogo = args)"
    />
    <template v-if="showMainContent">
      <pre>{{ usePageTransition }}</pre>
      <pre>{{ transition }}</pre>
      <main class="flex-1">
        <NuxtPage class="container grow" :transition="transition" />
      </main>
      <Footer class="container" />
    </template>
  </div>
</template>
