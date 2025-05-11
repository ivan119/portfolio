<script setup lang="ts">
import ProjectCardV3 from "@/components/ProjectCardV3.vue";
import { useProjects } from "~/composables/useProjects";

const showFrameworkDetails = ref(false);

// Get projects data from composable
const { techStackData, projects, allProjects } = useProjects();
</script>

<template>
  <div
    :class="[
      showFrameworkDetails
        ? '!max-w-7xl'
        : '!p-3 md:p-0 mx-auto w-full space-y-5',
    ]"
  >
    <!-- Banner Section -->
    <UIBanner title="Projects" description="">
      <template #default>
        <p class="text-lg text-gray-300">
          Projects where I served as Team Lead at
          <BaseButton
            href="https://gauss.hr/en"
            variant="link"
            external
            class="text-teal-400 hover:text-teal-300"
          >
            Gauss
          </BaseButton>
          , leading development and architecture decisions.
        </p>
      </template>
    </UIBanner>
    <!-- Main Projects -->
    <UIBanner title="Main Projects" description="" :first-tag-is-h1="false">
      <template #default>
        <section class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCardV3
              v-for="project in projects"
              :key="project.title"
              :project="project"
              :colored="true"
            />
          </div>
        </section>
      </template>
    </UIBanner>

    <!-- Other Projects -->
    <UIBanner title="Other Projects" description="" :first-tag-is-h1="false">
      <template #default>
        <section class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCardV3
              v-for="project in allProjects"
              :key="project.title"
              :project="project"
              :colored="true"
            />
          </div>
        </section>
      </template>
    </UIBanner>
  </div>
</template>

<style scoped>
/* Improve scrollbars */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Add glow effect to cards on hover */
.transform:hover {
  filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.1));
}
</style>
