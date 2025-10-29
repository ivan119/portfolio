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
      let name = item.path === "/" ? "e" : item;
      breadcrumbs.push({
        name: formatName(name),
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
  <nav aria-label="Breadcrumb" class="py-3 pb-2 w-full mb-1">
    <ol class="flex items-center justify-start space-x-2 text-sm">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="crumb.path"
        class="flex items-center"
      >
        <!-- Separator -->
        <span
          v-if="crumb.name !== 'Home' && index > 0"
          class="mx-2 text-gray-400 dark:text-gray-600"
        >
          <svg
            class="w-4 h-4"
            width="1em"
            height="1em"
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
              ? 'active-crumb'
              : crumb.name === 'Home'
                ? ''
                : crumb.name !== 'Home'
                  ? 'breadcrumb-link hover-main-gradient'
                  : 'hover-main-gradient',
          ]"
          :style="{ 'view-transition-name': `breadcrumb-name-${crumb.name}` }"
        >
          <NuxtLink
            v-if="!crumb.isLast"
            :to="crumb.path"
            class="transition-colors duration-200"
            aria-label="Breadcrumb navigation"
          >
            <dev-tools-icons-home v-if="crumb.name === 'Home'" />
            <template v-else>
              <span class="text-black dark:text-gray-200">
                {{ crumb.name }}
              </span>
            </template>
          </NuxtLink>
          <span v-else>{{ crumb.name }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.active-crumb {
  font-weight: 500;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: var(--main-gradient);
}

.inactive-crumb {
  @apply text-gray-600 dark:text-gray-400;
  position: relative;
}

.breadcrumb-link {
  position: relative;
  @apply transition-all ease-linear duration-[369];
}
</style>
