<script setup>
// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";
import AboutIcon from "~/components/devTools/Icons/About.vue";
import BlogIcon from "~/components/devTools/Icons/Blog.vue";
import SkillsIcon from "~/components/devTools/Icons/Skills.vue";
import ProjectsIcon from "~/components/devTools/Icons/Projects.vue";
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
    show: false,
  },
  {
    to: "/skills",
    text: "Skills",
    icon: SkillsIcon,
    show: true,
  },
  {
    to: "/projects",
    text: "Projects",
    icon: ProjectsIcon,
    show: true,
  },
  {
    to: "/blog",
    text: "Blog",
    icon: BlogIcon,
    show: false,
  },
];
</script>

<template>
  <header class="header animate">
    <div class="flex items-center gap-8">
      <transition name="page">
        <NuxtLink
          aria-label="homepage-intro-link"
          v-if="props.showLogo"
          @click="testFunc"
          to="/"
          class="logo mt-6"
        >
          <dev-tools-signature2 class="w-[120px] h-20" />
        </NuxtLink>
      </transition>
    </div>
    <div class="flex items-center justify-center">
      <transition-group name="nav" tag="ul" class="flex">
        <li v-for="link in links" :key="link.to" v-show="showLinks">
          <NuxtLink
            v-show="link.show"
            :to="link.to"
            class="nav-link font-bold relative flex items-center mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Navigation link"
          >
            <component :is="link.icon" class="md:hidden" />
            <span class="hidden md:block">{{ link.text }}</span>
          </NuxtLink>
        </li>
      </transition-group>

      <BaseButton
        to="/blog/generate"
        variant="primary"
        class="hidden md:block"
      >
        Generate
      </BaseButton>

      <client-only>
        <component
          :is="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
          class="cursor-pointer sm:ml-6 hover:animate"
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
