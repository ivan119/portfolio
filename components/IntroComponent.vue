<script setup>
import { onMounted, ref } from "vue";
import Typewriter from "typewriter-effect/dist/core";
const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(1);
const hideNow = ref(false);
const colorMode = useColorMode();
const greeting = ref(""); // Reactive greeting message
let typewriterInstance = null; // Accessible variable for the Typewriter instance
// Update greeting based on color mode
const updateGreeting = () => {
  greeting.value =
    colorMode.value === "dark" ? "✨ Nice evening!" : "☀️ Have a good one!";
};
updateGreeting();
// Watch for changes in color mode to update the greeting dynamically
watch(colorMode, (value) => {
  updateGreeting();
  const gr = document.getElementById("greeting");
  gr.innerHTML = greeting.value;
});
const addClickListener = () => {
  if (!import.meta.browser) return; // Ensure browser-only functionality
  const testElement = document.getElementById("test");
  console.log(2323);
  if (testElement) {
    console.log(2323);
    testElement.addEventListener("click", () => {
      console.log(23);
      typewriterInstance
        .start()
        .deleteAll(11)
        .changeDeleteSpeed(33)
        .start()
        .pauseFor(1111)
        .callFunction(() => {
          emit("showLogo", true);
          hideNow.value = true;
        })
        .pauseFor(1963)
        .callFunction(() => {
          // navigateTo("/about");
          emit("update:showMainContent", true);
        });
    });
  }
};

const setupTypewriter = () => {
  console.log(greeting); // this is showning right thing
  typewriterInstance = new Typewriter(typeWrite.value, {
    loop: false,
    delay: del.value,
  })
    .start()
    .pauseFor(1)
    .typeString(
      '   <h1 class="text-4xl md:text-5xl font-bold">\n' +
        '        Hi <span class="animate-wave">👋</span> I\'m Ivan\n' +
        "      </h1>",
    )
    .changeDelay(33)
    .typeString(
      '    <h2 class="text-xl md:text-2xl text-gray-700 dark:text-gray-300">\n' +
        "        I design/develop things on web.\n" +
        "      </h2>",
    )
    .pauseFor(23)
    .typeString(
      "<h2 class='text-4xl'>You can contact <a href='mailto:ivankelava@gmail.com' class='cursor-pointer hover:text-gray-700 dark:hover-text-white'>me</a></h2>",
    )
    .pauseFor(23)
    .typeString(
      "<h2 class='flex text-3xl'>And you can see my <p id='test' class='cursor-pointer text-green-900 dark:text-red-9 pl-1'>portfolio</p></h2>",
    )
    .callFunction(() => {
      addClickListener(); // Add event listener after the element is rendered
    })
    .pauseFor(42)
    .typeString(
      `
      <p id='greeting' class="mt-12 text-sm text-gray-600 dark:text-gray-400">
        ${greeting.value}
      </p>
    `,
    )
    .start();
};

// Call setupTypewriter when the component is mounted
onMounted(() => {
  setupTypewriter();
});
</script>

<style scoped>
/* Add any custom styles here if needed */
::v-deep(.Typewriter__cursor) {
  @apply text-red-900 font-bold text-4xl dark:text-green-800;
}
</style>
<template>
  <div class="relative">
    <div
      :class="{
        hidden: hideNow,
      }"
      class="p-3 sm:p-8 pt-3"
      ref="typeWrite"
    ></div>
  </div>
</template>
