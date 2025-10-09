<script setup lang="ts">
import { useIconComponentHandler } from "~/composables/skills/useComponentHandler";

const { handleIconComponent } = useIconComponentHandler();

interface ProjectTag {
  name?: string;
  icon?: string;
  gaussCMSlogo?: boolean;
}

interface Project {
  slug?: string;
  title: string;
  description: string;
  link: string;
  categories: string[];
  tags: ProjectTag[];
  gaussCMSlogo?: boolean;
}

const props = defineProps<{
  project: Project;
  colored?: boolean;
  useBgDots?: boolean;
}>();

// Function to get category colors
const getCategoryColor = (category: string): string => {
  const colors = {
    frontend: "#3B82F6",
    backend: "#10B981",
    fullstack: "#6366F1",
    mobile: "#06B6D4",
    design: "#F43F5E",
    default: "#6B7280",
  } as const;
  return colors[category as keyof typeof colors] ?? colors.default;
};

// Function to get gradient colors
const getGradientColors = (category: string): [string, string] => {
  const colors = {
    frontend: ["#3B82F6", "#60A5FA"],
    backend: ["#10B981", "#34D399"],
    fullstack: ["#6366F1", "#818CF8"],
    mobile: ["#06B6D4", "#22D3EE"],
    design: ["#F43F5E", "#FB7185"],
    default: ["#6B7280", "#9CA3AF"],
  } as const;
  return (colors[category as keyof typeof colors] ?? colors.default) as [
    string,
    string,
  ];
};

// Function to get tech icon color
const getIconColor = (tag: ProjectTag): string => {
  const techColors = {
    "devicon-vuejs": "#4FC08D",
    "devicon-nuxtjs": "#00DC82",
    "devicon-typescript": "#3178C6",
    "devicon-tailwindcss": "#38B2AC",
    "devicon-bootstrap": "#7952B3",
    "devicon-javascript": "#F7DF1E",
    "devicon-postgresql": "#336791",
    "devicon-mongodb": "#47A248",
    "devicon-php": "#777BB4",
    "devicon-adonisjs": "#220052",
  } as const;

  const baseIconClass = tag.icon?.split(" ")[0];
  if (baseIconClass && baseIconClass in techColors) {
    return techColors[baseIconClass as keyof typeof techColors];
  }
  return getCategoryColor(props.project.categories[0] ?? "default");
};
</script>

<template>
  <article
    class="card relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group focus-within:ring-2 focus-within:ring-main-500"
    tabindex="0"
  >
    <!-- Dotted Background -->
    <div v-if="props.useBgDots" class="absolute inset-0 opacity-10">
      <div
        class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
      ></div>
    </div>
    <NuxtLink
      v-if="props.project.slug"
      :to="`/projects/${props.project.slug}`"
      class="relative flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-main-500 z-10"
      tabindex="-1"
    >
      <!-- Icon/Logo Area with 3D and pulse effect -->
      <div class="relative p-3 perspective-1000">
        <div
          class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{
            background: project.tags[0]
              ? `linear-gradient(135deg, ${getIconColor(project.tags[0])}20, transparent)`
              : `linear-gradient(135deg, ${getCategoryColor(project.categories[0] ?? 'default')}20, transparent)`,
          }"
        ></div>
        <div
          class="icon-container transform-gpu transition-transform duration-500 group-hover:rotate-y-12"
          :class="{ 'gauss-scale': project.gaussCMSlogo }"
        >
          <dev-tools-icons-gauss-logo
            v-if="project.gaussCMSlogo"
            :rotate-animation="true"
            class="tech-icon preserve-animation w-8 h-8 md:w-8"
          />
          <component
            v-else
            :is="handleIconComponent(project.tags[0]?.icon)"
            :class="[project.tags[0].icon, 'tech-icon', 'colored']"
          />
        </div>
      </div>

      <!-- Title -->
      <div class="px-3 mb-1">
        <h2
          class="text-base font-semibold text-main-gradient transition-all duration-300 group-hover:translate-x-1"
        >
          {{ project.title }}
        </h2>
      </div>

      <!-- Description -->
      <p
        class="text-xs text-gray-600 dark:text-gray-400 px-3 mb-2 leading-relaxed"
      >
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 px-3 pb-3">
        <span
          v-for="tag in project.tags"
          :key="tag.name"
          class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-300 group-hover:scale-110 bg-opacity-80 border"
          :style="{
            background: `${getIconColor(tag)}15`,
            borderColor: `${getIconColor(tag)}40`,
            boxShadow: `0 1px 4px ${getIconColor(tag)}20`,
          }"
        >
          <dev-tools-icons-gauss-logo
            v-if="tag.gaussCMSlogo"
            :rotate-animation="true"
            class="w-4 h-4"
          />
          <component
            v-else
            :is="handleIconComponent(tag.icon)"
            :class="[tag.icon, 'w-3 h-3', 'colored']"
          />
          {{ tag.name }}
        </span>
      </div>

      <!-- Bottom Gradient Bar -->
      <div
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="{
          background: project.tags[0]
            ? `linear-gradient(to right, transparent, ${getIconColor(project.tags[0])}, transparent)`
            : 'linear-gradient(to right, transparent, var(--gradient-from), transparent)',
        }"
      ></div>

      <!-- Shine Effect -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="shine"></div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped></style>
