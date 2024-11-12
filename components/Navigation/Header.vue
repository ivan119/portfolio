<script setup>
// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";
const colorMode = useColorMode();
defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["showIntro"]);
const testFunc = () => {
  const route = useRoute();
  if (route.path === "/") {
    // TODO: MAKE ON HOVER NO SIGNATURE ANIMATION OR PAUSE + MAKE V-IF ANIMATION WHEN SHOWING/HIDING
    emit("showIntro");
  }
};

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>
<template>
  <header class="header">
    <div class="flex">
      <transition name="page">
        <NuxtLink v-if="showLogo" @click="testFunc" to="/" class="logo">
          <dev-tools-signature2 class="w-[120px] h-20" />
        </NuxtLink>
      </transition>
    </div>
    <client-only>
      <component
        :is="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
        class="cursor-pointer"
        @click.native="toggleTheme"
      />
    </client-only>
  </header>
</template>
