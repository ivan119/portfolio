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
const activeBg = ref<"default" | "dotted" | "animated">("default");
const animateBackground = ref(false);
const toggleDottedBg = ref(false);

// Helper function to validate dotted background state
const isValidDottedBg = (value: string | null): value is "true" | "false" => {
  return value === "true" || value === "false";
};

// Computed property for active background state
const activeBackgroundState = computed(() => {
  if (animateBackground.value) return "animated";
  if (toggleDottedBg.value) return "dotted";
  return "default";
});

// Watch activeBg changes and update localStorage and related states
watch(activeBg, (newValue) => {
  if (process.client) {
    localStorage.setItem("activeBackground", newValue);
    // Update related states based on activeBg
    if (newValue === "animated") {
      animateBackground.value = true;
      toggleDottedBg.value = false;
      localStorage.setItem("animateBackground", "true");
      localStorage.setItem("dottedBackground", "false");
    } else if (newValue === "dotted") {
      toggleDottedBg.value = true;
      animateBackground.value = false;
      localStorage.setItem("dottedBackground", "true");
      localStorage.setItem("animateBackground", "false");
    } else {
      animateBackground.value = false;
      toggleDottedBg.value = false;
      localStorage.setItem("animateBackground", "false");
      localStorage.setItem("dottedBackground", "false");
    }
  }
}, { immediate: true });

// Initialize from localStorage on mount
onBeforeMount(() => {
  if (process.client) {
    const savedActiveBg = localStorage.getItem("activeBackground");
    const savedPreference = localStorage.getItem("animateBackground");
    const isDottedBg = localStorage.getItem("dottedBackground");
    
    // Set activeBg from localStorage if valid
    if (savedActiveBg && ["default", "dotted", "animated"].includes(savedActiveBg)) {
      activeBg.value = savedActiveBg as "default" | "dotted" | "animated";
    }
    
    // Legacy support for old localStorage keys
    if (isValidDottedBg(isDottedBg)) {
      toggleDottedBg.value = isDottedBg === "true";
    }
    if (savedPreference !== null) {
      animateBackground.value = savedPreference === "true";
    }
  }

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
});

// Computed property for better state management
const isAnimatedActive = computed(() => activeBg.value === "animated");
const isDottedActive = computed(() => activeBg.value === "dotted");
const isDefaultActive = computed(() => activeBg.value === "default");

// Toggle functions for background states with better logic
const toggleAnimateBackground = () => {
  if (activeBg.value === "animated") {
    activeBg.value = "default";
  } else {
    activeBg.value = "animated";
  }
};

const toggleDottedBackground = (newLayout?: string) => {
  // Handle both direct calls and event-based calls
  if (newLayout) {
    activeBg.value = newLayout === "dotted" ? "dotted" : "default";
  } else {
    activeBg.value = activeBg.value === "dotted" ? "default" : "dotted";
  }
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
        v-if="activeBg === 'animated'"
        key="animated-bg"
        class="background-container"
      />
      <layout-components-dotted-layout
        v-else-if="activeBg === 'dotted'"
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
        :active-bg="activeBg"
        :animate-background="isAnimatedActive"
        :dotted-bg-prop="isDottedActive"
        @show-intro="showIntroComponent"
        @toggle-background="toggleAnimateBackground"
        @toggle-layout="toggleDottedBackground"
      />

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
  </div>
</template>

<style scoped>
/* Enable smoother transitions */
:root {
  --view-transition-duration: 300ms;
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
.mainClass {
  background: red !important;
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
