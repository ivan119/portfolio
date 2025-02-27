<script setup lang="ts">
import type { DevToPost } from "~/composables/useDevToPosts";
import { useDevToPosts } from "~/composables/useDevToPosts";

defineProps<{
  post: DevToPost;
}>();

const { formatDate } = useDevToPosts();
</script>

<template>
  <NuxtLink
    :to="`/blogLegacy/${post.id}`"
    class="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
  >
    <div class="relative aspect-video">
      <NuxtImg
        :src="
          post.cover_image || `https://picsum.photos/seed/${post.id}/800/400`
        "
        :alt="post.title"
        :style="{ 'view-transition-name': `post-image-${post.id}` }"
        class="w-full h-full object-cover"
        format="webp"
        loading="lazy"
        :width="800"
        :height="400"
      />
    </div>
    <div class="p-6">
      <h2
        class="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors"
        :style="{ 'view-transition-name': `post-title-${post.id}` }"
      >
        {{ post.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {{ post.description }}
      </p>
      <div
        class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
      >
        <div class="flex items-center gap-2">
          <NuxtImg
            :src="post.user.profile_image"
            :alt="post.user.name"
            class="w-6 h-6 rounded-full"
            format="webp"
            loading="lazy"
            :width="24"
            :height="24"
          />
          <span>{{ post.user.name }}</span>
        </div>
        <span>{{ formatDate(post.published_at) }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
