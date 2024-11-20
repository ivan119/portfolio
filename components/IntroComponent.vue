<script setup>
import { onMounted, ref, watch } from "vue";
import Typewriter from "typewriter-effect/dist/core";

const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(1);
const hideNow = ref(false);
const colorMode = useColorMode();
const greeting = ref(""); // Reactive greeting message
const fadeInClass = ref(false); // Controls the fade-in effect
let typewriterInstance = null; // Accessible variable for the Typewriter instance

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
  const testElement = document.getElementById("test");
  if (testElement) {
    testElement.addEventListener("click", () => {
      typewriterInstance
        .callFunction(() => {
          restartAnimation();
        })
        .start()
        .changeDeleteSpeed(3) // Faster delete speed
        .deleteAll(11)
        .changeDeleteSpeed(1)
        .start()
        .pauseFor(1111)
        .callFunction(() => {
          emit("showLogo", true);
          hideNow.value = true;
        })
        .pauseFor(1963)
        .callFunction(() => {
          emit("update:showMainContent", true);
        });
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
        "Currently working as a team lead developer\n" +
        "</h3>",
    )
    .typeString(
      '<h3 class="text-xl mb-2 text-gray-800 dark:text-gray-300">\n' +
        'Check out my <span id="test" class="cursor-pointer text-green-600 transition-colors ease-linear duration-200 underline hover:text-green-800 ">portfolio</span>\n' +
        "</h3>",
    )
    .pauseFor(23)
    .typeString(
      '<h3 class="text-xl text-gray-800 dark:text-gray-300">\n' +
        'Or contact <a href="mailto:ivankelava991@gmail.com" class="text-blue-600 transition-colors ease-linear duration-200 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200">me</a>\n' +
        "</h3>",
    )
    .callFunction(() => {
      addClickListener();
    })
    .pauseFor(42)
    .typeString(
      `<p id="greeting" class="mt-12 text-sm text-gray-600 dark:text-gray-400 italic">\n${greeting.value}\n</p>`,
    )
    .start();
};

// Apply the fade-in effect on mount
onMounted(() => {
  fadeInClass.value = true; // Trigger the fade-in effect
  setupTypewriter();
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

.hidden {
  display: none;
}
</style>

<template>
  <div class="relative">
    <div
      :class="{
        hidden: hideNow,
        'fade-in': fadeInClass,
      }"
      class="p-6 sm:p-12 pt-8"
    >
      <div ref="typeWrite"></div>
    </div>
  </div>
</template>
