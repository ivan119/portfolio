<script setup>
// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";
import AboutIcon from "~/components/devTools/Icons/About.vue";
import BlogIcon from "~/components/devTools/Icons/Blog.vue";

const colorMode = useColorMode();
const showLinks = ref(false);

const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => props.showLogo,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        showLinks.value = true;
      }, 369);
    } else {
      setTimeout(() => {
        showLinks.value = false;
      }, 693);
    }
  },
  { immediate: true },
);

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
  {
    to: "/about",
    text: "About",
    icon: AboutIcon,
  },
  {
    to: "/blog",
    text: "Blog",
    icon: BlogIcon,
  },
];
</script>
<template>
  <header class="header">
    <div class="flex items-center gap-8">
      <transition name="page">
        <NuxtLink v-if="props.showLogo" @click="testFunc" to="/" class="logo">
          <dev-tools-signature2 class="w-[120px] h-20" />
        </NuxtLink>
      </transition>
    </div>
    <div class="flex items-center justify-center">
      <transition-group name="nav">
        <template v-if="showLinks">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-link relative flex items-center mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <component :is="link.icon" class="md:hidden" />
            <span class="hidden md:block">{{ link.text }}</span>
          </NuxtLink>
        </template>
      </transition-group>
      <client-only>
        <component
          :is="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
          class="cursor-pointer sm:ml-6"
          @click.native="toggleTheme"
        />
      </client-only>
    </div>
  </header>
</template>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-enter-active,
.nav-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
