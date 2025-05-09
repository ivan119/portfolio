<script setup lang="ts">
const route = useRoute();

interface Breadcrumb {
  name: string;
  path: string;
  isLast: boolean;
}

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const pathArray = route.path.split("/");
  const breadcrumbs: Breadcrumb[] = [];

  let path = "";
  pathArray.forEach((item, index) => {
    if (item !== "") {
      path += `/${item}`;
      breadcrumbs.push({
        name: formatName(item),
        path: path,
        isLast: index === pathArray.length - 1,
      });
    }
  });

  // Add home as first item if we're not on home page
  if (route.path !== "/") {
    breadcrumbs.unshift({
      name: "Home",
      path: "/",
      isLast: breadcrumbs.length === 0,
    });
  }

  return breadcrumbs;
});

// Format route name to be more readable
const formatName = (name: string): string => {
  // Handle special cases
  if (name === "") return "Home";

  // Split by hyphens and capitalize each word
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-3 w-full">
    <ol class="flex items-center justify-start space-x-2 text-sm">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="crumb.path"
        class="flex items-center"
      >
        <!-- Separator -->
        <span v-if="index > 0" class="mx-2 text-gray-400 dark:text-gray-600">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>

        <!-- Breadcrumb Item -->
        <div
          :class="[
            'flex items-center breadcrumb-link',
            crumb.isLast
              ? 'active-crumb'
              : 'inactive-crumb',
          ]"
        >
          <NuxtLink
            v-if="!crumb.isLast"
            :to="crumb.path"
            class="transition-colors duration-200"
          >
            {{ crumb.name }}
          </NuxtLink>
          <span v-else>{{ crumb.name }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style>
@reference "tailwindcss";

.breadcrumb-text {
  @apply text-gray-600 dark:text-gray-400;
}

.active-crumb {
  @apply font-medium relative text-transparent bg-clip-text bg-gradient-primary;
}

.active-crumb::after {
  content: '';
  @apply absolute bottom-[-2px] left-0 w-0 h-[2px] transition-all duration-300 ease-in-out bg-gradient-primary;
}

.active-crumb:hover::after {
  @apply w-full;
}

.inactive-crumb {
  @apply text-gray-600 dark:text-gray-400 relative transition-all duration-300 ease-in-out;
}

.inactive-crumb:hover {
  @apply text-transparent bg-clip-text bg-gradient-primary;
  transform: scale(1.05);
}

.inactive-crumb::after {
  content: '';
  @apply absolute bottom-[-2px] left-0 w-0 h-[2px] transition-all duration-300 ease-in-out bg-gradient-primary;
}

.inactive-crumb:hover::after {
  @apply w-full;
}

.breadcrumb-link {
  @apply relative transition-all duration-300 ease-in-out;
}

/* Utility classes for gradients */
.gradient-text-primary {
  @apply text-transparent bg-clip-text bg-gradient-primary;
}

.gradient-text-secondary {
  @apply text-transparent bg-clip-text bg-gradient-secondary;
}

.gradient-border-primary {
  @apply border-2 border-transparent;
  background: linear-gradient(white, white) padding-box,
              var(--tw-gradient-primary) border-box;
}

.gradient-border-secondary {
  @apply border-2 border-transparent;
  background: linear-gradient(white, white) padding-box,
              var(--tw-gradient-secondary) border-box;
}

/* Dark mode support for gradients */
.dark .gradient-border-primary {
  background: linear-gradient(#091a28, #091a28) padding-box,
              var(--tw-gradient-primary) border-box;
}

.dark .gradient-border-secondary {
  background: linear-gradient(#091a28, #091a28) padding-box,
              var(--tw-gradient-secondary) border-box;
}
</style>
