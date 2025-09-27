<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
let TypewriterLib = null;

const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(6); // initial typing speed (ms per char) for the first line — tweak this if you want it faster/slower
const hideNow = ref(false);
const fadeInClass = ref(false);
let typewriterInstances = []; // to stop on reset
const isIntroActive = ref(true);
const colorMode = useColorMode();
const greeting = ref("");

// Preload critical images to prevent layout shift
const preloadImages = () => {
  if (import.meta.browser) {
    const img = new Image();
    img.src = "/waving-hand_40x40.webp";
    img.width = 40;
    img.height = 40;
  }
};

// SEO (same as homepage)
usePageSeo({
  title: "Ivan Kelava",
  description:
    "Senior frontend developer from Osijek, Croatia. Over 5 years building user-friendly websites and platforms. Explore projects, skills, and get in touch.",
  image: "/logo.png",
  imageAlt: "Ivan Kelava favicon",
  lang: "en",
});

// Quotes array - moved to computed for potential future filtering
const quotes = [
  {
    text: "A ship in a harbour is safe but that is not what ships are built for.",
    author: "John A. Shedd",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Alan Kay",
  },
  {
    text: "You always need to be working on something, it could be an idea or code.",
    author: "Anonymous",
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
  },
  {
    text: "Good code is its own best documentation.",
    author: "Steve McConnell",
  },
  {
    text: "The problem is not the problem. The problem is your attitude about the problem.",
    author: "Anonymous",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "It's not a bug, it's an undocumented feature.",
    author: "Anonymous",
  },
  { text: "Programmers are the poets of our time.", author: "Anonymous" },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

// Greeting based on time of day
const updateGreeting = () => {
  const hours = new Date().getHours();
  greeting.value =
    hours >= 5 && hours < 18
      ? "☀️ Have a nice day!"
      : hours >= 18 && hours <= 20
        ? "✨ Nice evening!"
        : "✨ Have a good one!";
};

updateGreeting();

watch(colorMode, () => {
  updateGreeting();
  // keep greeting DOM in sync if it exists
  const gr = document.getElementById("greeting");
  if (gr) gr.innerHTML = greeting.value;
});

// Helper: estimate visible character count from HTML string
const visibleCharCount = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent ? tmp.textContent.length : 0;
};

// Improved element sizing to prevent CLS
const preserveElementLayout = (el) => {
  // Use computed styles instead of getBoundingClientRect for more accurate sizing
  const computedStyle = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();

  // Set explicit dimensions based on current layout
  el.style.minHeight = `${Math.ceil(rect.height)}px`;
  el.style.minWidth = `${Math.ceil(rect.width)}px`;

  // Preserve margins and padding
  el.style.marginBottom = computedStyle.marginBottom;
  el.style.marginTop = computedStyle.marginTop;
};

const releaseElementLayout = (el) => {
  // Remove sizing constraints after typing completes
  requestAnimationFrame(() => {
    el.style.minHeight = "";
    el.style.minWidth = "";
    el.style.marginBottom = "";
    el.style.marginTop = "";
  });
};

// Add portfolio click listener (trigger quote + slide + content)
const addClickListener = () => {
  if (!import.meta.browser) return;
  if (!TypewriterLib) return;
  const portfolioBtn = document.getElementById("portfolio-link");
  const wrapper = document.querySelector(".typewrite-wrapper");

  if (!portfolioBtn || !wrapper) return;

  // ensure it runs only once
  portfolioBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault(); // Prevent any default behavior
      wrapper.classList.add("animate-slide");

      setTimeout(() => {
        // replace content with quote container
        wrapper.classList.remove("animate-slide");
        wrapper.innerHTML = `<div class="welcome-message text-center"></div>`;
        const quote = getRandomQuote();
        const quoteDiv = wrapper.querySelector(".welcome-message");

        // quote typing (fast as original)
        const quoteTw = new TypewriterLib(quoteDiv, {
          loop: false,
          delay: 11,
          cursor: "", // Remove cursor for cleaner look
        });

        quoteTw
          .typeString(
            `<div class="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 italic mb-2">"${quote.text}"</div>`,
          )
          .pauseFor(639)
          .typeString(
            `<div class="text-sm text-gray-500 dark:text-gray-500">- ${quote.author}</div>`,
          )
          .callFunction(() => {
            // after quote typed: fade-out -> show logo -> show main content
            setTimeout(() => {
              wrapper.classList.add("fade-out");
              setTimeout(() => {
                emit("showLogo", true);
                hideNow.value = true;
                setTimeout(() => {
                  emit("update:showMainContent", true);
                }, 1369);
                isIntroActive.value = false;
              }, 693);
            }, 1369);
          })
          .start();

        typewriterInstances.push(quoteTw);
      }, 1386);
    },
    { once: true },
  );
};

