const modules = import.meta.glob("~/components/ui/icons/devicon/*.vue");
const iconMap: Record<string, any> = {};

for (const path in modules) {
  // Extract filename: "Vuejs.vue" -> "vuejs"
  const name = path.split("/").pop()?.replace(".vue", "").toLowerCase();
  
  const asyncComponent = defineAsyncComponent(modules[path] as any);
  
  // THIS WAS HOTFIX!
  // TODO: THIS IS BAD PRACTICE ALL SHOULD MATCH THE DATA LIKE EVERYTHING ELSE IS
  if (name === "cursor") {
    iconMap["vscode"] = asyncComponent;
  }
  if (name === "cpp") {
    iconMap["cplusplus"] = asyncComponent;
  }
  if (name === "next") {
    iconMap["nextjs"] = asyncComponent;
  }
  if (name === "angular") {
    iconMap["angularjs"] = asyncComponent;
  }
  if (name === "node") {
    iconMap["nodejs"] = asyncComponent;
  }
  if (name === "adobexd") {
    iconMap["xd"] = asyncComponent;
  }
  if (name) {
    iconMap[name] = asyncComponent;
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
