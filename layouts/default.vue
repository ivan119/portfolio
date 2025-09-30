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
<script setup lang="ts">
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
import { useDefaultLayout } from "~/composables/useDefaultLayout";
const BackgroundScene = defineAsyncComponent(
  () => import("~/components/UI/Themes/BackgroundScene.vue"),
);
const DottedLayout = defineAsyncComponent(
  () => import("~/components/UI/Themes/DottedLayout.vue"),
);
const { activeTheme } = useThemeButtons();

const {
  // state
  typeWriterMode,
  showIntro,
  showMainContent,
  showLogo,
  onIndexPage,
  // methods
  changeState,
  updateShowLogo,
  showIntroComponent,
} = useDefaultLayout();
</script>

<template>
  <div class="main">
    <!-- Background with transition -->
    <ClientOnly>
      <Transition name="bg-fade">
        <BackgroundScene
          v-if="activeTheme === 'animated'"
          key="animated-bg"
          class="background-container"
        />
        <DottedLayout
          v-else-if="activeTheme === 'dotted'"
          key="dotted-bg"
          class="background-container"
        />
        <UIThemesErrorCode v-else />
      </Transition>
    </ClientOnly>
    <div class="content-container relative z-10">
      <IntroComponent
        v-if="showIntro && onIndexPage"
        :typwriter-mode="typeWriterMode"
        @update:show-main-content="changeState"
        @show-logo="updateShowLogo"
      />
      <navigation-header
        v-if="showMainContent"
        :show-logo="showLogo"
        @show-intro="showIntroComponent"
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
