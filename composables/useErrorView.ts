import type { NuxtError } from "#app";
import Typewriter from "typewriter-effect/dist/core";

export function useErrorView(error: NuxtError | undefined) {
  const route = useRoute();

  const fakeAdminStyle = ref(false);
  const fakeAdminDetected = computed(() => {
    if (route.path.includes("admin")) {
      fakeAdminStyle.value = true;
      return true;
    }
    return false;
  });

  const errorCode = computed(() => error?.statusCode || "404");

  const errorTitle = computed(() => {
    if (fakeAdminDetected.value) {
      return "You shouldn't explore here! 🕵️‍♂️";
    }
    switch (errorCode.value) {
      case 404:
        return "Page Not Found";
      case 500:
        return "Server Error";
      case 403:
        return "Access Denied";
      default:
        return "Something went wrong";
    }
  });

  const errorMessage = computed(() => {
    if (fakeAdminDetected.value) {
      return "This area is restricted! Get BacK! Redirecting you back to safety...";
    }
    switch (errorCode.value) {
      case 404:
        return "The page you're looking for doesn't exist or has been moved.";
      case 500:
        return "We're experiencing technical difficulties. Please try again later.";
      case 403:
        return "You don't have permission to access this resource.";
      default:
        return error?.message || "An unexpected error occurred. Let's get you back on track.";
    }
  });

  // Typewriter
  const typeTarget = ref<HTMLElement | null>(null);
  let typewriterInstance: any = null;

  const initTypewriter = () => {
    if (!import.meta.client) return;
    if (!typeTarget.value) return;
    if (typewriterInstance && typeof typewriterInstance.stop === "function") {
      try {
        typewriterInstance.stop();
      } catch {}
    }
    typeTarget.value.innerHTML = "";
    typewriterInstance = new Typewriter(typeTarget.value, {
      loop: false,
      delay: 8,
    });
    typewriterInstance.typeString(errorMessage.value).start();
  };

  // Navigation links with icons
  const navigationLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/projects", label: "Projects", icon: "🚀" },
    { path: "/skills", label: "Skills", icon: "⚡" },
    { path: "/blog", label: "Blog", icon: "📝" },
  ];

  const getLinkDescription = (path: string) => {
    switch (path) {
      case "/":
        return "Back to main page";
      case "/projects":
        return "View my work";
      case "/skills":
        return "See my expertise";
      case "/blog":
        return "Read my thoughts";
      default:
        return "Explore content";
    }
  };

  // Animation states
  const isVisible = ref(false);
  const showContent = ref(false);

  // Countdown and redirect for admin routes
  const countdown = ref(5);

  const startCountdown = () => {
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        navigateTo("/");
      }
    }, 1000);
  };

  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true;
    }, 100);

    setTimeout(() => {
      showContent.value = true;
    }, 639);

    setTimeout(() => {
      initTypewriter();
    }, 400);

    if (fakeAdminDetected.value) {
      setTimeout(() => {
        startCountdown();
      }, 1000);
    }
  });

  watch([errorMessage, fakeAdminDetected], () => {
    setTimeout(() => initTypewriter(), 50);
  });

  onUnmounted(() => {
    if (typewriterInstance && typeof typewriterInstance.stop === "function") {
      try {
        typewriterInstance.stop();
      } catch {}
    }
  });

  return {
    // state
    isVisible,
    showContent,
    fakeAdminDetected,
    countdown,
    // computed
    errorCode,
    errorTitle,
    errorMessage,
    // ui helpers
    navigationLinks,
    getLinkDescription,
    // refs
    typeTarget,
  };
}


