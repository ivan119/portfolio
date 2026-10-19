<script setup lang="ts">
import { useProjects } from "~/composables/useProjects";
import { isActiveProjectClass } from "~/composables/useActiveClass";

const xlWidth = ref(false);
const { projects, allProjects, error, pending, refresh } = await useProjects();

definePageMeta({
  middleware: ["projects-active"],
});

usePageSeo({
  title: "Projects — Ivan Kelava",
  description:
    "Selected projects, platforms, and case studies engineered and led by Ivan Kelava across SaaS, creator tech, eCommerce, and mobile.",
  image: "/seo/IvanKelavaProjects1200x627.webp",
  imageAlt: "Projects - Ivan Kelava",
  lang: "en",
});
</script>

<template>
  <div
    :class="[
      xlWidth ? '!max-w-7xl' : '!p-3 md:p-0 mx-auto w-full space-y-6',
      {
        'slide-enter-active': isActiveProjectClass,
      },
    ]"
  >
    <!-- Header Section -->
    <Banner title="Projects & Case Studies" description="">
      <template #default>
        <p class="text-base md:text-lg text-slate-700 dark:text-slate-300">
          A showcase of platforms, web architectures, and mobile apps I've built and led as Senior Software Engineer & Team Lead — spanning enterprise SaaS, creator tools, high-throughput sports betting, and eCommerce.
        </p>
      </template>
    </Banner>

    <!-- Main / Flagship Projects -->
    <Banner title="Flagship Projects" description="" :first-tag-is-h1="false">
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
                :key="project.slug"
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

    <!-- Other Production Work -->
    <Banner title="Client & Production Platforms" description="" :first-tag-is-h1="false">
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
            <EmptyState
              v-if="allProjects.length === 0"
              title="No projects to show"
              description="Other projects will appear here once available."
            />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LazyProjectCardV3
                v-for="project in allProjects"
                :key="project.slug"
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
