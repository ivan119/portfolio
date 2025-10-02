import { posts } from "../../data/posts";
export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    if (query.slug) {
      const post = posts?.find((post) => post.id === query.slug);
      if (!post)
        throw createError({ statusCode: 404, statusMessage: "Post not found" });
      return post;
    }
    const constKeys = [
      "id",
      "coverImage",
      "title",
      "author",
      "date",
      "excerpt",
    ];

    // Helper to transform posts to only include specific keys
    function transformPosts(obj: any, keys: string[]) {
      return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {} as any);
    }
    // Transform posts
    const transformedPosts =
      posts?.map((p) => transformPosts(p, constKeys)) || [];
    return {
      featured_post: transformedPosts[0],
      posts: transformedPosts.slice(1),
    };
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
