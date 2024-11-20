<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div
      class="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/50 backdrop-blur-[2px]"
    ></div>
    <div
      v-for="n in 8"
      :key="n"
      class="laser-beam absolute h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      :style="{
        top: `${15 * n}%`,
        animationDelay: `${n * 0.7}s`,
        transform: `rotate(${n * 12}deg)`,
        width: '200%',
        left: '-50%',
      }"
    ></div>
    <div
      v-for="n in 20"
      :key="`pulse-${n}`"
      class="pulse-dot absolute rounded-full bg-primary/30 blur-[1px]"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 15 + 8}px`,
        height: `${Math.random() * 15 + 8}px`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.laser-beam {
  animation: laser-move 10s linear infinite;
  will-change: transform, opacity;
}

.pulse-dot {
  animation: pulse-fade 3s ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes laser-move {
  0% {
    transform: translateX(-100%) rotate(var(--rotate, 15deg));
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) rotate(var(--rotate, 15deg));
    opacity: 0;
  }
}

@keyframes pulse-fade {
  0%,
  100% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
