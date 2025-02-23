<script setup lang="ts">
import { computed } from "vue";
import { defineNuxtLink } from "#app";

// Define consistent theme colors and variants
const theme = {
  colors: {
    primary: {
      base: "text-teal-500",
      hover: "hover:text-teal-500",
    },
    secondary: {
      base: "text-gray-600",
      hover: "hover:text-teal-500",
    },
    link: {
      base: "",
      hover: "hover:text-teal-500",
    },
  },
  variants: {
    primary: {
      base: "text-2xl font-bold",
      active: "text-teal-500",
    },
    "nav-link": {
      base: "font-bold relative flex items-center",
      active: "text-teal-500 nav-link-active",
    },
    default: {
      base: "font-bold text-sm py-1 px-2 rounded",
      background: "bg-gray-100 dark:bg-gray-800",
      hover: "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-teal-500",
    },
    link: {
      base: "font-bold",
      decoration: "underline decoration-2 decoration-gray-400",
      hover: "hover:decoration-teal-500 hover:text-teal-500",
    },
  },
};

interface Props {
  to?: string;
  href?: string;
  external?: boolean;
  alt?: string;
  variant?: keyof typeof theme.variants;
  loading?: boolean;
  activeRouteLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  external: false,
  variant: "default",
  alt: "",
  loading: false,
  activeRouteLink: false,
});

// Compute button classes based on variant and state
const buttonClasses = computed(() => {
  const variant = theme.variants[props.variant];
  const colors = theme.colors;

  // Base classes that apply to all buttons
  const baseClasses = [
    "transition-colors ease-linear duration-[369]",
    "inline-flex items-center",
  ];

  // Variant specific classes
  switch (props.variant) {
    case "nav-link":
      return [
        ...baseClasses,
        variant.base,
        props.activeRouteLink
          ? variant.active
          : `${colors.link.base} ${colors.link.hover}`,
      ];

    case "link":
      return [...baseClasses, variant.base, variant.decoration, variant.hover];

    case "default":
      return [...baseClasses, variant.base, variant.background, variant.hover];

    case "primary":
      return [
        ...baseClasses,
        variant.base,
        colors.primary.base,
        colors.primary.hover,
      ];

    default:
      return baseClasses;
  }
});

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
    :class="buttonClasses"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>
<style scoped>
.router-link-exact-active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-enter-active,
.nav-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
