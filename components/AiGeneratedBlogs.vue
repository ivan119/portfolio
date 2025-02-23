<script setup lang="ts">
import { ref, onMounted } from "vue";
import { posts as aiPosts, type AiBlogPost } from "~/data/posts";

const posts = ref<AiBlogPost[]>(aiPosts);
const loading = ref(false);
const error = ref<string | null>(null);

// Sort posts by date
posts.value.sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

// Format date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        AI-Generated Posts
      </h2>
      <BaseButton to="/blog/generate" variant="primary" class="text-base">
        Generate New Post
      </BaseButton>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <NuxtLink :to="`/blog/ai/${post.id}`" class="block">
          <div class="p-6">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
              >
                {{ tag }}
              </span>
            </div>

            <h3
              class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2"
            >
              {{ post.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ post.description }}
            </p>

            <div
              class="flex items-center text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{{ formatDate(post.createdAt) }}</span>
              <span class="mx-2">•</span>
              <span>AI Generated</span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
