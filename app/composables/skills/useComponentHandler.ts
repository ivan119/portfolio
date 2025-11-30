const modules = import.meta.glob("~/components/ui/icons/devicon/*.vue", {
  eager: true,
});
const iconMap: Record<string, any> = {};

for (const path in modules) {
  // Extract filename: "Vuejs.vue" -> "vuejs"
  const name = path.split("/").pop()?.replace(".vue", "").toLowerCase();

  if (name) {
    iconMap[name] = (modules[path] as any).default;
  }
}

export const useIconComponentHandler = () => {
  const handleIconComponent = (value: string) => {
    const key = value
      .replace("devicon-", "")
      .replace("-plain", "")
      .replace("-original", "")
      .replace("-wordmark", "")
      .toLowerCase();

    return iconMap[key] ?? null;
  };

  return { handleIconComponent };
};
