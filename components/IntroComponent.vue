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
        .pauseFor(1963)
        .callFunction(() => {
          // navigateTo("/about");
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
    .pauseFor(2300)
    .typeString(
      "<span class='text-4xl'>I can put div inside this? <p id='test' class='font-bold cursor-pointer text-red-900 dark:text-green-800'>really?</p> </span><br>",
    )
    .callFunction(() => {
      addClickListener(); // Add event listener after the element is rendered
    })
    .changeDelay(33)
    .pauseFor(23)
    .typeString("<span class='text-3xl'>\"Strings can be removed\"</span>")
    .pauseFor(42)
    .deleteChars(8)
    .typeString("<strong class='text-3xl'>altered!</strong>")
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
