export type PageSeoInput = {
  title: string;
  description: string;
  image?: string; // absolute or relative to origin
  imageAlt?: string;
  robots?: string;
  lang?: string;
  type?: "website" | "article";
  datePublished?: string;
  authorName?: string;
  keywords?: string[] | string;
};

/**
 * Sets canonical, html lang, server-rendered SEO meta, and JSON-LD structured data.
 */
export function usePageSeo({
  title,
  description,
  image,
  imageAlt,
  robots = "index, follow",
  lang = "en",
  type = "website",
  datePublished,
  authorName = "Ivan Kelava",
  keywords,
}: PageSeoInput) {
  const url = useRequestURL();
  const config = useRuntimeConfig();

  // Use siteOrigin (from NUXT_PUBLIC_SITE_URL env var) for all canonical/og:url values.
  const siteOrigin =
    (config?.public?.siteUrl as string)?.replace(/\/$/, "") || "https://www.ivankelava.me";

  // Normalize path to prevent trailing slash mismatch
  const rawPath = url.pathname || "/";
  const cleanPath = rawPath === "/" ? "" : rawPath.replace(/\/$/, "");
  const canonical = `${siteOrigin}${cleanPath || "/"}`;

  // Build an absolute image URL safely
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${siteOrigin}${image.startsWith("/") ? image : `/${image}`}`
    : `${siteOrigin}/seo/IvanKelava1200x627.webp`;

  const siteName = "Ivan Kelava";
  const ogLocale = lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`;

  const formattedKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    ogImage: absoluteImage,
    twitterImage: absoluteImage,
    ...(imageAlt
      ? {
          ogImageAlt: imageAlt,
          twitterImageAlt: imageAlt,
        }
      : {}),
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    robots,
    ogSiteName: siteName,
    ogLocale,
    ...(formattedKeywords ? { keywords: formattedKeywords } : {}),
  });

  // Prepare Schema.org JSON-LD Structured Data
  const jsonLdScripts: Array<{ type: "application/ld+json"; innerHTML: string }> = [];

  if (type === "article") {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      image: absoluteImage,
      ...(datePublished ? { datePublished: new Date(datePublished).toISOString() } : {}),
      author: {
        "@type": "Person",
        name: authorName,
        url: siteOrigin,
      },
      publisher: {
        "@type": "Person",
        name: "Ivan Kelava",
        url: siteOrigin,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    };
    jsonLdScripts.push({
      type: "application/ld+json",
      innerHTML: JSON.stringify(articleSchema),
    });
  } else if (cleanPath === "") {
    // Person & Website schema for home page
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ivan Kelava",
      url: siteOrigin,
      jobTitle: "Senior Software Engineer",
      sameAs: [
        "https://github.com/ivan119",
        "https://www.linkedin.com/in/kelava-ivan",
      ],
    };
    jsonLdScripts.push({
      type: "application/ld+json",
      innerHTML: JSON.stringify(personSchema),
    });
  }

  useHead({
    htmlAttrs: { lang },
    link: [{ rel: "canonical", href: canonical }],
    script: jsonLdScripts,
  });
}

