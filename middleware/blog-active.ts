// middleware/blog-active.ts
import { isActiveClass } from "~/composables/useActiveClass";

export default defineNuxtRouteMiddleware((to, from) => {
  const fromRefreshPage = to.path === from.path;
  const fromSinglePage = from.path.includes("blog/") && from.path?.length > 5;
  const toSinglePage = to.path.includes("blog/");
  const fromOtherPage = !fromSinglePage;
  if (fromRefreshPage) {
    isActiveClass.value = true;
  } else if (fromSinglePage) {
    isActiveClass.value = false;
  } else if (fromOtherPage) {
    isActiveClass.value = false;
    if (toSinglePage) return;
    isActiveClass.value = true;
  }
});
