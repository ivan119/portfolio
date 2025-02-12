<script setup lang="ts">
import { computed } from "vue";
import { defineNuxtLink } from "#app";

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  alt?: string;
  variant?: "default" | "primary";
  loading?: "lazy" | "eager";
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: "default",
  alt: "",
  loading: "eager",
});

const buttonClasses = computed(() => [
  props.variant === "default"
    ? " text-sm  py-1 rounded bg-gray-100  px-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
    : "",
  props.variant === "primary"
    ? "text-2xl text-teal-500 hover:text-teal-600"
    : "",
]);

const component = computed(() => {
  if (props.to || props.href) return defineNuxtLink({});
  return "button";
});
</script>

<template>
  <component
    :is="component"
    :to="to || href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'opener referrer' : undefined"
    class="transition-colors ease-linear duration-[369] inline-flex items-center"
    :class="buttonClasses"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
