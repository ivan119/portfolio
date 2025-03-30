<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useColorMode } from "#imports";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const transitionMode = ref<"slide" | "fade">("fade");
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
const transition = new Object({
  name:
    transitionMode.value === "slide"
      ? transitionSlideDirection.value
      : transitionFade.value,
  mode: "out-in",
});

// Enable view transitions if browser supports it
onMounted(() => {
  if (document.startViewTransition) {
    const handleNavigation = () => {
      document.startViewTransition();
    };
    
    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    
    // Clean up
    onUnmounted(() => {
      window.removeEventListener('popstate', handleNavigation);
    });
  }
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto slide-enter-active"
  >
    <ClientOnly>
      <BackgroundScene />
      <template #fallback>
        <div class="fixed inset-0 w-full h-full z-[-1]" :style="{ backgroundColor: isDark ? '#091a28' : '#ffffff' }"></div>
      </template>
    </ClientOnly>
    <IntroComponent
      v-if="!showMainContent"
      class="grow no-animation"
      @update:show-main-content="(args) => changeState(args)"
      @show-logo="(args) => (showLogo = args)"
    />
    <navigation-header :show-logo="showLogo" @show-intro="testFunc" />
    <template v-if="showMainContent">
      <div class="flex-1">
        <div class="grow">
          <slot />
        </div>
      </div>
      <Footer class="container" />
    </template>
    <ScrollProgress />
  </div>
</template>

<style>
/* Enable smoother transitions */
:root {
  --view-transition-duration: 300ms;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--view-transition-duration);
}

/* Apply specific transitions for skill cards */
::view-transition-old(skill-*),
::view-transition-new(skill-*) {
  animation-duration: calc(var(--view-transition-duration) * 1.5);
}

/* Optional: Add fade effect to page transitions */
::view-transition-old(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
}
::view-transition-new(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
