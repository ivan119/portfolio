<script setup lang="ts">
import DottedIcon from "~/components/ui/icons/Dotted.vue";
import BackgroundIcon from "~/components/ui/icons/Background.vue";
import SunIcon from "~/components/ui/icons/Sun.vue";
import MoonIcon from "~/components/ui/icons/Moon.vue";
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThen2xlWidth = breakpoints.smaller("2xl");

const {
  activeTheme,
  colorMode,
  dottedSpinClass,
  isThemeChanging,
  toggleTheme,
  toggleBackground,
} = useThemeButtons();

const props = defineProps({
  hideThemeButtons: {
    type: Boolean,
    default: false,
    required: false,
  },
  isMobileDevice: {
    type: Boolean,
    default: false,
  },
  rowClass: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="{ '2xl:flex-col': !rowClass }"
    class="toggle-container flex flex-row flex-row-reverse gap-x-2 animate-icons max-h-6 2xl:gap-y-3"
  >
    <ClientOnly>
      <!-- SunAndMoon Button -->
      <ThemeButton
        :icon="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
        :is-active="colorMode.preference === 'dark'"
        :is-changing="isThemeChanging"
        :variant="colorMode.preference === 'dark' ? 'moon' : 'sun'"
        :show-active-indicator="false"
        :tooltip="
          colorMode.preference === 'dark'
            ? 'Return to Light'
            : 'Embrace Darkness'
        "
        tooltip-position="force-top"
        @click="toggleTheme"
      />
      <template v-if="!hideThemeButtons && !isMobileDevice">
        <!-- Dotted Theme Button -->
        <ThemeButton
          :icon="DottedIcon"
          :is-active="activeTheme === 'dotted'"
          variant="dotted"
          :icon-classes="`w-6 h-6 icon-transition ${dottedSpinClass}`"
          tooltip="Toggle Background Animation"
          :tooltip-position="smallerThen2xlWidth ? 'force-top' : 'left'"
          @click="
            toggleBackground(activeTheme === 'dotted' ? 'default' : 'dotted')
          "
        />
        <!-- Animated Theme Button -->
        <ThemeButton
          :icon="BackgroundIcon"
          :is-active="activeTheme === 'animated'"
          variant="animated"
          tooltip="Toggle Background Animation"
          :tooltip-position="smallerThen2xlWidth ? 'force-top' : 'left'"
          @click="
            toggleBackground(
              activeTheme === 'animated' ? 'default' : 'animated',
            )
          "
        />
      </template>
    </ClientOnly>
  </div>
</template>
