import { defineAsyncComponent } from "vue";

const modules = import.meta.glob("~/components/ui/icons/devicon/*.vue");

const iconMap: Record<string, () => Promise<any>> = {};

for (const path in modules) {
  const name = path.split("/").pop()?.replace(".vue", "").toLowerCase();
  if (name === "cursor") {
    iconMap["vscode"] = modules[path] as () => Promise<any>;
  } else if (name === "cpp") {
    iconMap["cplusplus"] = modules[path] as () => Promise<any>;
  } else if (name === "next") {
    iconMap["nextjs"] = modules[path] as () => Promise<any>;
  } else if (name === "angular") {
    iconMap["angularjs"] = modules[path] as () => Promise<any>;
  } else if (name === "node") {
    iconMap["nodejs"] = modules[path] as () => Promise<any>;
  } else if (name === "adobexd") {
    iconMap["xd"] = modules[path] as () => Promise<any>;
  }

  if (name) {
    iconMap[name] = modules[path] as () => Promise<any>;
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

    const loader = iconMap[key];
    if (!loader) return null;

    return defineAsyncComponent(loader);
  };

  return { handleIconComponent };
};
