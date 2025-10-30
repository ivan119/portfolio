<script setup lang="ts">
import { useProjects } from "~/composables/useProjects";
import { isActiveProjectClass } from "~/composables/useActiveClass";
import { useIntersectionObserver } from "@vueuse/core";
const showFrameworkDetails = ref(false);
const { projects, allProjects, error, pending, refresh } = await useProjects();
const projectsTarget = useTemplateRef<HTMLDivElement>("projectsTarget");
const showProjects = ref(false);
definePageMeta({
  middleware: ["projects-active"],
});
usePageSeo({
  title: "Projects — Ivan Kelava",
  description:
    "Selected projects and case studies led by Ivan Kelava, showcasing frontend engineering and architecture.",
  image: "/seo/IvanKelavaProjects1200x627.webp",
  imageAlt: "Projects - Ivan Kelava",
  lang: "en",
});
// Only show once the section comes into view
useIntersectionObserver(projectsTarget, ([entry], observer) => {
  if (entry?.isIntersecting) {
    showProjects.value = true;
    observer.disconnect(); // stop observing after first trigger
  }
});
</script>

<template>
  <div
    :class="[
      showFrameworkDetails
        ? '!max-w-7xl'
        : '!p-3 md:p-0 mx-auto w-full space-y-5',
      {
        'slide-enter-active': isActiveProjectClass,
      },
    ]"
  >
    <!-- Banner Section -->
    <Banner title="Projects" description="">
      <template #default>
        <p class="text-lg">
          Projects where I served as Team Lead at
          <BaseButton href="https://gauss.hr/en" variant="link" external>
            Gauss
          </BaseButton>
          , leading development and architecture decisions.
        </p>
      </template>
    </Banner>

    <!-- Loading / Error States for Main Projects -->
    <Banner title="Main Projects" description="" :first-tag-is-h1="false">
      <template #default>
        <section class="space-y-6">
          <div
            v-if="pending"
            class="text-sm text-slate-500 dark:text-slate-400"
          >
            Loading projects…
          </div>
          <div v-else-if="error" class="text-sm text-red-600 dark:text-red-400">
            Failed to load projects.
            <button class="underline" @click="refresh()">Retry</button>
          </div>
          <template v-else>
            <div
              v-if="projects.length"
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <LazyProjectCardV3
                v-for="project in projects"
                :key="project.title"
                :project="project"
                :colored="true"
              />
            </div>
            <EmptyState
              v-else
              title="No projects yet"
              description="Projects will appear here once available."
            />
          </template>
        </section>
      </template>
    </Banner>

    <!-- Other Projects -->
    <Banner
      ref="projectsTarget"
      title="Other Projects"
      description=""
      :first-tag-is-h1="false"
    >
      <template v-if="showProjects" #default>
        <section class="space-y-6">
          <div
            v-if="pending"
            class="text-sm text-slate-500 dark:text-slate-400"
          >
            Loading projects…
          </div>
          <div v-else-if="error" class="text-sm text-red-600 dark:text-red-400">
            Failed to load projects.
            <button class="underline" @click="refresh()">Retry</button>
          </div>
          <template v-else>
            <EmptyState
              v-if="allProjects.length === 0"
              title="No projects to show"
              description="Other projects will appear here once available."
            />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LazyProjectCardV3
                v-for="project in allProjects"
                :key="project.title"
                :project="project"
                :show-bg-dots="false"
                :colored="true"
              />
            </div>
          </template>
        </section>
        <GithubLink class="mt-5 md:mt-10" />
      </template>
    </Banner>
  </div>
</template>
