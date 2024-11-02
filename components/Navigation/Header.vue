<script setup>
const colorMode = useColorMode();

// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
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
        :is="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
      />
    </client-only>
  </header>
</template>
