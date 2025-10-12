// middleware/projects-active.ts
// TODO: REFACTOR THIS WITH VIEW-TRANSITION API EVENT FOR BLOG PAGE AS WELL!!!
import { isActiveProjectClass } from "~/composables/useActiveClass";

export default defineNuxtRouteMiddleware((to, from) => {
  const fromRefreshPage = to.path === from.path;
  const fromSinglePage =
    from.path.includes("projects/") && from.path?.length > 8;
  const toSinglePage = to.path.includes("projects/");
  const fromOtherPage = !fromSinglePage;
  if (fromRefreshPage) {
    isActiveProjectClass.value = true;
  } else if (fromSinglePage) {
    isActiveProjectClass.value = false;
  } else if (fromOtherPage) {
    isActiveProjectClass.value = false;
    if (toSinglePage) return;
    isActiveProjectClass.value = true;
  }
});
