<script setup lang="ts">
const route = useRoute();

const showBreadcrumbs = computed(() => {
  return route.path.startsWith('/blog');
});

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
  <nav 
    v-if="showBreadcrumbs" 
    aria-label="Breadcrumb" 
    class="py-3 px-4 w-full"
  >
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
            'flex items-center',
            crumb.isLast
              ? 'text-teal-500 dark:text-teal-500 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400',
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

<style scoped>
/* Optional: Add hover animation for links */
a {
  position: relative;
}

a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -1px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}

a:hover::after {
  width: 100%;
}
</style>
