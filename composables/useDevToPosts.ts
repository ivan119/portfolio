export type DevToPost = {
  id: number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tags: string[];
  cover_image: string;
  url: string;
  user: {
    name: string;
    profile_image: string;
  };
};

export const useDevToPosts = () => {
  const fetchPosts = async () => {
    try {
      return await $fetch<DevToPost[]>("https://dev.to/api/articles", {
        params: {
          per_page: 9,
          tags: "webdev,javascript,typescript",
        },
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to fetch blog posts. Please try again later.",
      });
    }
  };

  const fetchSinglePost = async (id: number) => {
    try {
      return await $fetch<DevToPost>(`https://dev.to/api/articles/${id}`);
    } catch (error) {
      console.error(`Failed to fetch post with ID ${id}:`, error);
      throw createError({
        statusCode: 404,
        message: `Blog post with ID ${id} not found.`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    fetchPosts,
    fetchSinglePost,
    formatDate,
  };
};
