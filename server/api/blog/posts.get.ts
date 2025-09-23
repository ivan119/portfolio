import { Schema, model } from "mongoose";
import { getQuery } from "h3";
const PostSchema = new Schema({
  id: {
    type: String, // slug-style identifier like "ai-agents-transforming-digital-landscape"
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String, // or Date if you prefer actual date objects
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String], // array of strings
    default: [],
  },
  excerpt: {
    type: String,
  },
  content: {
    type: Array, // array of paragraphs (strings)
    default: () => [],
  },
  coverImage: {
    type: String,
    default: "",
  },
});
export const Posts = model("Posts", PostSchema);
export default defineCachedEventHandler(
  async (event) => {
    // Get all posts, sorted by date (newest first)
    const query = getQuery(event);
    // ✅ If `slug` is present → return single post
    if (query.slug) {
      const post = await Posts.findOne({ id: query.slug }); // or { slug: query.slug } depending on schema
      if (!post) {
        throw createError({ statusCode: 404, statusMessage: "Post not found" });
      }
      return post;
    }
    const posts = await Posts.find()
      .sort({ date: -1 })
      .select("title excerpt author date coverImage id");
    if (posts?.length > 0) {
      return { latest_post: posts[0], posts: posts.slice(1) };
    } else {
      return { latest_post: [], posts: [] };
    }
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
