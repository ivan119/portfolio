<script setup lang="ts">
import { computed } from "vue";
import { defineNuxtLink } from "#app";

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  alt?: string;
  variant?: "default" | "primary" | "link";
  loading?: "lazy" | "eager";
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: "default",
  alt: "",
  loading: "eager",
});

const buttonClasses = computed(() => [
  props.variant === "link" ? "relative font-bold underline" : "",
  props.variant === "default"
    ? "font-bold text-sm  py-1 rounded bg-gray-100  px-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
    : "",
  props.variant === "primary"
    ? "text-2xl text-teal-500 hover:text-teal-600"
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
    class="transition-colors ease-linear duration-[369] inline-flex items-center relative group"
    :class="buttonClasses"
  >
    <slot name="icon" />
    <slot />
    <span v-if="props.variant === 'link'" class="underline-effect"></span>
  </component>
</template>

<style scoped>
.underline-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.04em;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}

.group:hover .underline-effect {
  width: 100%;
}
</style>
