export const isActiveClass = ref(false);
export const isActiveProjectClass = ref(false);
export function useActiveClass() {
  return { isActiveClass, isActiveProjectClass };
}
