export type PageSeoInput = {
  title: string;
  description: string;
  image?: string; // absolute or relative to origin
  imageAlt?: string;
  robots?: string;
  lang?: string;
};

/**
 * Sets canonical, html lang, and server-rendered SEO meta.
 * - Runs SSR-only for static tags (best for Google)
 * - Accepts relative image paths and converts to absolute
 */
export function usePageSeo({
  title,
  description,
  image,
  imageAlt,
  robots = "index, follow",
  lang = "en",
}: PageSeoInput) {
  const url = useRequestURL();
  const config = useRuntimeConfig();
  // Use siteOrigin (from NUXT_PUBLIC_SITE_URL env var) for all canonical/og:url
  // values. useRequestURL().origin returns "http://localhost" during Nitro's
  // prerender phase, which would embed localhost in every canonical tag and
  // cause Google to ignore or suppress those pages.
  const siteOrigin = (config?.public?.siteUrl as string)?.replace(/\/$/, "") || url.origin;
  const canonical = `${siteOrigin}${url.pathname}`;

  // Build an absolute image URL safely
  const absoluteImage = image
    ? image.startsWith("http")
      ? image // already absolute
      : `${siteOrigin}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;
  const siteName = "Ivan Kelava";
  const ogLocale = lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`;

  // Run on both SSR and client navigations so tags exist every time
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonical,
    ...(absoluteImage
      ? { ogImage: absoluteImage, twitterImage: absoluteImage }
      : {}),
    ...(imageAlt
      ? {
          ogImageAlt: imageAlt,
          twitterImageAlt: imageAlt,
        }
      : {}),
    twitterCard: absoluteImage ? "summary_large_image" : "summary",
    twitterTitle: title,
    twitterDescription: description,
    robots,
    ogSiteName: siteName,
    ogLocale,
  });

  useHead({
    htmlAttrs: { lang },
    link: [{ rel: "canonical", href: canonical }],
  });
}
