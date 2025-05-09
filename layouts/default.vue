<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect } from "vue";
import { useRoute, useColorMode } from "#imports";

// State management
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
const showIntro = ref(false);
const showMainContent = computed(() => !showIntro.value);
const showLogo = ref(true);
const animateBackground = ref(false);

// Route and transition management
const route = useRoute();
const transitionMode = ref<"slide" | "fade">("fade");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");

// Computed properties for transitions
const transitionSlideDirection = computed(() => {
  return route.path === "/" ? "slide-left" : "slide-right";
});

const usePageTransition = computed(() => {
  const blacklist = ["blog", "projects"];
  return !blacklist.some((path) => route.path.startsWith(`/${path}`));
});

// Event handlers
const changeState = (value: Boolean) => {
  showIntro.value = !value;
};

const testFunc = () => {
  showLogo.value = false;
  setTimeout(() => {
    showIntro.value = true;
  }, 693);
};

const toggleBackground = () => {
  animateBackground.value = !animateBackground.value;
  if (process.client) {
    localStorage.setItem('animateBackground', animateBackground.value.toString());
  }
};

// Lifecycle hooks
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
    window.addEventListener('popstate', handleNavigation);
    onUnmounted(() => {
      window.removeEventListener('popstate', handleNavigation);
    });
  }
});

// Transition configuration
const transition = computed(() => ({
  name: transitionMode.value === "slide" ? transitionSlideDirection.value : transitionFade.value,
  mode: "out-in",
}));
</script>

<template>
  <div class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto">
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
            <Transition v-bind="transition">
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
@reference "tailwindcss";

/* View Transitions */
:root {
  --view-transition-duration: 300ms;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--view-transition-duration);
}

::view-transition-old(skill-*),
::view-transition-new(skill-*) {
  animation-duration: calc(var(--view-transition-duration) * 1.5);
}

::view-transition-old(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
}

::view-transition-new(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
}

/* Layout Structure */
.content-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

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

/* Transitions */
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

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Utility Classes */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.gradient-text {
  background-image: linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
