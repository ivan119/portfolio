<script setup lang="ts">
import { useDevToPosts } from "~/composables/useDevToPosts";
const route = useRoute();
const { fetchPost } = useDevToPosts();

const { data: post } = await useAsyncData(`blog-post-${route.params.id}`, () =>
  fetchPost(route.params.id as string),
);

// Format date nicely
const formattedDate = computed(() => {
  if (!post.value?.published_at) return "";
  return new Date(post.value.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Estimated read time
const readTime = computed(() => {
  if (!post.value?.content) return "5 min read";
  const words = post.value.content.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200); // Assuming 200 words per minute
  return `${time} min read`;
});
</script>

<template>
  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="mb-8" />

    <!-- Article Header -->
    <header class="mb-12">
      <!-- Title -->
      <h1
        class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
      >
        {{ post?.title }}
      </h1>

      <!-- Meta info -->
      <div class="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div class="flex items-center gap-4">
          <img
            :src="post?.user.profile_image"
            :alt="post?.user.name"
            class="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ post?.user.name }}
            </div>
            <div class="text-sm text-gray-500 flex items-center gap-2">
              <span>{{ formattedDate }}</span>
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
        <img
          :src="
            post?.cover_image ||
            `https://picsum.photos/seed/${post?.id}/1200/600`
          "
          :alt="post?.title"
          class="w-full h-full object-cover"
        />
      </div>
    </header>

    <!-- Article Content -->
    <div
      class="prose prose-lg dark:prose-invert max-w-none mb-12"
      v-html="post?.content"
    ></div>

    <!-- Article Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 pt-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img
            :src="post?.user.profile_image"
            :alt="post?.user.name"
            class="w-16 h-16 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"
          />
          <div>
            <div class="font-medium text-lg text-gray-900 dark:text-white mb-1">
              Written by {{ post?.user.name }}
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
