<style scoped>
/* this must be here otherwise it won't work as expected since it's still experimental*/
:root {
  --view-transition-duration: 369ms;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--view-transition-duration);
}
::view-transition-old(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
}
::view-transition-new(root) {
  animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
}
</style>
<script setup lang="ts">
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
import { useDefaultLayout } from "~/composables/useDefaultLayout";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
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
    <SpeedInsights />
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
    <div class="content-container">
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
      <Footer class="body-container" v-if="showMainContent" />
      <ScrollProgress :visibility="showMainContent" />
    </div>
  </div>
</template>
