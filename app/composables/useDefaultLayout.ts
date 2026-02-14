const typeWriterMode = ref(false);
const showLogo = ref(true);
const transitionMode = ref<"slide" | "fade">("fade");
const transitionSlide = ref("slide-right");
const transitionFade = ref("page");

export const useDefaultLayout = () => {
  const route = useRoute();
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const showIntro = useCookie<boolean>("showIntro", {
    default: () => false,
    watch: true,
    sameSite: "lax",
  });

  const showMainContent = computed(() => !showIntro.value);

  // Initialize showLogo based on showIntro if it hasn't been set yet
  if (process.client) {
    showLogo.value = !showIntro.value;
  }

  const changeState = (value: boolean) => {
    showIntro.value = !value;
  };

  const updateShowLogo = (value: boolean) => {
    showLogo.value = value;
  };

  const showIntroComponent = () => {
    showLogo.value = false;
    typeWriterMode.value = true;
    setTimeout(() => {
      showIntro.value = true;
    }, 693);
  };

  const setupViewTransition = () => {
    if (process.client && (document as any).startViewTransition) {
      const handleNavigation = () => {
        (document as any).startViewTransition?.();
      };
      window.addEventListener("popstate", handleNavigation);
      onUnmounted(() => {
        window.removeEventListener("popstate", handleNavigation);
      });
    }
  };

  onBeforeMount(() => {
    setupViewTransition();
  });

  const transitionSlideDirection = computed(() => {
    return route.path === "/" ? "slide-left" : "slide-right";
  });

  const transition = computed(() => ({
    name:
      transitionMode.value === "slide"
        ? transitionSlideDirection.value
        : transitionFade.value,
    mode: "out-in",
  }));

  const handleShowContent = () => {
    if (route.path !== "/" && showIntro.value) {
      showIntro.value = false;
      updateShowLogo(true);
    } else if (route.path === "/" && !showIntro.value) {
      // Ensure logo is shown on home if intro is hidden
      updateShowLogo(true);
    }
  };

  watch(
    () => route.path,
    () => {
      handleShowContent();
    },
    { immediate: true },
  );

  const onIndexPage = computed(
    () => route.name === "index" || route.path === "/",
  );

  return {
    // state
    isDark,
    transitionMode,
    transitionSlide,
    transitionFade,
    typeWriterMode,
    showIntro,
    showMainContent,
    showLogo,
    onIndexPage,
    // computed
    transition,
    // methods
    changeState,
    updateShowLogo,
    showIntroComponent,
  };
};
