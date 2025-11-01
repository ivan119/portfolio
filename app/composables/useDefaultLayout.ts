export const useDefaultLayout = () => {
  const route = useRoute();
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const transitionMode = ref<"slide" | "fade">("fade");
  const transitionSlide = ref("slide-right");
  const transitionFade = ref("page");

  const typeWriterMode = ref(false);
  const showIntro = useCookie<boolean>("showIntro", {
    default: () => false,
    watch: true,
    sameSite: "lax",
  });
  const showMainContent = computed(() => !showIntro.value);
  const showLogo = ref(!showIntro.value);

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
    // Type guard for View Transition API
    interface DocumentWithViewTransition extends Document {
      startViewTransition?: (callback?: () => void | Promise<void>) => {
        finished: Promise<void>;
        ready: Promise<void>;
        updateCallbackDone: Promise<void>;
        skipTransition: () => void;
      };
    }

    const doc = document as DocumentWithViewTransition;
    if (doc.startViewTransition) {
      const handleNavigation = () => {
        doc.startViewTransition?.();
      };
      window.addEventListener("popstate", handleNavigation);
      onUnmounted(() => {
        window.removeEventListener("popstate", handleNavigation);
      });
    }
  };

  onBeforeMount(() => {
    typeWriterMode.value = false;
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
