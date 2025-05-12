<template>
  <div v-show="isScrollable" class="scroll-progress-container">
    <div
      class="scroll-progress-bar"
      :style="{ transform: `scaleY(${progress})` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const progress = ref(0);
const isScrollable = ref(false);
let scrollRAF = null;
let checkTimeout = null;

const checkScrollable = () => {
  nextTick(() => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    isScrollable.value = height > 10;
    handleScroll();
  });
};

const handleScroll = () => {
  // Cancel any pending animation frame
  if (scrollRAF) {
    cancelAnimationFrame(scrollRAF);
  }

  scrollRAF = requestAnimationFrame(() => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    progress.value = height > 0 ? Math.min(winScroll / height, 1) : 0;
    scrollRAF = null;
  });
};

const resetState = async () => {
  // Clear any pending timeouts
  if (checkTimeout) {
    clearTimeout(checkTimeout);
  }
  if (scrollRAF) {
    cancelAnimationFrame(scrollRAF);
  }

  progress.value = 0;
  isScrollable.value = false;

  try {
    await window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch {
    window.scrollTo(0, 0);
  }
};

// Debounced resize observer callback
const debouncedCheck = () => {
  if (checkTimeout) {
    clearTimeout(checkTimeout);
  }
  checkTimeout = setTimeout(checkScrollable, 100);
};

// Watch route changes
watch(
  () => route.path,
  async (newPath, oldPath) => {
    if (newPath !== oldPath) {
      await resetState();
      await nextTick();
      debouncedCheck();
    }
  },
);

// Watch for content updates
const observer = ref(null);

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });

  observer.value = new ResizeObserver(debouncedCheck);
  observer.value.observe(document.body);

  // Initial check
  debouncedCheck();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (observer.value) {
    observer.value.disconnect();
  }
  // Clean up any pending animations/timeouts
  if (scrollRAF) {
    cancelAnimationFrame(scrollRAF);
  }
  if (checkTimeout) {
    clearTimeout(checkTimeout);
  }
});
</script>

<style scoped>
.scroll-progress-container {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 33vh;
  background: rgba(9, 26, 40, 0.1);
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  will-change: opacity;
  @apply right-4 lg:right-8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.scroll-progress-bar {
  width: 100%;
  height: 100%;
  background: #091a28;
  transform-origin: top;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Default (Light) theme */
html:not(.dark) .scroll-progress-container {
  background: rgba(9, 26, 40, 0.1);
}

html:not(.dark) .scroll-progress-bar {
  background: #091a28;
}

/* Dark theme */
html.dark .scroll-progress-container {
  background: rgba(235, 244, 241, 0.1);
}

html.dark .scroll-progress-bar {
  background: #ebf4f1;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}
</style>
