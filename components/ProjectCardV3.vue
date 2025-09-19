<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      description: "",
      link: "#",
      categories: [],
      tags: [],
    }),
  },
  colored: {
    type: Boolean,
    default: false,
  },
});

// Function to get category colors
const getCategoryColor = (category) => {
  const colors = {
    frontend: "#3B82F6",
    backend: "#10B981",
    fullstack: "#6366F1",
    mobile: "#06B6D4",
    design: "#F43F5E",
    default: "#6B7280",
  };
  return colors[category] || colors.default;
};

// Function to get gradient colors
const getGradientColors = (category) => {
  const colors = {
    frontend: ["#3B82F6", "#60A5FA"],
    backend: ["#10B981", "#34D399"],
    fullstack: ["#6366F1", "#818CF8"],
    mobile: ["#06B6D4", "#22D3EE"],
    design: ["#F43F5E", "#FB7185"],
    default: ["#6B7280", "#9CA3AF"],
  };
  return colors[category] || colors.default;
};

// Function to get tech icon color
const getIconColor = (tag) => {
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
  };

  const baseIconClass = tag.icon?.split(" ")[0];
  return (
    techColors[baseIconClass] || getCategoryColor(props.project.categories[0])
  );
};
</script>

<template>
  <article
    class="project-card relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group focus-within:ring-2 focus-within:ring-main-500"
    tabindex="0"
  >
    <!-- Dotted Decoration removed from here -->
    <NuxtLink
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
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
              : `linear-gradient(135deg, ${getCategoryColor(project.categories[0])}20, transparent)`,
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

          <i
            v-else-if="project.tags[0]?.icon"
            :class="[project.tags[0].icon, 'tech-icon', 'colored']"
          ></i>
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
          <i v-else :class="[tag.icon, 'text-xs', 'colored']"></i>
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

<style scoped>
.project-card {
  /* Use inset shadow as base border to avoid hover halo */
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.12)
  );
  transform-style: preserve-3d;
  z-index: 1;
  outline: none;
  position: relative;
  /* Ensure inner content doesn't overlap border mask corners */
  border-radius: 0.5rem; /* match rounded-lg */
}

.project-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 0;
  opacity: 0.1;
  pointer-events: none;
  background: radial-gradient(#3b82f6 1px, transparent 1px);
  background-size: 16px 16px;
}

.dark .project-card {
  background: linear-gradient(
    to bottom,
    rgba(31, 41, 55, 0.6),
    rgba(31, 41, 55, 0.12)
  );
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.project-card:hover,
.project-card:focus-within {
  transform: translateY(-4px) scale(1.025);
  box-shadow:
    inset 0 0 0 1px transparent,
    0 8px 24px rgba(0, 0, 0, 0.16),
    0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dark .project-card:hover,
.dark .project-card:focus-within {
  box-shadow:
    inset 0 0 0 1px transparent,
    0 8px 24px rgba(0, 0, 0, 0.28),
    0 2px 8px rgba(0, 0, 0, 0.18);
}

.icon-container {
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.group:hover .gauss-scale,
.group:focus-within .gauss-scale {
  transform: rotateY(12deg) scale(1.13);
}
.project-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px; /* border thickness */
  background: linear-gradient(
    45deg,
    var(--main-gradient-from),
    var(--main-gradient-to)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  /* Prevent subpixel bleed by aligning to physical pixels */
  will-change: transform, opacity;
}

.project-card:hover::after,
.project-card:focus-within::after {
  opacity: 1;
}
.shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: rotate(30deg);
  transition:
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s;
  opacity: 0;
}

.group:hover .shine,
.group:focus-within .shine {
  transform: rotate(30deg) translateX(100%);
  opacity: 1;
}

.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.tech-icon {
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.45s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  font-size: 2rem;
}

.group:hover .tech-icon:not(.preserve-animation),
.group:focus-within .tech-icon:not(.preserve-animation) {
  animation: gentle-pulse 0.45s ease-in-out infinite alternate;
  font-size: 2.5rem;
}

@keyframes gentle-pulse {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 2px currentColor);
  }
  100% {
    transform: scale(1.13);
    filter: drop-shadow(0 0 12px currentColor);
  }
}
</style>
