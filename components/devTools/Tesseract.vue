<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-150 -150 300 300"
    class="w-full transition-colors duration-200 ease-linear h-20 text-black dark:text-white hover:text-purple-600 hover:dark:text-purple-400 -mt-5 tesseract-container"
  >
    <!-- Outer Cube Front -->
    <path class="tesseract-line outer-front" :d="outerFrontPath" />
    <!-- Outer Cube Back -->
    <path class="tesseract-line outer-back" :d="outerBackPath" />
    <!-- Inner Cube Front -->
    <path class="tesseract-line inner-front" :d="innerFrontPath" />
    <!-- Inner Cube Back -->
    <path class="tesseract-line inner-back" :d="innerBackPath" />
    <!-- Connecting Lines -->
    <path v-for="(line, index) in connectingLines" 
          :key="index" 
          :d="line" 
          class="tesseract-line connecting" />
  </svg>
</template>

<style scoped>
.tesseract-container {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.tesseract-line {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.outer-front {
  animation: rotateFront 20s linear infinite;
}

.outer-back {
  opacity: 0.4;
  animation: rotateBack 20s linear infinite;
}

.inner-front {
  animation: rotateFront 20s linear infinite reverse;
}

.inner-back {
  opacity: 0.4;
  animation: rotateBack 20s linear infinite reverse;
}

.connecting {
  animation: pulse 4s ease-in-out infinite;
}

@keyframes rotateFront {
  0% {
    transform: rotateX(0) rotateY(0);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

@keyframes rotateBack {
  0% {
    transform: rotateX(180deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(540deg) rotateY(540deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
    stroke-width: 2;
  }
  50% {
    opacity: 0.4;
    stroke-width: 1.5;
  }
}

.tesseract-container:hover .tesseract-line {
  stroke: currentColor;
  filter: drop-shadow(0 0 3px currentColor);
}

@media (prefers-reduced-motion) {
  .tesseract-line {
    animation: none !important;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const size = 60
const innerSize = size * 0.6

// Calculate vertices for outer cube
const outerFrontPath = computed(() => {
  return `M${-size},${-size} L${size},${-size} L${size},${size} L${-size},${size} Z`
})

const outerBackPath = computed(() => {
  return `M${-size * 0.8},${-size * 0.8} L${size * 0.8},${-size * 0.8} L${size * 0.8},${size * 0.8} L${-size * 0.8},${size * 0.8} Z`
})

// Calculate vertices for inner cube
const innerFrontPath = computed(() => {
  return `M${-innerSize},${-innerSize} L${innerSize},${-innerSize} L${innerSize},${innerSize} L${-innerSize},${innerSize} Z`
})

const innerBackPath = computed(() => {
  return `M${-innerSize * 0.8},${-innerSize * 0.8} L${innerSize * 0.8},${-innerSize * 0.8} L${innerSize * 0.8},${innerSize * 0.8} L${-innerSize * 0.8},${innerSize * 0.8} Z`
})

// Calculate connecting lines
const connectingLines = computed(() => {
  return [
    // Front connections
    `M${-size},${-size} L${-innerSize},${-innerSize}`,
    `M${size},${-size} L${innerSize},${-innerSize}`,
    `M${size},${size} L${innerSize},${innerSize}`,
    `M${-size},${size} L${-innerSize},${innerSize}`,
    // Back connections
    `M${-size * 0.8},${-size * 0.8} L${-innerSize * 0.8},${-innerSize * 0.8}`,
    `M${size * 0.8},${-size * 0.8} L${innerSize * 0.8},${-innerSize * 0.8}`,
    `M${size * 0.8},${size * 0.8} L${innerSize * 0.8},${innerSize * 0.8}`,
    `M${-size * 0.8},${size * 0.8} L${-innerSize * 0.8},${innerSize * 0.8}`
  ]
})
</script>
