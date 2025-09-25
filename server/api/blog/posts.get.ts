import mongoose from "mongoose";
import { getQuery } from "h3";

// Destructure from default import
const { Schema, model, connection } = mongoose;

// Define your schema
const PostSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  tags: { type: [String], default: [] },
  excerpt: { type: String },
  content: { type: Array, default: () => [] },
  coverImage: { type: String, default: "" },
});

// Prevent model overwrite in serverless
export const Posts = connection.models.Posts || model("Posts", PostSchema);

// Cached event handler
export default defineCachedEventHandler(
  async (event) => {
    // Check Mongo connection
    if (connection.readyState !== 1) {
      throw createError({
        statusCode: 503,
        statusMessage: "MongoDB is not connected",
      });
    }

    const query = getQuery(event);

    if (query.slug) {
      const post = await Posts.findOne({ id: query.slug });
      if (!post)
        throw createError({ statusCode: 404, statusMessage: "Post not found" });
      return post;
    }

    const posts = await Posts.find()
      .sort({ date: -1 })
      .select("title excerpt author date coverImage id");

    return posts.length > 0
      ? { latest_post: posts[0], posts: posts.slice(1) }
      : { latest_post: null, posts: [] };
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
