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
export function usePageSeo({ title, description, image, imageAlt, robots = "index, follow", lang = "en" }: PageSeoInput) {
  const url = useRequestURL();
  const canonical = `${url.origin}${url.pathname}`;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${url.origin}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;

  // Run on both SSR and client navigations so tags exist every time
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonical,
    ...(absoluteImage ? { ogImage: absoluteImage, twitterImage: absoluteImage } : {}),
    ...(imageAlt ? { ogImageAlt: imageAlt, twitterImageAlt: imageAlt } : {} as any),
    twitterCard: absoluteImage ? "summary_large_image" : "summary",
    twitterTitle: title,
    twitterDescription: description,
    robots,
  });

  useHead({
    htmlAttrs: { lang },
    link: [{ rel: "canonical", href: canonical }],
  });
}


