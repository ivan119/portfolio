<script setup lang="ts">
import { useRoute } from "vue-router";
import type { ProjectItem } from "~~/server/types/project";
import { useIconComponentHandler } from "~/composables/skills/useComponentHandler";

const route = useRoute();
const slug = route.params.slug as string;

import { useProject } from "~/composables/useProject";
import Tooltip from "~/components/UI/Tooltip.vue";
import { isActiveProjectClass } from "~/composables/useActiveClass";

const { project, fetchProjectBySlug } = useProject();
await fetchProjectBySlug(slug);

const p = computed<ProjectItem | null>(() => project.value);

// In-page preview (sandboxed iframe)
const showPreview = ref(false);
const frameLoaded = ref(false);
const onFrameLoad = () => {
  frameLoaded.value = true;
};
const previewUrl = computed(() => p.value?.link || "");

definePageMeta({
  middleware: ["projects-active"],
});
usePageSeo({
  title: p.value?.title
    ? `${p.value.title} — Projects | Ivan Kelava`
    : "Project — Ivan Kelava",
  description: p.value?.description || "Project case study by Ivan Kelava.",
  image: "/seo/IvanKelavaProjects1200x627.webp",
  imageAlt: p.value?.title
    ? `${p.value.title} preview image`
    : "Project preview image",
  lang: "en",
});
</script>

<template>
  <div class="!max-w-7xl !p-3 md:p-0 mx-auto p-4 md:p-8 md:pt-5">
    <div v-if="p" :class="{ 'slide-enter-active': isActiveProjectClass }">
      <!-- Hero -->
      <div
        class="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-white/5"
      >
        <div
          class="absolute inset-0 opacity-60 pointer-events-none"
          :style="{
            background:
              'radial-gradient(1200px 400px at -10% -10%, rgba(99,102,241,0.15), transparent), radial-gradient(1200px 400px at 110% -10%, rgba(59,130,246,0.12), transparent)',
          }"
        ></div>
        <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
          <NuxtLink
            v-if="p && p.link"
            :to="p.link"
            external
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open project in new tab"
            class="w-full h-full"
          >
            <div
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/80 shadow-sm backdrop-blur hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-main-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900/80"
            >
              <UIIconsEye />
            </div>
          </NuxtLink>
        </div>

        <div
          :class="{ 'slide-enter-active': isActiveProjectClass }"
          class="relative p-5 md:p-8 space-y-4"
        >
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span
                :style="{
                  'view-transition-name': `project-title-${p.slug}`,
                }"
                class="bg-gradient-to-r from-main-500 text-main-gradient"
              >
                {{ p.title }}
              </span>
            </h1>
          </div>

          <div class="flex flex-wrap gap-2 items-center">
            <span
              class="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
            >
              {{ p.status }}
            </span>
            <span
              v-if="p.timeline"
              class="inline-flex items-center text-[11px] font-medium darkIndigoBackground"
            >
              {{ p.timeline }}
            </span>
            <span
              v-for="cat in p.categories"
              :key="cat"
              class="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60"
            >
              {{ cat }}
            </span>
          </div>

          <p
            :style="{
              'view-transition-name': `project-description-${p.slug}`,
            }"
            class="text-sm text-gray-700 dark:text-gray-300"
          >
            {{ p.description }}
          </p>

          <div
            v-if="p.longDescription"
            class="prose dark:prose-invert max-w-none text-sm leading-relaxed"
          >
            {{ p.longDescription }}
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in p.tags"
              :key="tag.name"
              :style="{
                'view-transition-name': `project-tag-${p.slug}-${index}`,
              }"
              class="inline-flex items-center gap-2 text-xs font-medium, px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
            >
              <dev-tools-icons-gauss-logo
                v-if="tag.gaussCMSlogo"
                class="w-4 h-4"
              />
              <component
                v-else
                :is="
                  useIconComponentHandler().handleIconComponent(tag.icon || '')
                "
                :class="[tag.icon, 'w-4 h-4', 'colored']"
              />
              {{ tag.name }}
            </span>
          </div>
          <Navigation-Breadcrumbs />

          <div v-if="p.features?.length" class="mt-4">
            <div
              class="rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/50 dark:bg-slate-900/40 p-4"
            >
              <h3 class="text-sm font-semibold mb-3 tracking-tight">
                Key features
              </h3>
              <ul
                class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <li
                  v-for="f in p.features"
                  :key="f"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-main-500"
                  ></span>
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="p.responsibilities?.length" class="mt-4">
            <div
              class="rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/50 dark:bg-slate-900/40 p-4"
            >
              <h3 class="text-sm font-semibold mb-3 tracking-tight">
                My responsibilities
              </h3>
              <ul
                class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <li
                  v-for="r in p.responsibilities"
                  :key="r"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                  ></span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="showPreview && p.allowPreview !== false" class="mt-4">
            <div
              class="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <iframe
                v-if="previewUrl"
                :src="previewUrl"
                class="w-full h-[70vh] bg-white dark:bg-gray-900"
                loading="lazy"
                referrerpolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                @load="onFrameLoad"
              />
              <div
                v-else
                class="p-4 text-sm text-slate-600 dark:text-slate-300"
              >
                No preview URL available.
              </div>
            </div>
            <p
              v-if="showPreview && !frameLoaded"
              class="mt-2 text-xs text-slate-500"
            >
              If the preview does not load, the site may block embedding
              (X-Frame-Options/CSP).
            </p>
          </div>
          <div v-else-if="showPreview && p.allowPreview === false" class="mt-4">
            <div
              class="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-4 text-amber-800 dark:text-amber-200 text-sm"
            >
              Inline preview disabled for this project. Please use the Open
              button to visit the live site.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container mx-auto px-4 py-16">
      <UIEmptyState
        title="Project not found"
        description="The project you're looking for doesn't exist or has been removed."
      >
        <BaseButton variant="primary" @click="$router.push('/projects')"
          >Back to Projects</BaseButton
        >
      </UIEmptyState>
    </div>
  </div>
</template>
