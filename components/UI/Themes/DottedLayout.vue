<template>
  <div
    class="bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 overflow-hidden"
  >
    <!-- Dotted Background Pattern -->
    <div class="absolute inset-0 opacity-20 dark:opacity-10">
      <div
        class="absolute inset-0 dotted-mask"
        style="
          /* Use gradient background and mask it with dots */
          background-image: var(--main-gradient);
          background-size: 200% auto;
          -webkit-mask-image: radial-gradient(
            circle at var(--dot-radius) var(--dot-radius),
            #000 var(--dot-radius),
            transparent 0
          );
          mask-image: radial-gradient(
            circle at var(--dot-radius) var(--dot-radius),
            #000 var(--dot-radius),
            transparent 0
          );
          -webkit-mask-size: var(--dot-gap) var(--dot-gap);
          mask-size: var(--dot-gap) var(--dot-gap);
          /* Run both grid movement and gradient shift */
          will-change:
            -webkit-mask-position, mask-position, --dot-gap, --dot-radius;
          -webkit-mask-position: 0 0;
          mask-position: 0 0;
          animation:
            grid-move 20s linear infinite,
            gradient-shift 4s ease-in-out infinite,
            dot-wave 8s ease-in-out infinite;
        "
      ></div>
    </div>

    <!-- Animated geometric shapes with brand colors -->
    <div class="absolute inset-0 overflow-hidden">
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
          class="absolute w-1 h-1 rounded-full animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            backgroundColor:
              'color-mix(in srgb, var(--main-gradient-from) 35%, transparent)',
          }"
        ></div>
      </div>

      <!-- Glowing orbs -->
      <div
        class="absolute top-1/4 left-1/3 w-2 h-2 rounded-full animate-ping"
        style="background: var(--main-glow)"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full animate-ping delay-1000"
        style="background: var(--main-glow)"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-1 h-1 rounded-full animate-ping delay-2000"
        style="background: var(--main-glow)"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
/* Dot spacing variables (scoped-safe) */
.dotted-mask {
  --dot-gap: 20px; /* denser for light theme */
  --dot-radius: 1px; /* small, crisp dots */
}
:global(.dark) .dotted-mask {
  --dot-gap: 40px; /* more airy on dark theme */
  --dot-radius: 1px;
}

/* Wave animation for mask spacing + position */
@keyframes dot-wave {
  0% {
    --dot-gap: 20px;
    --dot-radius: 1px;
    -webkit-mask-position: 0% 0%;
    mask-position: 0% 0%;
  }
  25% {
    --dot-gap: 22px;
    --dot-radius: 1.25px;
    -webkit-mask-position: 25% 10%;
    mask-position: 25% 10%;
  }
  50% {
    --dot-gap: 24px;
    --dot-radius: 1.5px;
    -webkit-mask-position: 50% 0%;
    mask-position: 50% 0%;
  }
  75% {
    --dot-gap: 22px;
    --dot-radius: 1.25px;
    -webkit-mask-position: 75% -10%;
    mask-position: 75% -10%;
  }
  100% {
    --dot-gap: 20px;
    --dot-radius: 1px;
    -webkit-mask-position: 100% 0%;
    mask-position: 100% 0%;
  }
}

/* Grid movement animation */
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

.animate-grid-move {
  animation: grid-move 20s linear infinite;
}

/* Floating animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(1deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) rotate(-1deg);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-15px) rotate(0.5deg);
    opacity: 0.7;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Ping animation */
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
<script setup lang="ts"></script>
