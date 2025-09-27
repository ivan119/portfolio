import { posts } from "~/server/data/posts";
export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);

    if (query.slug) {
      const post = posts?.find((post) => post.id === query.slug);
      if (!post)
        throw createError({ statusCode: 404, statusMessage: "Post not found" });
      return post;
    }
    console.log(1);
    return { latest_post: posts[0], posts: posts.slice(1) };
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
