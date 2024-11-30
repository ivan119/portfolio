<script setup lang="ts">
import { useDevToPosts } from "~/composables/useDevToPosts";
import { useAsyncData, useRoute } from "#imports";

definePageMeta({
  pageTransition: false,
});

const route = useRoute();
const { fetchSinglePost, formatDate } = useDevToPosts();
const { data: post, status } = await useAsyncData(
  `blog-post-${route.params.id}`,
  () => fetchSinglePost(Number(route.params.id)),
);
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Loading State -->
    <div
      v-if="status === 'pending'"
      class="flex justify-center items-center min-h-[400px]"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <template v-else-if="post">
      <!-- Post Header -->
      <div class="mb-8">
        <h1
          :style="{ 'view-transition-name': `post-title-${post.id}` }"
          class="text-4xl font-bold mb-4"
        >
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <img
              :src="post.user.profile_image"
              :alt="post.user.name"
              class="w-8 h-8 rounded-full"
            />
            <span>{{ post.user.name }}</span>
          </div>
          <span>{{ formatDate(post.published_at) }}</span>
          <span>{{ post.reading_time_minutes }} min read</span>
        </div>
      </div>

      <!-- Post Image -->
      <img
        v-if="post.cover_image"
        :src="post.cover_image"
        :alt="post.title"
        :style="{ 'view-transition-name': `post-image-${post.id}` }"
        class="w-full h-[400px] object-cover rounded-lg mb-8"
      />

      <!-- Post Content -->
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-lg">{{ post.description }}</p>
        <a
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Read on Dev.to
        </a>
      </div>
    </template>
  </div>
</template>
