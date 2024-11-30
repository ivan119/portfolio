export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server || !document.startViewTransition) {
    return;
  }

  // Check if navigating between blog pages (list to detail or vice versa)
  const isBlogNavigation = (
    (to.path.startsWith('/blog/') && from.path === '/blog') ||
    (to.path === '/blog' && from.path.startsWith('/blog/'))
  );

  if (isBlogNavigation) {
    console.log('isBlogNavigation');
    // Disable Nuxt transitions for blog navigation to allow view transitions
    to.meta.pageTransition = false;
    to.meta.layoutTransition = false;
  } else {
    // Re-enable Nuxt transitions for other routes
    delete to.meta.pageTransition;
    delete to.meta.layoutTransition;
  }
});
