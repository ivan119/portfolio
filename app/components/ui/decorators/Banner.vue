<script setup>
import { useThemeButtons } from "~/composables/UI/useThemeButtons.js";

const { colorMode } = useThemeButtons();
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Insert Title Here",
  },
  description: {
    type: String,
    required: true,
    default: "Insert Description Here",
  },
  firstTagIsH1: {
    type: Boolean,
    default: true,
    required: false,
  },
  dots: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<style scoped>
.ui-banner {
  background: var(--banner-bg);
  border: var(--banner-border);
  border-radius: var(--radius);
  @apply absolute inset-0 -z-10;
}

.ui-banner-dots {
  @apply absolute inset-0 opacity-20;
}

.ui-banner-dots-container {
  background-image: radial-gradient(#3b82f6 1px, transparent 1px);
  background-size: 16px 16px;
  border-radius: var(--radius);
  @apply h-full w-full;
}

.slot-content {
  position: relative;
  z-index: 1;
}
</style>

<template>
  <section class="relative p-4 md:p-8 md:pt-5">
    <div class="ui-banner"></div>
    <!-- Light dots pattern -->
    <ClientOnly v-if="false">
      <div class="ui-banner-dots">
        <div class="ui-banner-dots-container"></div>
      </div>
    </ClientOnly>
    <h1 v-if="firstTagIsH1 && title" class="heading-1 text-main-gradient pb-2">
      {{ title }}
    </h1>
    <h2 v-else-if="title" class="heading-1 text-main-gradient pb-2">
      {{ title }}
    </h2>
    <p v-if="description" class="text-lg mb-4">{{ description }}</p>
    <div class="slot-content">
      <slot name="default"></slot>
    </div>
  </section>
</template>
