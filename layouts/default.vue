<script setup lang="ts">
import { ref, computed, onUnmounted, onBeforeMount } from "vue";
import { useRoute, useColorMode } from "#imports";
import { useLocalStorage } from "@vueuse/core";
// Manage color mode and transition states
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const transitionMode = ref<"slide" | "fade">("fade");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");
const route = useRoute();

const showIntro = useLocalStorage("showIntro", true);
const showMainContent = computed(() => !showIntro.value);
const showLogo = ref(!showIntro.value);
// changeState will update and show main content
const changeState = (value: boolean) => {
  showIntro.value = !value;
};
// show logo will be shown as well when introComponent is destroyed
const updateShowLogo = (value: boolean) => {
  showLogo.value = value;
};
// showIntroComponent -> will show intro again if Logo is clicked on homepage
const showIntroComponent = () => {
  showLogo.value = false;
  setTimeout(() => {
    showIntro.value = true;
  }, 693);
};

// Background state management
const activeTheme = ref<"default" | "dotted" | "animated">("default");

// TODO: IMPROVE OPTIMIZE AND CLEANUP / TYPE IT! TS!
const setupTheme = () => {
  if (import.meta.client) {
    const themeSettings = localStorage.getItem("themeSettings");
    console.log(themeSettings);
    if (themeSettings !== null) {
      activeTheme.value = themeSettings;
    }
  }
};

const setupViewTransition = () => {
  if (document.startViewTransition) {
    const handleNavigation = () => {
      document.startViewTransition();
    };

    // Listen for navigation events
    window.addEventListener("popstate", handleNavigation);

    // Clean up
    onUnmounted(() => {
      window.removeEventListener("popstate", handleNavigation);
    });
  }
};
onBeforeMount(() => {
  setupTheme();
  setupViewTransition();
});

// Toggle functions for background states with better logic
const toggleAnimateBackground = (v) => {
  activeTheme.value = v;
  localStorage.setItem("themeSettings", activeTheme.value);
  console.log(activeTheme, "activeTheme on toggleAnimateBackground");
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
const transition = computed(() => ({
  name:
    transitionMode.value === "slide"
      ? transitionSlideDirection.value
      : transitionFade.value,
  mode: "out-in",
}));
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto"
  >
    <!-- Background with transition -->
    <Transition name="bg-fade">
      <BackgroundScene
        v-if="activeTheme === 'animated'"
        key="animated-bg"
        class="background-container"
      />
      <layout-components-dotted-layout
        v-else-if="activeTheme === 'dotted'"
        key="dotted-bg"
        class="background-container dotted-bg"
      />
      <div v-else key="default-bg" class="background-container static-bg"></div>
    </Transition>

    <div class="content-container relative z-10">
      <IntroComponent
        v-if="!showMainContent"
        class="grow no-animation"
        @update:show-main-content="changeState"
        @show-logo="updateShowLogo"
      />
      <navigation-header
        :show-logo="showLogo"
        :active-theme="activeTheme"
        @show-intro="showIntroComponent"
        @toggle-background="(v) => toggleAnimateBackground(v)"
      />

      <template v-if="showMainContent">
        <div class="flex-1">
          <div class="grow">
            <slot />
          </div>
        </div>
        <Footer class="container" />
      </template>

      <ScrollProgress :visibility="showMainContent" />
    </div>
  </div>
</template>

<style scoped>
/* Enable smoother transitions */
:root {
  --view-transition-duration: 369ms;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--view-transition-duration);
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
  min-height: 100dvh;
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
  transition:
    opacity 0.7s ease,
    transform 0.5s ease;
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
