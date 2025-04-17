import { useStorage } from "@vueuse/core";

export type SkillsVersion = 'v1' | 'v2' | 'v3' | 'v4';
export type DetailsVersion = 'inline' | 'teleport' | 'row';

export const useSkillsVersions = () => {
  // Persist user preferences
  const skillsVersion = useStorage<SkillsVersion>("skills-version-preference", "v3");
  const detailsVersion = useStorage<DetailsVersion>("skill-details-version-preference", "teleport");

  // Computed properties for version selection
  const showVersion1 = computed(() => skillsVersion.value === "v1");
  const showVersion2 = computed(() => skillsVersion.value === "v2");
  const showVersion3 = computed(() => skillsVersion.value === "v3");
  const showVersion4 = computed(() => skillsVersion.value === "v4");

  // Layout computeds
  const useTeleport = computed(() => detailsVersion.value === "teleport");
  const useRowLayout = computed(() => detailsVersion.value === "row");

  // Version options
  const versionOptions = [
    { id: "v1", name: "Classic", icon: "ph:layout-fill" },
    { id: "v2", name: "Modern", icon: "ph:layout-grid-fill" },
    { id: "v3", name: "Enhanced", icon: "ph:sparkle-fill" },
    { id: "v4", name: "Grid", icon: "ph:grid-four-fill" },
  ];

  const detailsOptions = [
    { id: "inline", name: "Inline", icon: "ph:sidebar-fill" },
    { id: "teleport", name: "Overlay", icon: "ph:rectangle-fill" },
    { id: "row", name: "Row", icon: "ph:columns-fill" },
  ];

  return {
    skillsVersion,
    detailsVersion,
    showVersion1,
    showVersion2,
    showVersion3,
    showVersion4,
    useTeleport,
    useRowLayout,
    versionOptions,
    detailsOptions,
  };
}; 