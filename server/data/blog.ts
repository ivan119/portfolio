import MarkdownIt from "markdown-it";
import markdownFiles from "#blog-content";
import type { BlogPost } from "../../shared/types/blog";
import { posts as legacyPosts } from "./posts";

const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true });

type MarkdownFrontmatter = {
  author?: string;
  category?: string;
  coverImage?: string;
  date?: string;
  excerpt?: string;
  id?: string;
  published?: boolean;
  tags?: string[];
  title?: string;
};

function unquote(value: string) {
  return value.replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, "$1$2");
}

function parseFrontmatter(source: string): { attributes: MarkdownFrontmatter; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { attributes: {}, body: source };

  const attributes: MarkdownFrontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 1) continue;

    const key = line.slice(0, separator).trim() as keyof MarkdownFrontmatter;
    const rawValue = line.slice(separator + 1).trim();
    if (key === "published") attributes.published = rawValue === "true";
    else if (key === "tags") {
      attributes.tags = rawValue
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((tag) => unquote(tag.trim()))
        .filter(Boolean);
    } else if (["author", "category", "coverImage", "date", "excerpt", "id", "title"].includes(key)) {
      attributes[key] = unquote(rawValue) as never;
    }
  }

  return { attributes, body: match[2] };
}

function excerptFrom(markdownBody: string) {
  return markdownBody
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!?(\[[^\]]*\])\([^)]*\)/g, "$1")
    .replace(/[*_`>~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function markdownPost(path: string, source: string): BlogPost {
  const { attributes, body } = parseFrontmatter(source);
  const fileId = path.split("/").pop()?.replace(/\.md$/, "");
  const id = attributes.id || fileId;

  if (!id || !attributes.title || !attributes.date) {
    throw new Error(`Markdown blog post ${path} requires id, title, and date frontmatter.`);
  }

  return {
    id,
    title: attributes.title,
    date: attributes.date,
    author: attributes.author || "Ivan Kelava",
    category: attributes.category,
    tags: attributes.tags || [],
    published: attributes.published ?? false,
    excerpt: attributes.excerpt || excerptFrom(body),
    coverImage: attributes.coverImage || "/seo/IvanKelavaBlog1200x627.webp",
    content: [],
    contentHtml: markdown.render(body),
    image: attributes.coverImage || "/seo/IvanKelavaBlog1200x627.webp",
  };
}

export const posts: BlogPost[] = [
  ...legacyPosts,
  ...Object.entries(markdownFiles).map(([path, source]) => markdownPost(path, source)),
].sort((left, right) => (right.date || "").localeCompare(left.date || ""));
