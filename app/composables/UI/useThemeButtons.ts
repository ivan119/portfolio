export const useThemeButtons = () => {
  const activeTheme = useCookie<string>("activeTheme", {
    default: () => "default",
    watch: true,
    sameSite: "lax",
  });
  const activeVibe = useCookie<string>("activeVibe", {
    default: () => "classic",
    watch: true,
    sameSite: "lax",
  });
  const isThemeChanging = ref(false);
  const colorMode = useColorMode();
  const toggleTheme = () => {
    if (!isThemeChanging.value) {
      isThemeChanging.value = true;
      setTimeout(() => {
        isThemeChanging.value = false;
      }, 369);
    }
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  };
  const toggleBackground = (v: string) => {
    activeTheme.value = v;
  };
  const toggleVibe = () => {
    activeVibe.value = activeVibe.value === "classic" ? "mono" : "classic";
  };
  const dottedSpinClass = computed(() => {
    return activeTheme.value === "dotted" ? "icon-spin-cw" : "icon-spin-ccw";
  });

  return {
    activeTheme,
    activeVibe,
    colorMode,
    dottedSpinClass,
    isThemeChanging,
    toggleTheme,
    toggleBackground,
    toggleVibe,
  };
};
