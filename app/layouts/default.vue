<script setup lang="ts">
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
import { useDefaultLayout } from "~/composables/useDefaultLayout";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { getBreakpoints } from "~/composables/shared/breakpoints";
const { isMobileDevice } = getBreakpoints();
const BackgroundScene = defineAsyncComponent(
  () => import("~/components/ui/themes/BackgroundScene.vue"),
);
const DottedLayout = defineAsyncComponent(
  () => import("~/components/ui/themes/DottedLayout.vue"),
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
    <ClientOnly>
      <SpeedInsights />
      <Transition v-if="!isMobileDevice" name="bg-fade">
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
        <ErrorCode v-else key="errorCode" />
      </Transition>
    </ClientOnly>
    <div class="content-container">
      <IntroComponent
        v-if="showIntro && onIndexPage"
        :typwriter-mode="typeWriterMode"
        @update:show-main-content="changeState"
        @show-logo="updateShowLogo"
      />
      <NavigationHeader
        v-if="showMainContent"
        :show-logo="showLogo"
        :isMobileDevice
        @show-intro="showIntroComponent"
      />
      <NuxtLoadingIndicator v-if="showMainContent" />
      <div class="flex-1" v-show="showMainContent">
        <div class="grow">
          <slot />
        </div>
      </div>
      <LazyFooter class="body-container" v-if="showMainContent" />
      <LazyScrollProgress :visibility="showMainContent" />
    </div>
  </div>
</template>
