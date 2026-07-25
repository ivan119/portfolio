export default defineCachedEventHandler(
  (event) => {
    const config = useRuntimeConfig();
    const siteUrl = config.public?.siteUrl?.replace(/\/$/, "") || "https://www.ivankelava.me";
    const proto = getHeader(event, "x-forwarded-proto") || "https";
    const host =
      getHeader(event, "x-forwarded-host") ||
      getHeader(event, "host");

    const isLocalhost = !host || host.includes("localhost") || host.includes("127.0.0.1");
    const base = isLocalhost ? siteUrl : `${proto}://${host}`;

    const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml`;

    setHeader(event, "Content-Type", "text/plain; charset=utf-8");
    return body;
  },
  {
    maxAge: 60 * 60 * 24, // 1 d
    swr: true,
  },
);

