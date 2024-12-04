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
const links = [
  { to: "/about", text: "About" },
  { to: "/blog", text: "Blog" },
];
</script>
<template>
  <header class="header">
    <div class="flex items-center gap-8">
      <transition name="page">
        <NuxtLink v-if="showLogo" @click="testFunc" to="/" class="logo">
          <dev-tools-signature2 class="w-[120px] h-20" />
        </NuxtLink>
      </transition>
    </div>
    <div class="flex items-center justify-center space-x-4">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        {{ link.text }}
      </NuxtLink>
      <client-only>
        <component
          :is="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
          class="cursor-pointer"
          @click.native="toggleTheme"
        />
      </client-only>
    </div>
  </header>
</template>
