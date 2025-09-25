<script setup lang="ts">
import { computed } from "vue";
import AiGeneratedBlogs from "~/components/AiGeneratedBlogs.vue";
import { usePosts } from "~/composables/usePosts";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  date: string;
  category?: string;
  tags?: string[];
};

type BlogListCard = BlogPost & {
  category: string;
  tags: string[];
  content: any[];
};

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

const { posts, latestPost, fetchPosts } = usePosts();

// Ensure posts are available (SSR + client)
let postsFetched = ref(false);

try {
  await fetchPosts();
  postsFetched.value = true;
} catch (err) {
  console.error("Failed to fetch posts:", err);
}

const featuredPost = computed<BlogPost | null>(
  () => latestPost.value as unknown as BlogPost | null,
);
const allPosts = computed<BlogPost[]>(
  () => posts.value as unknown as BlogPost[],
);

const aiPosts = computed<BlogListCard[]>(() =>
  (posts.value as unknown as Partial<BlogListCard>[]).map((p) => ({
    id: p.id as string,
    title: p.title as string,
    excerpt: (p as any).excerpt || "",
    author: (p as any).author || "",
    date: (p as any).date || "",
    coverImage: p.coverImage,
    category: (p as any).category || "",
    tags: Array.isArray((p as any).tags) ? (p as any).tags : [],
    content: Array.isArray((p as any).content) ? (p as any).content : [],
  })),
);

if (import.meta.server && postsFetched && latestPost.value) {
  const post = latestPost.value;

  usePageSeo({
    title: "Blog — Ivan Kelava",
    description:
      post.excerpt ||
      "Latest articles and insights on web development, Vue, Nuxt, and more.",
    image: post.coverImage || "/logo.png",
    imageAlt: post.title ? `${post.title} cover image` : "Blog cover image",
    lang: "en",
  });
} else if (import.meta.server) {
  // Fallback SEO for when posts can't be loaded
  usePageSeo({
    title: "Blog — Ivan Kelava",
    description:
      "Latest articles and insights on web development, Vue, Nuxt, and more.",
    image: "/logo.png",
    imageAlt: "Blog cover image",
    lang: "en",
  });
}
</script>

<template>
  <div class="!max-w-7xl !p-3 md:p-0 mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Navigation-Breadcrumbs class="max-w-7xl px-3 sm:px-0 mx-auto" />
    <template v-if="allPosts.length > 0">
      <UIFeaturedPost
        v-if="featuredPost"
        :post="featuredPost as any"
        :image-url="featuredPost.coverImage || '/logo.png'"
        :use-bg-dots="true"
        class="mb-16 mt-3 !slide-enter-active"
      />

      <!-- Blog Posts Section -->
      <div class="mb-16">
        <AiGeneratedBlogs :posts="aiPosts" />
      </div>
    </template>
    <template v-else>
      <UIEmptyState
        title="No blog posts yet"
        description="AI-generated posts will appear here once available. Please check back soon."
      >
        <BaseButton variant="primary" @click="$router.push('/')"
          >Go Home</BaseButton
        >
      </UIEmptyState>
    </template>
  </div>
</template>
