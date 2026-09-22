# Markdown blog posts

Add one `.md` file per post in this directory. The filename becomes the post ID unless `id` is supplied in the frontmatter.

```md
---
title: "Post title"
date: "2026-09-22"
author: "Ivan Kelava"
category: "Engineering"
tags: ["Nuxt", "Vercel"]
excerpt: "Short card description."
coverImage: "/blog/my-post/cover.webp"
published: true
---

## Heading

Write the post in standard Markdown.
```

Required frontmatter: `title` and `date`. Set `published: true` to show the post in the blog index and sitemap. Markdown is rendered with embedded HTML disabled.
