<script setup lang="ts">
import { computed } from "vue";
import { defineNuxtLink } from "#app";

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  alt?: string;
  variant?: "default" | "primary" | "link" | "link-old";
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: "default",
  alt: "",
  loading: false,
});

const buttonClasses = computed(() => [
  // Link variants: avoid color transitions to prevent flicker when hover ends
  props.variant === "link-old"
    ? "font-bold decoration-2 decoration-gray-400 dark:decoration-gray-500 hover:underline hover:decoration-red-800 dark:hover:decoration-yellow-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 dark:hover:from-yellow-500 dark:hover:to-amber-400 hover:bg-clip-text hover:text-transparent"
    : "",
  props.variant === "link" ? "font-bold hover-main-gradient" : "",
  // Button variants: keep color transitions
  props.variant === "default"
    ? "font-bold text-sm  py-1 rounded bg-gray-200  px-2 dark:bg-gray-800 hover:bg-gray-[250] dark:hover:bg-gray-700 transition-colors ease-linear duration-[369]"
    : "",
  props.variant === "primary"
    ? "text-2xl text-teal-500 hover:text-teal-600 transition-colors ease-linear duration-[369]"
    : "",
]);

const component = computed(() => {
  if (props.to) return defineNuxtLink({});
  return props.href ? "a" : "button";
});
</script>

<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'opener referrer' : undefined"
    class="inline-flex items-center"
    :class="buttonClasses"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
