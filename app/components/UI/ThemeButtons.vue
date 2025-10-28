<script setup lang="ts">
import DottedIcon from "~/components/devTools/Icons/Dotted.vue";
import BackgroundIcon from "~/components/devTools/Icons/Background.vue";
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";
import { useThemeButtons } from "~/composables/UI/useThemeButtons";

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
});
</script>

<template>
  <div class="toggle-container flex flex-col animate-icons max-h-6 gap-y-3">
    <ClientOnly>
      <!-- SunAndMoon Button -->
      <UIThemeButton
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
        <UIThemeButton
          :icon="DottedIcon"
          :is-active="activeTheme === 'dotted'"
          variant="dotted"
          :icon-classes="`w-6 h-6 icon-transition ${dottedSpinClass}`"
          tooltip="Toggle Background Animation"
          tooltip-position="left"
          @click="
            toggleBackground(activeTheme === 'dotted' ? 'default' : 'dotted')
          "
        />
        <!-- Animated Theme Button -->
        <UIThemeButton
          :icon="BackgroundIcon"
          :is-active="activeTheme === 'animated'"
          variant="animated"
          tooltip="Toggle Background Animation"
          tooltip-position="left"
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
