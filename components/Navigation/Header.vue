<script setup xmlns:dark="http://www.w3.org/1999/xhtml">
import { computed } from "vue";

const themeColor = ref("system");
const colorMode = useColorMode();

// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
const sunAndMoon = computed(() =>
  colorMode.preference === "dark" ? SunIcon : MoonIcon,
);
</script>
<template>
  <header class="header">
    <div>
      <NuxtLink to="/" class="logo">logo</NuxtLink>
    </div>
    <client-only>
      <component
        class="cursor-pointer"
        @click.native="toggleTheme"
        :is="sunAndMoon"
      />
    </client-only>
  </header>
</template>
