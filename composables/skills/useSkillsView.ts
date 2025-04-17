export type SkillsViewMode = 'enhanced' | 'row';

export const useSkillsView = () => {
  // View mode preferences
  const viewMode = useStorage<SkillsViewMode>('skills-v2-view-mode', 'enhanced');

  // Container width based on layout
  const containerMaxWidth = computed(() => {
    if (viewMode.value === 'row') {
      return "";
    }
    return "max-w-7xl";
  });

  // View mode options for the toggle
  const viewModeOptions = [
    {
      id: 'enhanced',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
      </svg>`
    },
    {
      id: 'row',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>`
    }
  ];

  return {
    viewMode,
    containerMaxWidth,
    viewModeOptions,
  };
}; 