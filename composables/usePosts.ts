import { useState } from "#app";
// This is implemented to keep api-view-transition present for blog/blog:id
export function usePosts() {
  const posts = ref([]);
  const latestPost = ref(null);
  const singlePost = ref(null);
  // Fetch all posts (SSR will also run this)
  const fetchPosts = async () => {
    if (posts.value.length === 0) {
      const { data } = await useFetch("/api/blog/posts", {
        default: () => ({ posts: [], latest_post: null }),
      });
      posts.value = data.value.posts || [];
      latestPost.value = data.value.latest_post || null;
    }
  };

  // Fetch single post by slug/id
  const fetchPostById = async (slug: string) => {
    // Try from memory first
    let post = singlePost?.value?.id === slug ? singlePost.value : null;

    if (!post) {
      const { data } = await useFetch(`/api/blog/posts?slug=${slug}`, {
        default: () => null,
      });
      post = data.value;

      if (post) {
        return post;
      }
    }

    return post;
  };

  return {
    posts,
    latestPost,
    fetchPosts,
    fetchPostById,
  };
}
