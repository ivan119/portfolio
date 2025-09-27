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
import Tooltip from "~/components/UI/Tooltip.vue";
const colorMode = useColorMode();
const showLinks = ref(false);
const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
  showMainContent: {
    type: Boolean,
    default: false,
  },
  activeTheme: {
    type: String,
    default: "default",
    validator: (value) => ["default", "dotted", "animated"].includes(value),
  },
});
const emit = defineEmits(["show-intro", "toggle-background", "toggle-layout"]);

// Computed property for active icon/theme state
const activeTheme = computed(() => {
  return props.activeTheme;
});

// TODO: Improve Save in local storage
const toggleBackground = (v) => {
  emit("toggle-background", v);
};

const dottedSpinClass = computed(() => {
  return activeTheme.value === "dotted" ? "icon-spin-cw" : "icon-spin-ccw";
});
watch(
  () => props.showMainContent,
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
    tooltipText: "Tech Stack",
    icon: SkillsIcon,
    show: true,
  },
  {
    to: "/projects",
    text: "Projects",
    tooltipText: "Projects",
    icon: ProjectsIcon,
    show: true,
  },
  {
    to: "/blog",
    text: "Blog",
    tooltipText: "AI-Powered Blog",
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
  <header class="header-class animate">
    <div class="flex items-center gap-8">
      <ClientOnly>
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
      </ClientOnly>
    </div>
    <div class="flex items-center justify-center">
      <transition-group name="nav" tag="ul" class="flex">
        <li
          class="flex"
          v-for="link in links"
          :key="link.to"
          v-show="showLinks"
        >
          <Tooltip :text="link.tooltipText" size="sm">
            <NuxtLink
              v-show="link.show"
              :to="link.to"
              @click="handleNavigationClick(link)"
              exact-active-class="nav-link-active"
              class="nav-link font-bold relative flex items-center mr-4 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
              :class="{
                'is-navigating': isNavigating && activeLink === link.to,
                'md:hover-main-gradient':
                  !isNavigating || activeLink !== link.to,
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
          </Tooltip>
        </li>
      </transition-group>

      <div class="toggle-container flex items-center gap-x-4 animate-icons">
        <ClientOnly>
          <!-- Dotted Theme Button -->
          <UIThemeButton
            :icon="DottedIcon"
            :is-active="activeTheme === 'dotted'"
            variant="dotted"
            :icon-classes="`w-6 h-6 icon-transition ${dottedSpinClass}`"
            tooltip="Toggle Background Animation"
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
            @click="
              toggleBackground(
                activeTheme === 'animated' ? 'default' : 'animated',
              )
            "
          />

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
            @click="toggleTheme"
          />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link-active {
  @apply md:text-transparent;
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
  width: 100%;
  height: 2px;
  background-image: var(--main-gradient);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.369s linear;
}

.nav-link:hover::after,
.nav-link:focus::after,
.nav-link:active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
  background-image: linear-gradient(
    to right,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
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
  background: linear-gradient(
    to right,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
  box-shadow: 0 0 12px var(--main-glow);
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
  box-shadow: 0 0 12px var(--main-glow);
  animation: gradient-flow 2s linear infinite;
  transform: scaleX(1);
  transform-origin: left;
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

/* Toggle container animation */
.toggle-container {
  position: relative;
}

.toggle-container > * {
  transition:
    transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    filter 0.25s ease;
}

/* Staggered mount-in for icons */
.toggle-container.animate-icons > * {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
  animation: icons-pop-in 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.toggle-container.animate-icons > *:nth-child(1) {
  animation-delay: 0.06s;
}

.toggle-container.animate-icons > *:nth-child(2) {
  animation-delay: 0.12s;
}

.toggle-container.animate-icons > *:nth-child(3) {
  animation-delay: 0.18s;
}

@keyframes icons-pop-in {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Hover effects removed per request; only mount animation remains */
</style>
