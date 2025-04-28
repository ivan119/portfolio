<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect } from "vue";
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

// Animation background toggle state
const animateBackground = ref(false);

// Toggle animation background
const toggleBackground = () => {
  animateBackground.value = !animateBackground.value;

  // Store preference in localStorage
  if (process.client) {
    localStorage.setItem('animateBackground', animateBackground.value.toString());
  }
};

// Initialize from localStorage on mount
onMounted(() => {
  if (process.client) {
    const savedPreference = localStorage.getItem('animateBackground');
    if (savedPreference !== null) {
      animateBackground.value = savedPreference === 'true';
    }
  }

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
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto"
  >
    <!-- Background with transition -->
    <Transition name="bg-fade" mode="out-in">
      <div v-if="animateBackground" key="animated-bg" class="background-container">
        <BackgroundScene />
      </div>
      <div v-else key="static-bg" class="background-container static-bg"
           :style="{ backgroundColor: isDark ? '#091a28' : '#ffffff' }">
      </div>
    </Transition>

    <div class="content-container relative z-10">
      <IntroComponent
        v-if="!showMainContent"
        class="grow no-animation"
        @update:show-main-content="(args) => changeState(args)"
        @show-logo="(args) => (showLogo = args)"
      />

      <navigation-header
        :show-logo="showLogo"
        :animate-background="animateBackground"
        @show-intro="testFunc"
        @toggle-background="toggleBackground"
      />

      <template v-if="showMainContent">
        <div class="flex-1">
          <div class="grow">
            <Transition name="fade" mode="out-in">
              <slot />
            </Transition>
          </div>
        </div>
        <Footer class="container" />
      </template>

      <ScrollProgress />
    </div>
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

/* Content container for proper z-index ordering */
.content-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* Background transition effects */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.static-bg {
  transition: background-color 0.5s ease;
}

/* Transition for background animation toggle */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 0.7s ease, transform 0.5s ease;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

:deep(.group-hover\:text-main-gradient) {
  @apply transition-colors duration-300;
}

:deep(.group:hover .group-hover\:text-main-gradient) {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
</style>
