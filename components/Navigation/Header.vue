<script setup>
// Import Sun and Moon components
import SunIcon from "~/components/devTools/Icons/Sun.vue";
import MoonIcon from "~/components/devTools/Icons/Moon.vue";
import BackgroundIcon from "~/components/devTools/Icons/Background.vue";
import AboutIcon from "~/components/devTools/Icons/About.vue";
import BlogIcon from "~/components/devTools/Icons/Blog.vue";
import SkillsIcon from "~/components/devTools/Icons/Skills.vue";
import ProjectsIcon from "~/components/devTools/Icons/Projects.vue";
import DottedIcon from "~/components/devTools/Icons/Dotted.vue";
import ToggleButton from "~/components/UI/ToggleButton.vue";
const colorMode = useColorMode();
const showLinks = ref(false);

const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
  activeBg: {
    type: String,
    default: "default",
    validator: (value) => ["default", "dotted", "animated"].includes(value),
  },
  animateBackground: {
    type: Boolean,
    default: false,
  },
  dottedBgProp: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["show-intro", "toggle-background", "toggle-layout"]);

// Computed property for active icon state
const activeIcon = computed(() => {
  return props.activeBg;
});

// Layout toggle functionality
const currentLayout = ref(props.dottedBgProp);
const isLayoutChanging = ref(false);

// Keep local layout state in sync with prop from parent
watch(
  () => props.dottedBgProp,
  (newValue) => {
    currentLayout.value = newValue;
  },
  { immediate: true },
);

const toggleLayout = () => {
  if (isLayoutChanging.value) return;

  isLayoutChanging.value = true;

  // Toggle between default and dotted layouts based on current activeBg
  const newLayout = props.activeBg === "dotted" ? "default" : "dotted";
  
  // Update local state
  currentLayout.value = newLayout;

  // Emit event to parent component to handle layout change
  emit("toggle-layout", newLayout);

  // Add visual feedback
  setTimeout(() => {
    isLayoutChanging.value = false;
  }, 500);
};

const toggleBackground = () => {
  emit("toggle-background");
};

const dottedSpinClass = computed(() => {
  // Spin only during change: cw when enabling dotted, ccw when disabling
  if (!isLayoutChanging.value) return "";
  return currentLayout.value === "dotted" ? "icon-spin-cw" : "icon-spin-ccw";
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

const testFunc = () => {
  const route = useRoute();
  if (route.path === "/") {
    // TODO: MAKE ON HOVER NO SIGNATURE ANIMATION OR PAUSE + MAKE V-IF ANIMATION WHEN SHOWING/HIDING
    emit("show-intro");
  }
};

const isThemeChanging = ref(false);

const toggleTheme = () => {
  if (!isThemeChanging.value) {
    isThemeChanging.value = true;
    setTimeout(() => {
      isThemeChanging.value = false;
    }, 500);
  }

  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const links = [
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
    show: true,
  },
];

// Add loading state for navigation items
const isNavigating = ref(false);
const activeLink = ref(null);
const progress = ref(0);
let progressInterval = null;

function handleNavigationClick(link) {
  if (useRoute().path !== link.to) {
    isNavigating.value = true;
    activeLink.value = link.to;
    progress.value = 0;

    // Animate progress
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      progress.value += 2;
      if (progress.value >= 100) {
        clearInterval(progressInterval);
      }
    }, 16);

    // Reset after navigation completes
    setTimeout(() => {
      isNavigating.value = false;
      progress.value = 0;
    }, 800);
  }
}

// Clean up interval on component unmount
onUnmounted(() => {
  clearInterval(progressInterval);
});
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
          class="logo mt-6 relative hover:scale-105 transition-transform duration-300"
        >
          <dev-tools-signature2
            class="w-[120px] h-20 text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 hover:bg-clip-text hover:text-transparent transition-all duration-300"
          />
        </NuxtLink>
      </transition>
    </div>
    <div class="flex items-center justify-center">
      <transition-group name="nav" tag="ul" class="flex">
        <li v-for="link in links" :key="link.to" v-show="showLinks">
          <NuxtLink
            v-show="link.show"
            :to="link.to"
            @click="handleNavigationClick(link)"
            exact-active-class="nav-link-active"
            class="nav-link font-bold relative flex items-center mr-4 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
            :class="{
              'is-navigating': isNavigating && activeLink === link.to,
              'hover-main-gradient': !isNavigating || activeLink !== link.to,
            }"
            aria-label="Navigation link"
          >
            <component :is="link.icon" class="md:hidden" />
            <span class="hidden md:block">{{ link.text }}</span>

            <!-- Progress indicator -->
            <div
              v-if="isNavigating && activeLink === link.to"
              class="nav-progress-container"
            >
              <div
                class="nav-progress-bar"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </NuxtLink>
        </li>
      </transition-group>

      <div class="toggle-container flex items-center gap-x-4">
        <!-- Layout Toggle Button -->
        <ToggleButton
          :icon="DottedIcon"
          :is-active="activeIcon === 'dotted'"
          :is-changing="isLayoutChanging"
          variant="layout"
          :icon-classes="`w-6 h-6 icon-transition ${dottedSpinClass}`"
          :tooltip="
            activeIcon === 'dotted'
              ? 'Switch to Default'
              : 'Switch to Dotted'
          "
          @click="toggleLayout"
        />

        <!-- Background Toggle Button -->
        <ToggleButton
          :icon="BackgroundIcon"
          :is-active="activeIcon === 'animated'"
          variant="background"
          tooltip="Toggle Background Animation"
          @click="toggleBackground"
        />

        <!-- Theme Toggle Button -->
        <ToggleButton
          :icon="colorMode.preference === 'dark' ? SunIcon : MoonIcon"
          :is-active="colorMode.preference === 'dark'"
          :is-changing="isThemeChanging"
          variant="theme"
          :show-active-indicator="false"
          :tooltip="
            colorMode.preference === 'dark'
              ? 'Switch to Light'
              : 'Switch to Dark'
          "
          @click="toggleTheme"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link-active {
  @apply text-transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: var(--main-gradient);
}

.nav-link {
  transform-origin: center;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link-active::after {
  width: 100%;
  background-image: linear-gradient(to right, #0d9488, #2563eb);
  animation: gradient-shift 3s ease infinite;
  background-size: 200% auto;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

/* Progress indicator */
.nav-progress-container {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background: rgba(150, 150, 150, 0.2);
  overflow: hidden;
  z-index: 5;
}

.nav-progress-bar {
  height: 100%;
  background: linear-gradient(to right, #0d9488, #2563eb);
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
  transition: width 0.05s linear;
}

/* Improved navigation animation */
.is-navigating {
  position: relative;
  overflow: hidden;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: var(--main-gradient);
  background-size: 200% auto;
  animation: text-shift 2s linear infinite;
  transform-origin: center;
}

.is-navigating::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  transform: skewX(-25deg);
  animation: shimmer-sweep 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.is-navigating::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-image: var(--main-gradient);
  background-size: 200% auto;
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.8);
  animation: gradient-flow 2s linear infinite;
}

@keyframes text-shift {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes gradient-flow {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes shimmer-sweep {
  0% {
    left: -150%;
  }
  100% {
    left: 250%;
  }
}

.nav-enter-active,
.nav-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.background-toggle {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-toggle::before {
  content: "";
  position: absolute;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: currentColor;
  opacity: 0;
  transform: scale(0);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.background-toggle:active::before {
  opacity: 0.1;
  transform: scale(1);
}

.icon-transition {
  position: relative;
  z-index: 1;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.icon-transition:active {
  transform: scale(0.9);
}
</style>
