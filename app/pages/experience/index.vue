<script setup lang="ts">
import { useExperience } from "~/composables/useExperience";
import { useProjects } from "~/composables/useProjects";

const activeTab = ref<"all" | "timeline" | "projects" | "education">("all");

const { experience, education } = await useExperience();
const { projects, allProjects, pending: projectsPending, error: projectsError } = await useProjects();

const combinedProjects = computed(() => {
  const list = [...(projects.value || []), ...(allProjects.value || [])];
  // Deduplicate by slug
  const seen = new Set();
  return list.filter((item) => {
    if (!item?.slug || seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
});

usePageSeo({
  title: "Experience & Work — Ivan Kelava",
  description:
    "Professional work experience, tech leadership, and flagship projects by Ivan Kelava, Senior Software Engineer & Owner of Singular Design.",
  image: "/seo/IvanKelavaProjects1200x627.webp",
  imageAlt: "Ivan Kelava - Experience & Work",
  lang: "en",
});
</script>

<template>
  <div class="!p-3 md:p-0 mx-auto w-full space-y-8 slide-enter-active">
    <!-- Header Banner -->
    <Banner title="Experience & Work" description="">
      <template #default>
        <p class="text-base md:text-lg text-slate-700 dark:text-slate-300">
          Senior Software Engineer with <strong>6+ years of experience</strong> leading teams, architecting Vue & Nuxt enterprise systems, and delivering production-grade web and mobile applications through an AI-assisted workflow.
        </p>

        <!-- Quick Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="p-3 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Experience</span>
            <p class="text-lg md:text-xl font-bold text-slate-900 dark:text-white">6+ Years</p>
          </div>
          <div class="p-3 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Current Role</span>
            <p class="text-lg md:text-xl font-bold text-emerald-600 dark:text-emerald-400">Senior (B2B)</p>
          </div>
          <div class="p-3 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Leadership</span>
            <p class="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">5+ Devs Led</p>
          </div>
          <div class="p-3 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Flagship Platform</span>
            <p class="text-lg md:text-xl font-bold text-slate-900 dark:text-white">24M+ Points</p>
          </div>
        </div>

        <!-- Filter / Tab Navigation -->
        <div class="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          <button
            type="button"
            @click="activeTab = 'all'"
            :class="[
              'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
            ]"
          >
            All Overview
          </button>
          <button
            type="button"
            @click="activeTab = 'timeline'"
            :class="[
              'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'timeline'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
            ]"
          >
            Career Timeline ({{ experience.length }})
          </button>
          <button
            type="button"
            @click="activeTab = 'projects'"
            :class="[
              'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'projects'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
            ]"
          >
            Projects & Case Studies ({{ combinedProjects.length }})
          </button>
        </div>
      </template>
    </Banner>

    <!-- SECTION 1: Career Timeline -->
    <section v-if="activeTab === 'all' || activeTab === 'timeline'" class="space-y-4">
      <ExperienceTimeline />
    </section>

    <!-- SECTION 2: Merged Projects & Case Studies -->
    <section v-if="activeTab === 'all' || activeTab === 'projects'" class="space-y-6 pt-6">
      <div class="border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Featured Projects & Case Studies</span>
        </h2>
        <p class="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
          Key production platforms, apps, and platforms delivered across SaaS, eCommerce, creator tech, and mobile.
        </p>
      </div>

      <div v-if="projectsPending" class="text-sm text-slate-500 dark:text-slate-400">
        Loading projects…
      </div>
      <div v-else-if="projectsError" class="text-sm text-red-600 dark:text-red-400">
        Failed to load projects.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LazyProjectCardV3
          v-for="project in combinedProjects"
          :key="project.slug"
          :project="project"
          :colored="true"
        />
      </div>

      <div class="pt-4">
        <GithubLink />
      </div>
    </section>

    <!-- SECTION 3: Contact Footer Card -->
    <section class="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-transparent border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3">
      <h3 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
        Interested in collaborating or hiring?
      </h3>
      <p class="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        Available for senior B2B contract engagements, architecture consulting, and high-impact engineering.
      </p>
      <div class="flex items-center justify-center gap-3 pt-2 flex-wrap">
        <BaseButton href="mailto:KelavaIvan@proton.me" external variant="primary">
          Get in touch via Email
        </BaseButton>
        <BaseButton href="https://www.linkedin.com/in/kelava-ivan" external variant="secondary">
          Connect on LinkedIn
        </BaseButton>
      </div>
    </section>
  </div>
</template>
