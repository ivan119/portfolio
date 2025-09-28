<script setup lang="ts">
import { useRoute, useColorMode } from "#imports";
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
// Manage color mode and transition states
const colorMode = useColorMode();
const { activeTheme } = useThemeButtons();

const isDark = computed(() => colorMode.value === "dark");
const transitionMode = ref<"slide" | "fade">("fade");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");
const route = useRoute();
const showIntro = useCookie<boolean>("showIntro", {
  default: () => true,
  watch: true, // keep it reactive
  sameSite: "lax",
});
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
  setupViewTransition();
});

// Watch route changes for slide direction
const transitionSlideDirection = computed(() => {
  return route.path === "/" ? "slide-left" : "slide-right";
});
// Update transition on route change
const transition = computed(() => ({
  name:
    transitionMode.value === "slide"
      ? transitionSlideDirection.value
      : transitionFade.value,
  mode: "out-in",
}));
const handleShowContent = () => {
  if (route.path !== "/" && showIntro.value) {
    showIntro.value = false;
    updateShowLogo(true);
  }
};
watch(
  () => route.path,
  () => {
    handleShowContent();
  },
  { immediate: true },
);
// Handle case where we
watch(
  [() => route.path, showIntro],
  () => {
    if (route.path !== "/" && showIntro.value) {
      const router = useRouter();
      console.log("alpha_go");
      router.push({ path: "/" });
      setTimeout(() => {
        showLogo.value = false;
      }, 369);
    }
  },
  { immediate: true },
);
const onIndexPage = computed(
  () => route.name === "index" || route.path === "/",
);
</script>

<template>
  <div
    class="flex flex-col min-h-screen relative overflow-hidden max-w-[1920px] mx-auto"
  >
    <ClientOnly>
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
        <div
          v-else
          key="default-bg"
          class="background-container static-bg"
        ></div>
      </Transition>
    </ClientOnly>
    <div class="content-container relative z-10">
      <IntroComponent
        v-if="showIntro && onIndexPage"
        @update:show-main-content="changeState"
        @show-logo="updateShowLogo"
      />
      <navigation-header
        v-if="showMainContent"
        :show-logo="showLogo"
        @show-intro="showIntroComponent"
        @toggle-background="(v: boolean) => toggleAnimateBackground(v)"
      />
      <div class="flex-1" v-show="showMainContent">
        <div class="grow">
          <slot />
        </div>
      </div>
      <Footer class="container" v-if="showMainContent" />
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
