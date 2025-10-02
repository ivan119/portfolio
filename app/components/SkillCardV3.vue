<script setup lang="ts">
import { useIconComponentHandler } from "~/composables/skills/useComponentHandler";

const { handleIconComponent } = useIconComponentHandler();
interface Tag {
  name: string;
  icon: string;
}

interface Skill {
  title: string;
  description: string;
  link: string;
  tags: Tag[];
  categories: string[];
  proficiency?: string;
  experience?: string;
  url: string;
  icon: string;
}

const props = defineProps<{
  skill: Skill;
  colored?: boolean;
  useBgDots?: boolean;
}>();

// Type for tech colors mapping
type TechColorMap = {
  [key: string]: string;
};

// Type for category colors mapping
type CategoryColorMap = Record<string, [string, string]>;

// Type for proficiency colors mapping
type ProficiencyColorMap = {
  [key: string]: string;
};

// Tech icon color mapping based on devicon brand colors
const getTechColor = (iconClass: string) => {
  const techColors: TechColorMap = {
    // Programming Languages
    "devicon-javascript": "#F7DF1E",
    "devicon-typescript": "#3178C6",
    "devicon-python": "#3776AB",
    "devicon-cplusplus": "#00599C",
    "devicon-php": "#777BB4",

    // Frontend Frameworks and Libraries
    "devicon-react": "#61DAFB",
    "devicon-vuejs": "#4FC08D",
    "devicon-angular": "#DD0031",
    "devicon-nuxtjs": "#00DC82",
    "devicon-nextjs": "#000000",
    "devicon-tailwindcss": "#38B2AC",
    "devicon-bootstrap": "#7952B3",

    // Backend and Frameworks
    "devicon-flask": "#000000",
    "devicon-laravel": "#FF2D20",

    // Databases
    "devicon-mongodb": "#47A248",
    "devicon-mysql": "#4479A1",

    // Mobile
    "devicon-flutter": "#02569B",

    // Others
    "devicon-figma": "#F24E1E",
    "devicon-photoshop": "#31A8FF",
    "devicon-xd": "#FF61F6",
    "devicon-vscode": "#007ACC",
    "devicon-intellij": "#000000",
    "devicon-webstorm": "#00ACC1",
  };

  // Extract the base name of the icon from classes like "devicon-react plain" or "devicon-react"
  const baseIconClass = iconClass.split(" ")[0];

  return (
    techColors[baseIconClass as keyof typeof techColors] ||
    getCategoryColor(props.skill.categories)
  );
};

// Function to get icon classes with colored option
const getIconClasses = (icon: string) => {
  // Base class always included
  const classes = [
    icon,
    "text-2xl transition-all duration-500 group-hover:text-4xl",
  ];

  // If colored prop is true, add 'colored' class instead of using custom colors
  if (props.colored) {
    classes.push("colored");
  }

  return classes;
};

const getCategoryColor = (categories: string[]) => {
  if (categories.includes("Frontend")) return "#3B82F6";
  if (categories.includes("Backend")) return "#10B981";
  if (categories.includes("Full Stack")) return "#6366F1";
  if (categories.includes("language")) return "#F59E0B";
  if (categories.includes("database")) return "#EC4899";
  if (categories.includes("framework")) return "#8B5CF6";
  if (categories.includes("mobile")) return "#06B6D4";
  if (categories.includes("design")) return "#F43F5E";
  if (categories.includes("tools")) return "#9333EA";
  return "#6B7280";
};

const getGradientColors = (categories: string[]): [string, string] => {
  const baseColor = getCategoryColor(categories);
  const colors: CategoryColorMap = {
    Frontend: ["#3B82F6", "#60A5FA"],
    Backend: ["#10B981", "#34D399"],
    "Full Stack": ["#6366F1", "#818CF8"],
    language: ["#F59E0B", "#FBBF24"],
    database: ["#EC4899", "#F472B6"],
    framework: ["#8B5CF6", "#A78BFA"],
    mobile: ["#06B6D4", "#22D3EE"],
    design: ["#F43F5E", "#FB7185"],
    tools: ["#9333EA", "#A855F7"],
    default: ["#6B7280", "#9CA3AF"],
  };

  const category = (categories[0]?.toLowerCase() ||
    "default") as keyof typeof colors;
  const pair = colors[category] ?? colors.default;
  return pair as [string, string];
};

const getProficiencyColor = (proficiency?: string) => {
  if (!proficiency) return "";
  const colors: ProficiencyColorMap = {
    Experienced: "text-blue-500",
    Advanced: "text-emerald-500",
    Intermediate: "text-yellow-500",
    Beginner: "text-gray-500",
  };
  return colors[proficiency as keyof typeof colors] || colors["Intermediate"];
};

