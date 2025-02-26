<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import aiBlogData from "~/data/aiBlogGenerated.json";
import { useDevToPosts } from "~/composables/useDevToPosts";

const route = useRoute();
const postId = route.params.id as string;
const { fetchPost } = useDevToPosts();

// First check if it's an AI-generated post
const aiPost = computed(() => {
  return aiBlogData.posts.find((p) => p.id === postId) || null;
});

// If not an AI post, try to fetch from dev.to
const { data: devToPost, error: devToError } = !aiPost.value 
  ? await useAsyncData(`blog-post-${postId}`, () => fetchPost(postId))
  : { data: ref(null), error: ref(null) };

// Determine which type of post we're dealing with
const isAiPost = computed(() => !!aiPost.value);
const notFound = computed(() => !aiPost.value && !devToPost.value);

// Format date nicely
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Estimated read time for dev.to posts
const readTime = computed(() => {
  if (!devToPost.value?.content) return "5 min read";
  const words = devToPost.value.content.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200); // Assuming 200 words per minute
  return `${time} min read`;
});

// Helper to determine content type for AI posts
const isHeading = (item: any) => item.type === "heading";
const isParagraph = (item: any) => item.type === "paragraph";
const isImage = (item: any) => item.type === "image";

// Get heading level class for AI posts
const getHeadingClass = (level: number) => {
  switch (level) {
    case 1:
      return "text-4xl font-bold mb-6";
    case 2:
      return "text-3xl font-bold mb-5 mt-8";
    case 3:
      return "text-2xl font-bold mb-4 mt-6";
    default:
      return "text-xl font-bold mb-3 mt-4";
  }
};
</script>

<template>
  <div v-if="notFound" class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl font-bold mb-4">Post Not Found</h1>
    <p class="mb-8">
      The blog post you're looking for doesn't exist or has been removed.
    </p>
    <NuxtLink to="/blog" class="text-teal-500 hover:text-teal-600">
      &larr; Back to Blog
    </NuxtLink>
  </div>

  <!-- AI-Generated Post -->
  <div v-else-if="isAiPost && aiPost" class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <!-- Breadcrumbs -->
    <Navigation-Breadcrumbs class="mb-8" />

    <!-- Post Header -->
    <header class="mb-12">
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in aiPost.tags"
          :key="tag"
          class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
        >
          {{ tag }}
        </span>
      </div>

      <h1
        class="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
      >
        {{ aiPost.title }}
      </h1>

      <div class="flex items-center gap-4">
        <div
          class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold"
        >
          {{ aiPost.author.charAt(0) }}
        </div>
        <div>
          <div class="font-medium text-gray-900 dark:text-white">
            {{ aiPost.author }}
          </div>
          <div class="text-sm text-gray-500">
            {{ formatDate(aiPost.date) }}
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <div v-for="(item, index) in aiPost.content" :key="index">
        <!-- Headings -->
        <component
          :is="`h${item.level}`"
          v-if="isHeading(item)"
          :class="getHeadingClass(item.level)"
        >
          {{ item.content }}
        </component>

        <!-- Paragraphs -->
        <p v-else-if="isParagraph(item)" class="mb-6">
          {{ item.content }}
        </p>

        <!-- Images -->
        <figure v-else-if="isImage(item)" class="my-8">
          <NuxtImg 
            :src="item.src" 
            :alt="item.alt" 
            class="rounded-lg w-full" 
            format="webp"
            loading="lazy"
            :width="1024"
            :height="576"
          />
          <figcaption
            v-if="item.caption"
            class="text-center text-gray-500 mt-2"
          >
            {{ item.caption }}
          </figcaption>
        </figure>
      </div>
    </article>

    <!-- Back to Blog -->
    <div class="mt-16 text-center">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Blog
      </NuxtLink>
    </div>
  </div>

  <!-- Dev.to Post -->
  <article v-else-if="devToPost" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="mb-8" />

    <!-- Article Header -->
    <header class="mb-12">
      <!-- Title -->
      <h1
        class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
      >
        {{ devToPost?.title }}
      </h1>

      <!-- Meta info -->
      <div class="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div class="flex items-center gap-4">
          <NuxtImg
            :src="devToPost?.user.profile_image"
            :alt="devToPost?.user.name"
            class="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
            format="webp"
            loading="lazy"
            :width="48"
            :height="48"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ devToPost?.user.name }}
            </div>
            <div class="text-sm text-gray-500 flex items-center gap-2">
              <span>{{ formatDate(devToPost?.published_at) }}</span>
              <span class="text-gray-300 dark:text-gray-600">•</span>
              <span>{{ readTime }}</span>
            </div>
          </div>
        </div>

        <!-- Share/Actions -->
        <div class="flex items-center gap-3">
          <button
            class="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Share article"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button
            class="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Save article"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Cover Image -->
      <div
        class="relative aspect-video w-full overflow-hidden rounded-2xl mb-12"
      >
        <NuxtImg
          :src="
            devToPost?.cover_image ||
            `https://picsum.photos/seed/${devToPost?.id}/1200/600`
          "
          :alt="devToPost?.title"
          class="w-full h-full object-cover"
          format="webp"
          loading="eager"
          :width="1200"
          :height="600"
        />
      </div>
    </header>

    <!-- Article Content -->
    <div
      class="prose prose-lg dark:prose-invert max-w-none mb-12"
      v-html="devToPost?.content"
    ></div>

    <!-- Article Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 pt-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtImg
            :src="devToPost?.user.profile_image"
            :alt="devToPost?.user.name"
            class="w-16 h-16 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"
            format="webp"
            loading="lazy"
            :width="64"
            :height="64"
          />
          <div>
            <div class="font-medium text-lg text-gray-900 dark:text-white mb-1">
              Written by {{ devToPost?.user.name }}
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              Software engineer and technical writer passionate about web
              development
            </p>
          </div>
        </div>

        <!-- Follow Button -->
        <BaseButton variant="secondary" class="!px-6"> Follow </BaseButton>
      </div>
    </footer>
  </article>
</template>

<style>
/* Enhanced Typography for Article Content */
.prose {
  @apply text-gray-800 dark:text-gray-200;
}

.prose h2 {
  @apply text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white;
}

.prose h3 {
  @apply text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100;
}

.prose p {
  @apply leading-relaxed mb-6;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-900 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 no-underline hover:underline;
}

.prose blockquote {
  @apply border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic;
}

.prose ul {
  @apply list-disc list-inside mb-6;
}

.prose ol {
  @apply list-decimal list-inside mb-6;
}
</style> 