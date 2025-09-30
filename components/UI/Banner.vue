<script setup>
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
  /* Background gradient */
  @apply absolute inset-0 bg-gradient-to-br
  from-red-200/80 via-blue-200/60 to-transparent /* light mode: stronger visibility with red→blue */
  dark:from-teal-900/30 dark:via-blue-900/20 dark:to-transparent
  rounded-3xl -z-10;
}

.ui-banner-dots {
  @apply absolute inset-0 opacity-20;
}

.ui-banner-dots-container {
  @apply h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl;
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
    <div v-if="dots" class="ui-banner-dots">
      <div class="ui-banner-dots-container"></div>
    </div>
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
