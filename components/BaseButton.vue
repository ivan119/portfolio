<script setup lang="ts">
import { computed } from "vue";
import { defineNuxtLink } from "#app";

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  alt?: string;
  variant?: "default" | "primary" | "link";
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: "default",
  alt: "",
  loading: false,
});

const buttonClasses = computed(() => [
  props.variant === "link"
    ? "font-bold underline decoration-2 decoration-gray-400  dark:hover:decoration-yellow-400 dark:decoration-gray-500 hover:decoration-red-800"
    : "",
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
    class="transition-colors ease-linear duration-[369] inline-flex items-center dark:hover:text-yellow-400 hover:text-red-800"
    :class="buttonClasses"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
