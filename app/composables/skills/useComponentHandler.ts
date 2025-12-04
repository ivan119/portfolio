const modules = import.meta.glob("~/components/ui/icons/devicon/*.vue", {
  eager: true,
});
const iconMap: Record<string, any> = {};

for (const path in modules) {
  // Extract filename: "Vuejs.vue" -> "vuejs"
  const name = path.split("/").pop()?.replace(".vue", "").toLowerCase();
  // THIS WAS HOTFIX!
  // TODO: THIS IS BAD PRACTICE ALL SHOULD MATCH THE DATA LIKE EVERYTHING ELSE IS
  if (name === "cursor") {
    iconMap["vscode"] = (modules[path] as any).default;
  }
  if (name === "cpp") {
    iconMap["cplusplus"] = (modules[path] as any).default;
  }
  if (name === "next") {
    iconMap["nextjs"] = (modules[path] as any).default;
  }
  if (name === "angular") {
    iconMap["angularjs"] = (modules[path] as any).default;
  }
  if (name === "node") {
    iconMap["nodejs"] = (modules[path] as any).default;
  }
  if (name === "adobexd") {
    iconMap["xd"] = (modules[path] as any).default;
  }
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
