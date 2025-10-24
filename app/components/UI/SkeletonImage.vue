<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rounded?: string;
    ariaLabel?: string;
    showIcon?: boolean;
  }>(),
  {
    rounded: "rounded-sm",
    ariaLabel: "Loading image",
    showIcon: false,
  },
);
</script>

<template>
  <div
    class="skeleton-base w-full h-full"
    :class="[rounded]"
    role="img"
    :aria-label="ariaLabel"
  >
    <div v-if="showIcon" class="absolute inset-0 grid place-items-center">
      <svg
        class="w-10 h-10 text-gray-300 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path
          d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
        />
      </svg>
    </div>
  </div>
  
</template>

<style scoped>
.skeleton-base {
  position: relative;
  overflow: hidden;
  background-color: var(--skeleton-bg, #e5e7eb);
}

.skeleton-base::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    90deg,
    transparent,
    var(--skeleton-shine, rgba(255, 255, 255, 0.6)),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

:global(.dark) .skeleton-base {
  --skeleton-bg: #374151;
  --skeleton-shine: rgba(255, 255, 255, 0.14);
}
</style>


