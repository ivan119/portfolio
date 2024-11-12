<script setup lang="ts">
interface TransitionState {
  mode: "slide" | "fade";
  slide: string;
  fade: string;
}

// State management
const transition = reactive<TransitionState>({
  mode: "slide",
  slide: "slide-right",
  fade: "page",
});

const state = reactive({
  showIntro: true,
  showLogo: false,
});

// Computed properties
const showMainContent = computed(() => !state.showIntro);

// Route handling
const route = useRoute();
watch(
  () => route.path,
  (page) => {
    transition.slide = page === "/" ? "slide-left" : "slide-right";
  },
);

// Methods
const toggleIntro = (value: boolean) => {
  state.showIntro = !value;
};

const handleIntroTransition = async () => {
  state.showLogo = false;
  await new Promise((resolve) => setTimeout(resolve, 693));
  state.showIntro = true;
};
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto"
  >
    <navigation-header
      :show-logo="state.showLogo"
      @show-intro="handleIntroTransition"
    />

    <Transition name="page">
      <IntroComponent
        v-if="state.showIntro && !showMainContent"
        class="grow"
        @update:show-main-content="toggleIntro"
        @show-logo="(value) => (state.showLogo = value)"
      />
    </Transition>

    <NuxtPage
      v-if="showMainContent && !state.showIntro"
      class="container grow"
      :transition="{
        name: state.showIntro ? transition.fade : transition.slide,
        mode: 'out-in',
      }"
    />

    <Transition name="page">
      <Footer v-if="showMainContent && !state.showIntro" class="container" />
    </Transition>
  </div>
</template>

<style scoped>
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
