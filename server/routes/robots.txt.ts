export default defineEventHandler((event) => {
  const proto = getHeader(event, "x-forwarded-proto") || "http";
  const host =
    getHeader(event, "x-forwarded-host") ||
    getHeader(event, "host") ||
    "localhost:3000";
  const base = `${proto}://${host}`;

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml`;

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return body;
});


