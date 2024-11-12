<template>
  <div class="relative">
    <div
      :class="{
        hidden: hideNow,
      }"
      class="p-8 pt-3"
      ref="typeWrite"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Typewriter from "typewriter-effect/dist/core";
const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(1);
const hideNow = ref(false);
let typewriterInstance = null; // Accessible variable for the Typewriter instance
const addClickListener = () => {
  if (!import.meta.browser) return; // Ensure browser-only functionality
  const testElement = document.getElementById("test");
  if (testElement) {
    testElement.addEventListener("click", () => {
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
        .pauseFor(2169)
        .callFunction(() => {
          // navigateTo("/about");
          emit("update:showMainContent", true);
        });
    });
  }
};
const content =
  "<div> Welcome to my portfolio!\n" +
  "I'm a Web Developer who loves building beautiful websites.\n" +
  "Check out my work\n" +
  "\n" +
  "\n" +
  "My projects focus on responsive design and user experience, and much more!</div>";

const setupTypewriter = () => {
  typewriterInstance = new Typewriter(typeWrite.value, {
    loop: false,
    delay: del.value,
  })
    .start()
    .pauseFor(2300)
    .typeString(
      "<span class='text-4xl'>Welcome to my portfolio! <p id='test' class='font-bold cursor-pointer text-red-900 dark:text-green-800'>Check out my work</p> </span><br>",
    )
    .callFunction(() => {
      addClickListener(); // Add event listener after the element is rendered
    })
    .changeDelay(33)
    .pauseFor(23)
    .typeString(
      "<span class='text-3xl'>I'm a Web Developer who loves building beautiful websites.</span>",
    )
    .pauseFor(42)
    .typeString(
      "<strong class='text-3xl'> My projects focus on responsive design and user experience.</strong>",
    )
    .start();
};

// Set up initial style for main content if needed
document.getElementById("main-content").style.display = "none"; // Hide main content initially

const addClickListener = () => {
  const testElement = document.getElementById("test");
  if (testElement) {
    testElement.addEventListener("click", () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.display = "block"; // Show the main content on click
      }
    });
  }
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