// Core: set up typing but with all elements in DOM (prevents CLS)
const setupTypewriter = () => {
  if (!import.meta.browser) return;
  if (!TypewriterLib) return;
  if (!typeWrite.value) return;

  const targets = Array.from(typeWrite.value.querySelectorAll("[data-typer]"));

  // stop previous instances
  if (typewriterInstances.length) {
    typewriterInstances.forEach((tw) => {
      if (tw.stop) tw.stop();
      if (tw.destroy) tw.destroy();
    });
    typewriterInstances = [];
  }

  let totalDelay = 1; // initial .pauseFor(1) like original (ms)
  const defaultPostPause = 400; // general pause between lines (ms) - keeps flow readable

  targets.forEach((el, idx) => {
    // capture HTML before clearing
    const fullHTML = el.innerHTML;
    // compute visible chars for timing
    const chars = visibleCharCount(fullHTML);

    // Improved layout preservation
    preserveElementLayout(el);

    // clear the element so it stays in layout but has to be typed into
    el.innerHTML = "";

    // choose delay per original behaviour:
    // - first line uses `del.value` (fast)
    // - subsequent lines emulate changeDelay(15)
    const elementDelay = idx === 0 ? Number(del.value) : 15;

    const tw = new TypewriterLib(el, {
      loop: false,
      delay: elementDelay,
      cursor: "", // Hide cursor for cleaner look
    });

    tw.pauseFor(totalDelay).typeString(fullHTML);

    // attach portfolio click binding at the right moment (after "Or contact ..." completes)
    if (el.dataset.attach === "portfolio-hook") {
      tw.callFunction(() => {
        // Attach click listener after the element finishes typing
        addClickListener();
      });
    }

    // After typing finishes for this element, release size locks
    tw.callFunction(() => {
      releaseElementLayout(el);
    });

    tw.start();
    typewriterInstances.push(tw);

    // estimate how long the typing will take (visible chars * delay)
    const estTypingMs = Math.max(chars * elementDelay, 100); // Minimum 100ms

    // increment totalDelay for next element
    totalDelay += estTypingMs;

    // add original small pauses with better timing
    switch (idx) {
      case 0:
        totalDelay += 1;
        break;
      case 1:
        totalDelay += 10;
        break;
      case 3:
        totalDelay += 1;
        break;
      case 4:
        totalDelay += 300;
        break;
      default:
        totalDelay += defaultPostPause;
    }
  });
};

// Cleanup function to prevent memory leaks
const cleanup = () => {
  if (typewriterInstances.length) {
    typewriterInstances.forEach((tw) => {
      if (tw.stop) tw.stop();
      if (tw.destroy) tw.destroy();
    });
    typewriterInstances = [];
  }
};

// reset and re-run typing
const resetComponent = () => {
  hideNow.value = false;
  fadeInClass.value = false;
  isIntroActive.value = true;

  // clear any classes on wrapper to avoid leftover animation classes
  const wrapper = document.querySelector(".typewrite-wrapper");
  if (wrapper) {
    wrapper.classList.remove("animate-slide", "fade-welcome", "fade-out");
  }

  cleanup();

  nextTick(() => {
    fadeInClass.value = true;
    setupTypewriter();
  });
};

// props and lifecycle
const props = defineProps({
  showIntro: { type: Boolean, default: true },
});

watch(
  () => props.showIntro,
  (nv) => {
    if (nv) resetComponent();
  },
);

