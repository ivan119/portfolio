import type { PreviewBlogPost, BlogPost } from "~~/server/types/blog";

export function usePosts() {
  const posts: Ref<PreviewBlogPost[]> = ref([]); // all posts
  const featuredPost: Ref<PreviewBlogPost | null> = ref(null); // latest post
  const post: Ref<BlogPost | null> = ref(null); // single post by slug

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const { data } = await useFetch<{
        posts: PreviewBlogPost[];
        featured_post: PreviewBlogPost | null;
      }>("/api/blog/posts", {
        default: () => ({ posts: [], featured_post: null }),
      });
      posts.value = data.value?.posts || [];
      featuredPost.value = data.value?.featured_post || null;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch single post by slug/id
  const fetchPostById = async (slug: string) => {
    try {
      const { data } = await useFetch<BlogPost | null>(
        `/api/blog/posts?slug=${slug}`,
        {
          default: () => null,
        },
      );
      post.value = data.value;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  };

  return {
    posts,
    featuredPost,
    post,
    fetchPosts,
    fetchPostById,
  };
}
