<template>
  <div class="error-code-container">
    <!-- Advanced Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Animated geometric shapes with your brand colors -->
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-2xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-300/20 dark:bg-emerald-700/20 rounded-full blur-3xl animate-pulse delay-2000"
      ></div>

      <!-- Floating particles system -->
      <div class="absolute inset-0">
        <div
          v-for="i in 20"
          :key="i"
          class="absolute w-1 h-1 bg-emerald-400/30 dark:bg-emerald-500/30 rounded-full animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }"
        ></div>
      </div>

      <!-- Advanced grid pattern with animation -->
      <div class="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          class="absolute inset-0 animate-grid-move"
          style="
            background-image: radial-gradient(
              circle at 1px 1px,
              currentColor 1px,
              transparent 0
            );
            background-size: 40px 40px;
          "
        ></div>
      </div>

      <!-- Glowing orbs -->
      <div
        class="absolute top-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-ping"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-1000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-300 rounded-full animate-ping delay-2000"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

/* Enhanced countdown animations */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes countdown-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* Ultra Advanced Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(1deg);
  }
  50% {
    transform: translateY(-10px) rotate(-1deg);
  }
  75% {
    transform: translateY(-15px) rotate(0.5deg);
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

@keyframes holographic-glow {
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(16, 185, 129, 0.3),
      0 0 40px rgba(37, 99, 235, 0.2),
      0 0 60px rgba(16, 185, 129, 0.1);
  }
  50% {
    box-shadow:
      0 0 30px rgba(16, 185, 129, 0.5),
      0 0 60px rgba(37, 99, 235, 0.3),
      0 0 90px rgba(16, 185, 129, 0.2);
  }
}

@keyframes particle-float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes text-shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Apply custom animations */
.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-orbit {
  animation: orbit 3s linear infinite;
}

.animate-countdown-pulse {
  animation: countdown-pulse 1s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-grid-move {
  animation: grid-move 20s linear infinite;
}

.animate-holographic-glow {
  animation: holographic-glow 3s ease-in-out infinite;
}

.animate-particle-float {
  animation: particle-float 4s ease-in-out infinite;
}

/* Ultra Advanced Hover Effects */
.group:hover .group-hover\:rotate-y-12 {
  transform: rotateY(12deg);
}

.group:hover .group-hover\:rotate-x-6 {
  transform: rotateX(6deg);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 3D Transform Support */
.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform: translateZ(0);
}

/* Advanced Glassmorphism */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Enhanced button hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive text sizing */
@media (max-width: 768px) {
  .text-\[200px\] {
    font-size: 150px;
  }
}

@media (max-width: 480px) {
  .text-\[200px\] {
    font-size: 120px;
  }
}
</style>
<script setup lang="ts"></script>
