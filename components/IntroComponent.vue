<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import Typewriter from "typewriter-effect/dist/core";
import { navigateTo } from "#app";
import { useRouter } from "vue-router";

const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(1);
const hideNow = ref(false);
const colorMode = useColorMode();
const greeting = ref(""); // Reactive greeting message
const fadeInClass = ref(false); // Controls the fade-in effect
let typewriterInstance = null; // Accessible variable for the Typewriter instance
const isIntroActive = ref(true); // Track intro component state

// Router navigation guard
const router = useRouter();
const navigationGuard = router.beforeEach((to, from, next) => {
  if (isIntroActive.value) {
    // Block navigation while intro is active
    next(false);
    return;
  }
  next(); // Allow navigation normally if intro is inactive
});

// Update greeting based on time of day
const updateGreeting = () => {
  const date = new Date();
  const hours = date.getHours();
  greeting.value =
    hours >= 5 && hours < 17
      ? "☀️ Have a nice day!"
      : hours >= 17 && hours <= 19
        ? "✨ Nice evening!"
        : "🌙 Have a good one!";
};
updateGreeting();

// Watch for changes in color mode to update the greeting dynamically
watch(colorMode, () => {
  updateGreeting();
  const gr = document.getElementById("greeting");
  if (gr) gr.innerHTML = greeting.value;
});

const restartAnimation = () => {
  const element = document.querySelector(".animate-wave");
  if (element) {
    element.style.animation = "none"; // Temporarily remove the animation
    void element.offsetHeight; // Trigger a reflow (forces the browser to recalculate styles)
    element.style.animation = ""; // Reapply the animation
  }
};

const addClickListener = () => {
  if (!import.meta.browser) return; // Ensure browser-only functionality
  const porfolioLink = document.getElementById("portfolio-link");
  const typeWriteDiv = document.querySelector(".typewrite-wrapper");

  if (porfolioLink && typeWriteDiv) {
    porfolioLink.addEventListener("click", () => {
      typeWriteDiv.classList.add("animate-slide");

      setTimeout(() => {
        // Clear content and show welcome message
        typeWriteDiv.classList.remove("animate-slide");
        typeWriteDiv.innerHTML =
          '<div class="welcome-message text-center text-4xl md:text-5xl text-gray-800 dark:text-gray-300">Welcome</div>';
        typeWriteDiv.classList.add("fade-welcome");

        // After welcome message, proceed with main content
        setTimeout(() => {
          typeWriteDiv.classList.add("fade-out");
          setTimeout(() => {
            emit("showLogo", true);
            hideNow.value = true;
            setTimeout(() => {
              emit("update:showMainContent", true);
            }, 396);

            // Disable intro active state
            isIntroActive.value = false;
          }, 693);
        }, 1872);
      }, 1386);
    });
  }
};

const setupTypewriter = () => {
  typewriterInstance = new Typewriter(typeWrite.value, {
    loop: false,
    delay: del.value,
  })
    .start()
    .pauseFor(1)
    .typeString(
      '<h1 class="text-3xl md:text-4xl font-bold mb-4">\n' +
        'Hi <span class="animate-wave">👋</span>, I\'m Ivan\n' +
        "</h1>",
    )
    .changeDelay(33)
    .typeString(
      '<h2 class="text-2xl md:text-3xl mb-2 text-gray-800 dark:text-gray-300">\n' +
        "I design/develop things for the web\n" +
        "</h2>",
    )
    .pauseFor(23)
    .typeString(
      '<h3 class="text-2xl md:text-3xl mb-4 text-gray-800 dark:text-gray-300">\n' +
        "Currently working as a frontend team lead developer\n" +
        "</h3>",
    )
    .typeString(
      '<h3 class="text-xl mb-2 text-gray-800 dark:text-gray-300">\n' +
        'Check out my <span id="portfolio-link" class="cursor-pointer text-blue-green">portfolio</span>\n' +
        "</h3>",
    )
    .pauseFor(3)
    .typeString(
      '<h3 class="text-xl text-gray-800 dark:text-gray-300">\n' +
        'Or contact <a href="mailto:ivankelava991@gmail.com" class="text-green-blue">me</a>\n' +
        "</h3>",
    )
    .callFunction(() => {
      addClickListener();
    })
    .pauseFor(693)
    .typeString(
      `<p id="greeting" class="mt-12 text-sm text-gray-600 dark:text-gray-400 italic">\n${greeting.value}\n</p>`,
    )
    .typeString(
      `<p class="text-sm text-gray-600 dark:text-gray-400 italic mt-2">\ncya\n</p>`,
    )
    .start();
};

const resetComponent = () => {
  hideNow.value = false;
  fadeInClass.value = false;
  isIntroActive.value = true; // Reset intro active state
  const typeWriteDiv = document.querySelector(".typewrite-wrapper");
  if (typeWriteDiv) {
    typeWriteDiv.classList.remove("animate-slide", "fade-welcome", "fade-out");
    Array.from(typeWriteDiv.children).forEach((el) => {
      el.style.animationDelay = "";
    });
  }
  // Reset and reinitialize typewriter
  if (typewriterInstance) {
    typewriterInstance.stop();
  }
  nextTick(() => {
    fadeInClass.value = true;
    setupTypewriter();
  });
};

const props = defineProps({
  showIntro: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => props.showIntro,
  (newVal) => {
    if (newVal) {
      resetComponent();
    }
  },
);

// Apply the fade-in effect on mount
onMounted(() => {
  resetComponent();
});

// Cleanup navigation guard when component is unmounted
onUnmounted(() => {
  // Remove the navigation guard
  navigationGuard();
});
</script>

<style scoped>
/* Custom styles for better spacing and consistent colors */
::v-deep(.Typewriter__cursor) {
  @apply text-red-900 font-bold text-3xl text-black dark:text-white hidden;
}

h2,
h3,
p {
  margin-bottom: 1.5rem; /* Space between lines */
}

h2 {
  color: var(--text-color, #111827); /* Dark mode compatible color */
}

h3,
p {
  color: var(
    --text-secondary-color,
    #4b5563
  ); /* Lighter text for readability */
}

::v-deep(.animate-wave) {
  display: inline-block;
  animation: wave 0.9s ease-in-out 2;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(33px);
  animation: fadeIn 3s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide-out-left animation */
.slide-out-left {
  animation: slideOutLeft 0.5s forwards;
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

.animate-slide {
  animation: slideOut 1.2s ease-in-out forwards;
}

.animate-slide > * {
  animation: slideOut 1.2s ease-in-out forwards;
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  70% {
    transform: translateX(10%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.typewrite-wrapper {
  perspective: 1000px;
  transition: opacity 0.3s ease;
}

/* Add some depth to the text elements */
.typewrite-wrapper > * {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.hidden {
  display: none;
}

.goodbye-message {
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-welcome {
  animation: fadeWelcome 0.6s ease-in-out forwards;
}

.fade-out {
  animation: fadeOut 0.6s ease-in-out forwards;
}

@keyframes fadeWelcome {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}
</style>

<template>
  <article
    class="typewrite-wrapper relative transition-all duration-300 p-6 sm:p-12 pt-8"
    :class="{ 'fade-in': fadeInClass, hidden: hideNow }"
  >
    <div ref="typeWrite"></div>
  </article>
</template>
