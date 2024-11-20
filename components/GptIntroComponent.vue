<script setup>
import { onMounted, ref, watch } from "vue";
import Typewriter from "typewriter-effect/dist/core";
const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(50); // Adjusted for smoother typewriter effect
const hideNow = ref(false);
const colorMode = useColorMode();
const greeting = ref("");
let typewriterInstance = null;

const updateGreeting = () => {
  greeting.value =
    colorMode.value === "dark"
      ? "✨ Have a cozy evening!"
      : "☀️ Enjoy your day!";
};
updateGreeting();

watch(colorMode, (value) => {
  updateGreeting();
  const gr = document.getElementById("greeting");
  if (gr) gr.innerHTML = greeting.value;
});

const addClickListener = () => {
  if (!import.meta.env.SSR) {
    const testElement = document.getElementById("test");
    if (testElement) {
      testElement.addEventListener("click", () => {
        typewriterInstance
          .start()
          .deleteAll(15)
          .changeDeleteSpeed(30)
          .pauseFor(1000)
          .callFunction(() => {
            emit("showLogo", true);
            hideNow.value = true;
          })
          .pauseFor(2000)
          .callFunction(() => {
            emit("update:showMainContent", true);
          });
      });
    }
  }
};

const setupTypewriter = () => {
  typewriterInstance = new Typewriter(typeWrite.value, {
    loop: false,
    delay: del.value,
  })
    .typeString('<h1 class="text-4xl font-bold">Hey there 👋</h1>')
    .pauseFor(500)
    .typeString('<h2 class="text-2xl mt-4">I\'m Julian</h2>')
    .pauseFor(500)
    .typeString(
      '<h2 class="text-xl mt-4">I design and code things on the web.</h2>',
    )
    .pauseFor(500)
    .typeString(
      '<h2 class="text-md mt-4">Currently working on <a href="https://animejs.com" class="underline text-blue-500">anime.js v4</a></h2>',
    )
    .pauseFor(500)
    .typeString(
      '<h2 class="text-md mt-4">Find me on <a href="https://twitter.com" class="underline text-blue-500">Twitter</a>, <a href="https://github.com" class="underline text-blue-500">GitHub</a></h2>',
    )
    .pauseFor(500)
    .typeString(
      `<p id='greeting' class="mt-12 text-sm text-gray-600 dark:text-gray-400">${greeting.value}</p>`,
    )
    .callFunction(addClickListener)
    .start();
};

onMounted(() => {
  setupTypewriter();
});
</script>

<style scoped>
::v-deep(.Typewriter__cursor) {
  font-weight: bold;
  color: var(--tw-text-opacity);
  font-size: 1.5rem;
  animation: blink 1s steps(2, start) infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>

<template>
  <div class="relative">
    <div
      :class="{ hidden: hideNow }"
      class="p-3 sm:p-8 pt-3"
      ref="typeWrite"
    ></div>
  </div>
</template>
