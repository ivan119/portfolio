<script setup>
import { watch, onMounted } from "vue";
import { useThemeButtons } from "~/composables/UI/useThemeButtons";
import ThemeButtons from "~/components/UI/ThemeButtons.vue";
import { useThrottleFn } from "@vueuse/core";
const emit = defineEmits(["update:showMainContent", "showLogo"]);
const { colorMode, activeTheme } = useThemeButtons();
const { greeting, updateGreeting, getRandomQuote } = useIntroFunctions();
const {
  hideNow,
  fadeInClass,
  hideThemeButtons,
  showSunAndMoonIcon,
  isIntroActive,
  resetIntro,
  onPortfolioClick,
  typeWrite,
  setPortfolioClickOptions,
} = useIntroComponent();

usePageSeo({
  title: "Ivan Kelava",
  description:
    "Senior frontend developer from Osijek, Croatia. Over 5 years building user-friendly websites and platforms. Explore projects, skills, and get in touch.",
  image: "/seo/IvanKelavaWelcome1200x627.webp",
  imageAlt: "Ivan Kelava favicon",
  lang: "en",
});

updateGreeting();
watch(colorMode, () => {
  if (import.meta.client) {
    updateGreeting();
    const gr = document.getElementById("greeting");
    if (gr) gr.innerHTML = greeting.value;
  }
});

const props = defineProps({
  showIntro: { type: Boolean, default: true },
  typwriterMode: { type: Boolean, default: false },
});

onMounted(() => {
  hideThemeButtons.value = activeTheme.value === "default";
  if (props.typwriterMode) {
    // meanse we are back beacuse click on logo on index page
    // we use typwriter fully there
    resetIntro({ activeTheme: activeTheme.value });
  } else {
    // maybe here just instert small typwrite after effect then show icons :)
    setTimeout(() => {
      showSunAndMoonIcon.value = true;
    }, 369);
  }
  setPortfolioClickOptions({
    onShowLogo: () => emit("showLogo", true),
    onShowMain: () => emit("update:showMainContent", true),
    getRandomQuote,
  });
});

const handlePortfolioClick = useThrottleFn(() => {
  onPortfolioClick({
    onShowLogo: () => emit("showLogo", true),
    onShowMain: () => emit("update:showMainContent", true),
    getRandomQuote,
  });
}, 5000);
</script>

<template>
  <div class="h-dvh relative flex flex-col p-6 sm:p-8">
    <article
      class="typewrite-wrapper fade-enter-from"
      :class="{
        'fade-in': fadeInClass,
        hidden: hideNow,
        'animate-fade-in-quick-pulse': !typwriterMode,
      }"
      ref="typeWrite"
    >
      <h2 data-typer class="text-3xl md:text-4xl font-bold mb-4">
        Hi
        <div class="animate-wave relative w-10 h-10">
          <div class="absolute mt-2">
            <img
              alt="Waving hand emoji"
              title="Waving hand"
              src="/waving-hand.webp"
              width="40"
              height="40"
              loading="eager"
              fetchpriority="high"
              :placeholder="false"
              decoding="async"
              sizes="40px"
            />
          </div>
        </div>
        , I'm
        <span class="text-main-gradient">Ivan</span>
      </h2>

      <h2 data-typer class="text-2xl md:text-3xl mb-2">
        I design/develop things for the web
      </h2>

      <h3 data-typer class="text-2xl md:text-3xl mb-4">
        Experienced as a frontend team lead developer
      </h3>

      <h3 data-typer class="text-xl mb-2">
        Check out my
        <a
          id="portfolio-link"
          variant="link"
          class="hover-main-gradient cursor-pointer font-bold whitespace-nowrap"
          @click.prevent="handlePortfolioClick"
        >
          portfolio
        </a>
      </h3>

      <!-- this is the element after which addClickListener is called -->
      <h3 data-typer data-attach="portfolio-hook" class="text-xl">
        Or contact
        <a
          href="mailto:KelavaIvan@proton.me"
          class="hover-main-gradient font-bold"
          >me</a
        >
      </h3>
      <div v-if="!typwriterMode" class="slide-enter-active">
        <p data-typer id="greeting" class="mt-12 text-sm italic">
          {{ greeting }}
        </p>
        <p data-typer class="text-sm italic mt-2">cya</p>
      </div>
      <p
        v-show="typwriterMode"
        data-typer
        id="greeting"
        class="mt-12 text-sm italic"
      >
        {{ greeting }}
      </p>
      <p v-show="typwriterMode" data-typer class="text-sm italic mt-2">cya</p>
    </article>
    <Transition
      enter-active-class="transition transform duration-300"
      enter-from-class="translate-y-8 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition transform duration-300"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-8 opacity-0"
    >
      <div v-if="showSunAndMoonIcon" class="right-8 bottom-8 absolute">
        <theme-buttons :hide-theme-buttons="hideThemeButtons" />
      </div>
    </Transition>
  </div>
</template>
<style scoped>
/* keep original visual behaviour: cursor hidden, fade-in, slide, fade-out, etc. */
::v-deep(.Typewriter__cursor) {
  @apply hidden;
}

::v-deep(.animate-wave) {
  display: inline-block;
  animation: wave 0.9s ease-in-out 2;
}
@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
}

/* Fade-in: keep original longish fade so the intro feels the same */
.fade-in {
  opacity: 0;
  transform: translateY(33px);
  animation: fadeIn 3s ease-in-out forwards;
}
@keyframes fadeInQuickPulse {
  0% {
    opacity: 0;
    filter: blur(10px) brightness(0.693);
    transform: perspective(963px) translateZ(63px);
  }
  40% {
    opacity: 0.693;
  }
  60% {
    opacity: 0.369;
  } /* quick dip */
  100% {
    opacity: 1;
    filter: blur(0) brightness(1);
    transform: perspective(693px) translateZ(0);
  }
}

.animate-fade-in-quick-pulse {
  animation: fadeInQuickPulse 0.639s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  display: inline-block;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide-out animation used on portfolio click */
.animate-slide {
  animation: slideOut 1.2s ease-in-out forwards;
}
.animate-slide > * {
  animation: slideOut 1.2s ease-in-out forwards;
}
@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  70% {
    transform: translateX(10%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

/* fade-out used after quote typed */
.fade-out {
  animation: fadeOut 0.6s ease-in-out forwards;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

.hidden {
  display: none;
}
</style>
