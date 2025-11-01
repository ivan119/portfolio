import type { NuxtError } from "#app";
import Typewriter from "typewriter-effect/dist/core";
import type { TypewriterInstance } from "typewriter-effect/dist/core";

export function useErrorView(error: NuxtError | undefined) {
  const route = useRoute();

  const fakeAdminDetected = computed(() => {
    return route.path.includes("admin");
  });
  const errorCode = computed(() =>
    fakeAdminDetected.value ? "401" : error?.statusCode || "404",
  );
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
        return (
          error?.message ||
          "An unexpected error occurred. Let's get you back on track."
        );
    }
  });

  // Typewriter
  const typeTarget = ref<HTMLElement | null>(null);
  let typewriterInstance: TypewriterInstance | null = null;

  const initTypewriter = () => {
    if (!import.meta.client) return;
    if (!typeTarget.value) return;
    if (typewriterInstance) {
      try {
        typewriterInstance.stop();
      } catch (error) {
        // Log error in development, silently fail in production
        if (import.meta.dev) {
          console.warn("Typewriter cleanup error:", error);
        }
      }
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

  // Countdown and redirect for admin routes (smooth animation)
  const countdownStart = 5;
  const durationMs = countdownStart * 1000;
  const startTime = ref(0);
  const elapsedMs = ref(0);
  const countdown = computed(() =>
    Math.max(0, Math.ceil((durationMs - elapsedMs.value) / 1000)),
  );
  const progressPercent = computed(() => {
    const percent = (elapsedMs.value / durationMs) * 100;
    return Math.min(100, Math.max(0, percent));
  });

  let rafId: number | null = null;
  const startCountdown = () => {
    startTime.value = performance.now();
    const tick = (now: number) => {
      elapsedMs.value = now - startTime.value;
      if (elapsedMs.value >= durationMs) {
        elapsedMs.value = durationMs;
        if (rafId !== null) cancelAnimationFrame(rafId);
        navigateTo("/");
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
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
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (typewriterInstance) {
      try {
        typewriterInstance.stop();
      } catch (error) {
        // Log error in development, silently fail in production
        if (import.meta.dev) {
          console.warn("Typewriter cleanup error:", error);
        }
      }
    }
  });

  return {
    // state
    isVisible,
    showContent,
    fakeAdminDetected,
    countdown,
    progressPercent,
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