onMounted(async () => {
  preloadImages();
  if (import.meta.client) {
    try {
      const mod = await import("typewriter-effect/dist/core");
      TypewriterLib = mod.default || mod;
    } catch (e) {
      // If the typewriter library fails to load, skip typing effects
      TypewriterLib = null;
    }
  }
  resetComponent();
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
/* keep original visual behaviour: cursor hidden, fade-in, slide, fade-out, etc. */
::v-deep(.Typewriter__cursor) {
  @apply hidden;
}

/* Waving hand animation - optimized for performance */
.wave-container {
  @apply inline-flex items-center justify-center;
  width: 40px;
  height: 40px;
  /* Ensure consistent dimensions */
}

.animate-wave {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: wave 0.9s ease-in-out 2;
  will-change: transform; /* Optimize for animation */
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

/* Fade-in: optimized for better performance */
.fade-in {
  opacity: 0;
  transform: translateY(33px);
  animation: fadeIn 3s ease-in-out forwards;
  will-change: opacity, transform;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide-out animation - hardware accelerated */
.animate-slide {
  animation: slideOut 1.2s ease-in-out forwards;
  will-change: transform, opacity;
}

.animate-slide > * {
  animation: slideOut 1.2s ease-in-out forwards;
  will-change: transform, opacity;
}

@keyframes slideOut {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  70% {
    transform: translate3d(10%, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
}

/* fade-out used after quote typed - hardware accelerated */
.fade-out {
  animation: fadeOut 0.6s ease-in-out forwards;
  will-change: opacity, transform;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1.1, 1.1, 1);
  }
}

/* Improved container sizing to prevent CLS */
.typewrite-wrapper {
  min-height: 460px;
  perspective: 1000px;
  transition: opacity 0.3s ease;
  /* Create a new stacking context */
  isolation: isolate;
}

/* Optimize for 3D transforms */
.typewrite-wrapper > * {
  backface-visibility: hidden;
  transform-style: preserve-3d;
  /* Prevent subpixel rendering issues */
  transform: translateZ(0);
}

/* Improved typography spacing */
[data-typer] {
  @apply whitespace-normal md:whitespace-pre;
  /* Prevent text from jumping during typing */
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Better hiding mechanism */
.hidden {
  display: none !important;
}

/* Improve image container to prevent CLS */
.image-container {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .animate-wave {
    animation: none;
  }

  .fade-in {
    animation-duration: 0.3s;
  }

  .animate-slide {
    animation-duration: 0.3s;
  }

  .fade-out {
    animation-duration: 0.3s;
  }
}
</style>

<template>
  <ClientOnly>
    <article
      class="typewrite-wrapper relative transition-all duration-300 p-6 sm:p-8"
      :class="{ 'fade-in': fadeInClass, hidden: hideNow }"
      ref="typeWrite"
    >
      <h1
        data-typer
        class="text-3xl md:text-4xl font-bold mb-4 flex items-center flex-wrap gap-2"
      >
        Hi
        <div class="wave-container">
          <div class="animate-wave image-container">
            <NuxtImg
              alt="waving hand emoji"
              src="/waving-hand_40x40.webp"
              :width="40"
              :height="40"
              loading="eager"
              fetchpriority="high"
              :placeholder="false"
              decoding="async"
              sizes="40px"
              class="w-10 h-10 object-contain"
            />
          </div>
        </div>
        , I'm
        <span class="text-main-gradient">Ivan</span>
      </h1>

      <h2 data-typer class="text-2xl md:text-3xl mb-2">
        I design/develop things for the web
      </h2>

      <h3 data-typer class="text-2xl md:text-3xl mb-4">
        Experienced as a frontend team lead developer
      </h3>

      <h3 data-typer class="text-xl mb-2">
        Check out my
        <BaseButton
          id="portfolio-link"
          variant="link"
          class="hover-main-gradient cursor-pointer font-bold whitespace-nowrap"
          :aria-label="'View Ivan Kelava portfolio'"
        >
          portfolio
        </BaseButton>
      </h3>

      <!-- this is the element after which addClickListener is called -->
      <h3 data-typer data-attach="portfolio-hook" class="text-xl">
        Or contact
        <a
          href="mailto:contacts_reQuests@proton.me"
          class="hover-main-gradient font-bold"
          aria-label="Email Ivan Kelava at contacts_reQuests@proton.me"
        >
          me
        </a>
      </h3>

      <p data-typer id="greeting" class="mt-12 text-sm italic">
        {{ greeting }}
      </p>

      <p data-typer class="text-sm italic mt-2">cya</p>
    </article>

    <template #fallback>
      <article
        class="typewrite-wrapper relative transition-all duration-300 p-6 sm:p-8"
      >
        <h1
          class="text-3xl md:text-4xl font-bold mb-4 flex items-center flex-wrap gap-2"
        >
          Hi
          <div class="wave-container">
            <div class="image-container">
              <NuxtImg
                alt="waving hand emoji"
                src="/waving-hand_40x40.webp"
                :width="40"
                :height="40"
                loading="eager"
                fetchpriority="high"
                :placeholder="false"
                decoding="async"
                sizes="40px"
                class="w-10 h-10 object-contain"
              />
            </div>
          </div>
          , I'm
          <span class="text-main-gradient">Ivan</span>
        </h1>

        <h2 class="text-2xl md:text-3xl mb-2">
          I design/develop things for the web
        </h2>

        <h3 class="text-2xl md:text-3xl mb-4">
          Experienced as a frontend team lead developer
        </h3>

        <h3 class="text-xl mb-2">
          Check out my
          <span class="hover-main-gradient font-bold whitespace-nowrap"
            >portfolio</span
          >
        </h3>

        <h3 class="text-xl">
          Or contact
          <span class="hover-main-gradient font-bold">me</span>
        </h3>

        <p id="greeting" class="mt-12 text-sm italic">{{ greeting }}</p>

        <p class="text-sm italic mt-2">cya</p>
      </article>
    </template>
  </ClientOnly>
</template>
