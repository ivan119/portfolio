import { posts } from "../../data/posts";
import type { BlogPost, PreviewBlogPost } from "../../types/blog";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.slug) {
    const post = posts?.find((post) => post.id === query.slug);
    if (!post)
      throw createError({ statusCode: 404, statusMessage: "Post not found" });
    return post;
  }
  const constKeys: Array<keyof PreviewBlogPost> = [
    "id",
    "coverImage",
    "title",
    "author",
    "date",
    "excerpt",
  ];

  // Helper to transform posts to only include specific keys
  function transformPosts<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K> {
    return keys.reduce(
      (acc, key) => {
        if (key in obj) {
          acc[key] = obj[key];
        }
        return acc;
      },
      {} as Pick<T, K>,
    );
  }
  // Transform posts
  const transformedPosts = posts
    ?.filter((p) => p.published)
    .map((p) =>
      // @ts-ignore
      transformPosts<BlogPost, keyof PreviewBlogPost>(p, constKeys),
    );
  return {
    featured_post: transformedPosts[0],
    posts: transformedPosts.slice(1),
  };
});
