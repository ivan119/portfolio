<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import Typewriter from "typewriter-effect/dist/core";
import { useRouter } from "vue-router";

const emit = defineEmits(["update:showMainContent", "showLogo"]);
const typeWrite = ref(null);
const del = ref(6); // initial typing speed (ms per char) for the first line — tweak this if you want it faster/slower
const hideNow = ref(false);
const fadeInClass = ref(false);
let typewriterInstances = []; // to stop on reset
const isIntroActive = ref(true);
const colorMode = useColorMode();
const greeting = ref("");

// SEO (same as homepage)
usePageSeo({
  title: "Ivan Kelava",
  description:
    "Senior frontend developer from Osijek, Croatia. Over 5 years building user-friendly websites and platforms. Explore projects, skills, and get in touch.",
  image: "/logo.png",
  imageAlt: "Ivan Kelava favicon",
  lang: "en",
});

// Quotes array
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
    text: "Code is like humor. When you have to explain it, it’s bad.",
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
    text: "It’s not a bug, it’s an undocumented feature.",
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

// Add portfolio click listener (trigger quote + slide + content)
const addClickListener = () => {
  if (!import.meta.browser) return;
  const portfolioBtn = document.getElementById("portfolio-link");
  const wrapper = document.querySelector(".typewrite-wrapper");

  if (!portfolioBtn || !wrapper) return;

  // ensure it runs only once
  portfolioBtn.addEventListener(
    "click",
    () => {
      wrapper.classList.add("animate-slide");

      setTimeout(() => {
        // replace content with quote container
        wrapper.classList.remove("animate-slide");
        wrapper.innerHTML = `<div class="welcome-message text-center"></div>`;
        const quote = getRandomQuote();
        const quoteDiv = wrapper.querySelector(".welcome-message");

        // quote typing (fast as original)
        const quoteTw = new Typewriter(quoteDiv, { loop: false, delay: 11 });
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
      }, 1386);
    },
    { once: true },
  );
};

// Core: set up typing but with all elements in DOM (prevents CLS)
const setupTypewriter = () => {
  if (!typeWrite.value) return;
  const targets = Array.from(typeWrite.value.querySelectorAll("[data-typer]"));
  // stop previous instances
  if (typewriterInstances.length) {
    typewriterInstances.forEach((tw) => tw.stop && tw.stop());
    typewriterInstances = [];
  }

  let totalDelay = 1; // initial .pauseFor(1) like original (ms)
  const defaultPostPause = 400; // general pause between lines (ms) - keeps flow readable

  targets.forEach((el, idx) => {
    // capture HTML before clearing
    const fullHTML = el.innerHTML;
    // compute visible chars for timing
    const chars = visibleCharCount(fullHTML);
    // Reserve space to prevent CLS by locking current size before typing
    const rect = el.getBoundingClientRect();
    el.style.minHeight = `${Math.ceil(rect.height)}px`;
    el.style.minWidth = `${Math.ceil(rect.width)}px`;
    // clear the element so it stays in layout but has to be typed into
    el.innerHTML = "";

    // choose delay per original behaviour:
    // - first line uses `del.value` (fast)
    // - subsequent lines emulate changeDelay(15)
    const elementDelay = idx === 0 ? Number(del.value) : 15;

    const tw = new Typewriter(el, { loop: false, delay: elementDelay });

    // Apply element-specific small pauses that original used
    // mapping from original sequence:
    // idx 0 -> h1 ("Hi ... Ivan")
    // idx 1 -> h2 ("I design/develop things for the web")  => pauseFor(10) after
    // idx 2 -> h3 ("Currently working ...")
    // idx 3 -> h3 ("Check out my ... portfolio") => pauseFor(1) after
    // idx 4 -> h3 ("Or contact ...") => call addClickListener after finishing, then pauseFor(300) before greeting
    // idx 5 -> p greeting
    // idx 6 -> p cya

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
      el.style.minHeight = "";
      el.style.minWidth = "";
    });
    tw.start();
    typewriterInstances.push(tw);

    // estimate how long the typing will take (visible chars * delay)
    const estTypingMs = (chars || 1) * elementDelay;

    // increment totalDelay for next element
    totalDelay += estTypingMs;

    // add original small pauses
    if (idx === 0) {
      // after h1 there was a changeDelay(15) in original - we already set elementDelay accordingly for next items
      // we can add a small default gap
      totalDelay += 1; // original had .pauseFor(1) before first type
    } else if (idx === 1) {
      totalDelay += 10; // original .pauseFor(10)
    } else if (idx === 3) {
      totalDelay += 1; // original .pauseFor(1)
    } else if (idx === 4) {
      // after the "Or contact" line original called addClickListener and then pauseFor(300) before greeting
      totalDelay += 300;
    } else {
      totalDelay += defaultPostPause; // make nice breathing room by default
    }
  });
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
    // restore original markup (we render full HTML in template, so re-mount that markup by forcing a re-render)
  }

  if (typewriterInstances.length) {
    typewriterInstances.forEach((tw) => tw.stop && tw.stop());
    typewriterInstances = [];
  }

  nextTick(() => {
    fadeInClass.value = true;
    // re-populate template DOM is already present (we rely on the template elements)
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

onMounted(() => {
  resetComponent();
});
</script>

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

/* Reserve vertical space to avoid any tiny layout shifts */
.typewrite-wrapper {
  min-height: 460px;
  perspective: 1000px;
  transition: opacity 0.3s ease;
}

/* ensure 3D text painting is stable */
.typewrite-wrapper > * {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
/* hidden toggle */

[data-typer] {
  @apply whitespace-normal md:whitespace-pre;
}
.hidden {
  display: none;
}
</style>

<template>
  <article
    class="typewrite-wrapper relative transition-all duration-300 p-6 sm:p-8"
    :class="{ 'fade-in': fadeInClass, hidden: hideNow }"
    ref="typeWrite"
  >
    <h1 data-typer class="text-3xl md:text-4xl font-bold mb-4">
      Hi
      <div class="animate-wave relative w-10 h-10">
        <div class="absolute mt-2">
          <NuxtImg
            alt="waving-hand"
            src="/waving-hand_40x40.webp"
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
        >me</a
      >
    </h3>

    <p data-typer id="greeting" class="mt-12 text-sm italic">
      {{ greeting }}
    </p>

    <p data-typer class="text-sm italic mt-2">cya</p>
  </article>
</template>
