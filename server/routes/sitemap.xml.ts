import { posts } from "../data/posts";
import { projects, allProjects } from "../data/projects";

export default defineCachedEventHandler(
  (event) => {
    const proto = getHeader(event, "x-forwarded-proto") || "http";
    const host =
      getHeader(event, "x-forwarded-host") ||
      getHeader(event, "host") ||
      "localhost:3000";
    const base = `${proto}://${host}`;

    const urls: Array<{
      loc: string;
      lastmod?: string;
      changefreq?: string;
      priority?: number;
    }> = [
      { loc: `${base}/`, priority: 1.0, changefreq: "weekly" },
      { loc: `${base}/projects`, priority: 0.8, changefreq: "weekly" },
      { loc: `${base}/skills`, priority: 0.8, changefreq: "weekly" },
      { loc: `${base}/blog`, priority: 0.7, changefreq: "weekly" },
    ];

    for (const post of posts) {
      const lastmod = (post as any).date
        ? new Date((post as any).date).toISOString()
        : undefined;
      const id = (post as any).id || (post as any).slug;
      if (id) {
        urls.push({
          loc: `${base}/blog/${id}`,
          changefreq: "monthly",
          priority: 0.6,
          lastmod,
        });
      }
    }

    // Include individual project pages
    const projectSlugs = new Set<string>();
    for (const p of [...projects, ...allProjects]) {
      const slug = (p as any).slug;
      if (slug) projectSlugs.add(slug);
    }
    for (const slug of projectSlugs) {
      urls.push({
        loc: `${base}/projects/${slug}`,
        changefreq: "monthly",
        priority: 0.7,
      });
    }

    const urlset = urls
      .map((u) => {
        return `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n    <changefreq>${u.changefreq || "monthly"}</changefreq>\n    <priority>${(u.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;

    setHeader(event, "Content-Type", "application/xml");
    return xml;
  },
  {
    maxAge: 60 * 60, // 1h
    swr: true,
  },
);
