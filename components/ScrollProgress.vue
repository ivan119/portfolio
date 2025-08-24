<template>
  <!-- Side Scroll Progress Indicator -->
  <div 
    v-show="isScrollable" 
    class="scroll-progress-container"
    @click="handleProgressClick"
    @mouseenter="showProgressTooltip = true"
    @mouseleave="showProgressTooltip = false"
  >
    <div
      class="scroll-progress-bar"
      :style="{ transform: `scaleY(${progress})` }"
    ></div>
    
    <!-- Interactive hover indicator -->
    <div 
      v-if="showProgressTooltip"
      class="progress-tooltip"
      :style="{ top: `${hoverProgress * 100}%` }"
    >
      {{ Math.round(hoverProgress * 100) }}%
    </div>
    
    <!-- Click target overlay -->
    <div 
      class="progress-click-area"
      @mousemove="handleProgressHover"
    ></div>
  </div>

  <!-- Back to Top Button with Circular Progress Indicator -->
  <Transition name="slide-fade">
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="back-to-top-btn"
      aria-label="Back to top"
    >
      <!-- Circular Progress Ring -->
      <svg class="progress-ring" viewBox="0 0 100 100">
        <circle
          class="progress-ring-background"
          cx="50"
          cy="50"
          r="45"
        />
        <circle
          class="progress-ring-progress"
          cx="50"
          cy="50"
          r="45"
          :style="{ strokeDashoffset: progressOffset }"
        />
      </svg>
      
      <!-- Arrow Icon -->
      <svg
        class="back-to-top-icon"
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const progress = ref(0);
const isScrollable = ref(false);
const showBackToTop = ref(false);
const showProgressTooltip = ref(false);
const hoverProgress = ref(0);
let scrollRAF = null;
let checkTimeout = null;
let lastScrollTime = 0;

// Calculate circular progress offset
const progressOffset = computed(() => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  return circumference - (progress.value * circumference);
});

// Handle progress bar click to jump to position
const handleProgressClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const clickY = event.clientY - rect.top;
  const clickProgress = Math.max(0, Math.min(1, clickY / rect.height));
  
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const targetScroll = clickProgress * maxScroll;
  
  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
};

// Handle progress bar hover for tooltip
const handleProgressHover = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const hoverY = event.clientY - rect.top;
  hoverProgress.value = Math.max(0, Math.min(1, hoverY / rect.height));
};

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
  // Throttle scroll events for better performance
  const now = Date.now();
  if (now - lastScrollTime < 16) return; // ~60fps
  lastScrollTime = now;

  // Cancel any pending animation frame
  if (scrollRAF) {
    cancelAnimationFrame(scrollRAF);
  }

  scrollRAF = requestAnimationFrame(() => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    
    if (height > 0) {
      progress.value = Math.min(winScroll / height, 1);
      // Show back to top button when scrolled down 10%
      showBackToTop.value = (winScroll / height) > 0.1;
    } else {
      progress.value = 0;
      showBackToTop.value = false;
    }
    
    scrollRAF = null;
  });
};

const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch {
    window.scrollTo(0, 0);
  }
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
  showBackToTop.value = false;

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
/* Side Scroll Progress Indicator */
.scroll-progress-container {
  position: fixed;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 3px;
  height: 40vh;
  background: rgba(9, 26, 40, 0.08);
  z-index: 1000;
  pointer-events: auto;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  will-change: opacity;
  border-radius: 2px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-progress-container:hover {
  width: 6px;
  background: rgba(9, 26, 40, 0.12);
  box-shadow: 0 0 12px rgba(13, 148, 136, 0.2);
}

@media (min-width: 1024px) {
  .scroll-progress-container {
    right: 2rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

.scroll-progress-bar {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0d9488, #2563eb);
  transform-origin: top;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(13, 148, 136, 0.3);
  pointer-events: none;
}

/* Interactive elements */
.progress-click-area {
  position: absolute;
  top: 0;
  left: -8px;
  right: -8px;
  bottom: 0;
  cursor: pointer;
  z-index: 2;
}

.progress-tooltip {
  position: absolute;
  left: -45px;
  transform: translateY(-50%);
  background: rgba(9, 26, 40, 0.95);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 3;
  pointer-events: none;
  animation: tooltipFadeIn 0.2s ease;
}

.progress-tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid rgba(9, 26, 40, 0.95);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* Default (Light) theme for side indicator */
html:not(.dark) .scroll-progress-container {
  background: rgba(9, 26, 40, 0.06);
}

html:not(.dark) .scroll-progress-bar {
  background: linear-gradient(180deg, #0d9488, #2563eb);
  box-shadow: 0 0 8px rgba(13, 148, 136, 0.25);
}

/* Dark theme for side indicator */
html.dark .scroll-progress-container {
  background: rgba(235, 244, 241, 0.08);
}

html.dark .scroll-progress-container:hover {
  background: rgba(235, 244, 241, 0.12);
  box-shadow: 0 0 12px rgba(20, 184, 166, 0.3);
}

html.dark .scroll-progress-bar {
  background: linear-gradient(180deg, #14b8a6, #3b82f6);
  box-shadow: 0 0 8px rgba(20, 184, 166, 0.3);
}

html.dark .progress-tooltip {
  background: rgba(235, 244, 241, 0.95);
  color: #091a28;
}

html.dark .progress-tooltip::after {
  border-left-color: rgba(235, 244, 241, 0.95);
}

/* Back to top button with circular progress */
.back-to-top-btn {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: #091a28;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 1001;
  overflow: hidden;
}

.back-to-top-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 12px 40px rgba(13, 148, 136, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
}

.back-to-top-btn:active {
  transform: translateY(-1px) scale(0.98);
}

/* Progress ring styles */
.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
}

.progress-ring-background {
  fill: none;
  stroke: rgba(13, 148, 136, 0.1);
  stroke-width: 3;
}

.progress-ring-progress {
  fill: none;
  stroke: url(#progressGradient);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 283; /* 2 * PI * 45 */
  transition: stroke-dashoffset 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Arrow icon */
.back-to-top-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.back-to-top-btn:hover .back-to-top-icon {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (min-width: 1024px) {
  .back-to-top-btn {
    right: 2rem;
    bottom: 2rem;
    width: 4.5rem;
    height: 4.5rem;
  }
  
  .back-to-top-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}

/* Slide fade transition */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100px) scale(0.8);
  opacity: 0;
}

/* Dark theme for button */
html.dark .back-to-top-btn {
  background: rgba(9, 26, 40, 0.95);
  color: #ebf4f1;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2);
}

html.dark .back-to-top-btn:hover {
  background: rgba(9, 26, 40, 1);
  box-shadow: 
    0 12px 40px rgba(20, 184, 166, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2);
}

html.dark .progress-ring-background {
  stroke: rgba(20, 184, 166, 0.15);
}

/* Add gradient definition */
.back-to-top-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #0d9488, #2563eb, #7c3aed);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.back-to-top-btn:hover::before {
  opacity: 1;
}

/* Custom gradient for progress ring */
.progress-ring-progress {
  stroke: #0d9488;
  filter: drop-shadow(0 0 4px rgba(13, 148, 136, 0.4));
}

html.dark .progress-ring-progress {
  stroke: #14b8a6;
  filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4));
}

/* Pulse animation when progress is complete */
.back-to-top-btn[data-complete="true"] {
  animation: completePulse 0.6s ease-out;
}

@keyframes completePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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
