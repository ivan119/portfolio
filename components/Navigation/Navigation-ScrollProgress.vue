<script setup lang="ts">
const scrollProgress = ref(0);
const showBackToTop = ref(false);

// Update scroll progress
const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (scrollTop / docHeight) * 100;
  
  // Show back to top button when scrolled down 20%
  showBackToTop.value = scrollProgress.value > 20;
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Add scroll event listener
onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
});

// Remove scroll event listener
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <!-- Scroll Progress Bar -->
    <div class="h-1 w-full">
      <div 
        class="h-full bg-gradient-to-r from-teal-600/80 to-blue-600/80 dark:from-teal-500/80 dark:to-blue-500/80 transition-all duration-300"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- Back to Top Button -->
    <Transition name="slide-fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 p-3 sm:p-5 rounded-full text-gray-400 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group hover:bg-gradient-to-r hover:from-teal-600/80 hover:to-blue-600/80 dark:hover:from-teal-500/80 dark:hover:to-blue-500/80"
        aria-label="Back to top"
      >
        <svg
          class="w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
/* Add a subtle glow effect to the progress bars */
.bg-gradient-to-r {
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.2);
}

/* Add a subtle glow effect to the back to top button */
button {
  box-shadow: 0 0 15px rgba(13, 148, 136, 0.15);
}

button:hover {
  box-shadow: 0 0 20px rgba(13, 148, 136, 0.25);
}

/* Slide fade transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style> 