// Function to get tech icon color with fallback (safe if tag is missing)
const getIconColor = (tag?: Tag) => {
  if (!tag) return getCategoryColor(props.skill.categories);
  return getTechColor(tag.icon);
};
const activeItem: String = "";
</script>

<template>
  <article
    class="card skill-card relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    :style="{
      '--category-color': getCategoryColor(skill.categories),
      '--gradient-from': getGradientColors(skill.categories)[0],
      '--gradient-to': getGradientColors(skill.categories)[1],
    }"
  >
    <!-- Dotted Background -->
    <div v-if="useBgDots" class="absolute inset-0 opacity-10">
      <div
        class="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
      ></div>
    </div>

    <NuxtLink
      :to="skill.url"
      target="_blank"
      class="relative flex flex-col h-full"
    >
      <!-- Category Badge (slides out on hover) -->
      <div
        class="absolute top-2 right-2 z-10 transform transition-all group-hover:translate-x-6 group-hover:opacity-0"
      >
        <span
          class="px-2 py-0.5 text-xs font-medium rounded-full backdrop-blur-sm"
          :style="{
            background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
            color: 'white',
            boxShadow: `0 2px 4px ${getCategoryColor(skill.categories)}40`,
          }"
        >
          {{ skill.categories[0] }}
        </span>
      </div>

      <!-- Icon Container with 3D Effect - Use Tech Original Color or colored class -->
      <div class="relative p-3 perspective-1000">
        <div
          class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          :style="{
            background:
              !colored && skill.tags[0]
                ? `linear-gradient(135deg, ${getIconColor(skill.tags[0])}20, transparent)`
                : `linear-gradient(135deg, ${getCategoryColor(skill.categories)}20, transparent)`,
          }"
        ></div>
        <div
          class="icon-container transform-gpu transition-transform duration-300 group-hover:rotate-y-12"
        >
          <component
            :is="handleIconComponent(skill.icon)"
            class="tech-icon"
            :class="getIconClasses(skill.icon)"
            :style="
              colored
                ? {}
                : {
                    color: getIconColor(skill.tags[0]),
                    textShadow: `0 2px 4px ${getIconColor(skill.tags[0])}30`,
                  }
            "
          />
        </div>
      </div>

      <!-- Title with Proficiency - Modified to use original tech colors or follow design theme -->
      <div class="px-3 mb-1">
        <h2
          class="text-base font-semibold text-main-gradient transition-all duration-300 group-hover:translate-x-1"
          :style="
            colored
              ? {}
              : {
                  color: skill.tags[0]
                    ? getIconColor(skill.tags[0])
                    : 'inherit',
                }
          "
        >
          {{ skill.title }}
        </h2>
        <div class="flex items-center gap-2 mt-1">
          <span
            v-if="skill.proficiency"
            :class="[
              'text-xs font-medium',
              getProficiencyColor(skill.proficiency),
            ]"
          >
            {{ skill.proficiency }}
          </span>
          <span
            v-if="skill.experience"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            {{ skill.experience }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p
        class="text-xs text-gray-600 dark:text-gray-400 px-3 mb-2 flex-grow leading-relaxed overflow-hidden"
      >
        {{ skill.description }}
      </p>

      <!-- Tech Stack with Tech Original Colors or themed colors -->
      <div class="flex flex-wrap gap-1 px-2 pb-2">
        <span
          v-for="tag in skill.tags"
          :key="tag.name"
          class="inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded transition-all duration-300 group-hover:scale-105"
          :style="
            colored
              ? {
                  background: `${getCategoryColor(skill.categories)}15`,
                  color: getCategoryColor(skill.categories),
                  border: `1px solid ${getCategoryColor(skill.categories)}30`,
                  boxShadow: `0 1px 2px ${getCategoryColor(skill.categories)}20`,
                }
              : {
                  background: `${getIconColor(tag)}15`,
                  color: getIconColor(tag),
                  border: `1px solid ${getIconColor(tag)}30`,
                  boxShadow: `0 1px 2px ${getIconColor(tag)}20`,
                }
          "
        >
          <i
            :class="[tag.icon, colored ? 'colored text-xs' : 'text-xs']"
            :style="colored ? {} : { color: getIconColor(tag) }"
          ></i>
          {{ tag.name }}
        </span>
      </div>

      <!-- Hover Indicator with Tech Color or themed colors -->
      <div
        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="{
          background:
            !colored && skill.tags[0]
              ? `linear-gradient(to right, transparent, ${getIconColor(skill.tags[0])}, transparent)`
              : 'linear-gradient(to right, transparent, var(--gradient-from), transparent)',
        }"
      ></div>

      <!-- Shine Effect -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="shine"></div>
      </div>
    </NuxtLink>
  </article>
</template>
