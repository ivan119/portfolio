export function usePosts() {
  const posts = ref([]); // State to store all posts
  const featuredPost = ref(null); // State to store the latest post
  const post = ref(null); // State to store the single post fetched by slug

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const { data } = await useFetch("/api/blog/posts", {
        default: () => ({ posts: [], latest_post: null }),
      });
      posts.value = data?.value?.posts as never;
      featuredPost.value = data?.value?.featured_Post as never;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch single post by slug/id
  const fetchPostById = async (slug: string) => {
    try {
      const { data } = await useFetch(`/api/blog/posts?slug=${slug}`, {
        default: () => null,
      });
      post.value = data.value as never;
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
