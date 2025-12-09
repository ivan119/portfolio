import { ref, type Ref } from "vue";
//@ts-ignore
import Typewriter from "typewriter-effect/dist/core";
//@ts-ignore
import type { TypewriterInstance } from "typewriter-effect/dist/core";

export const useIntroComponent = () => {
  const hideNow = ref(false);
  const fadeInClass = ref(false);
  const hideThemeButtons = ref(true);
  const showSunAndMoonIcon = ref(false);
  const isIntroActive = ref(true);
  const typeWrite: Ref<HTMLElement | null> = ref(null);
  const del = ref(6);
  let typewriterInstances: TypewriterInstance[] = [];

  // click options so we can bind after Typewriter re-renders the anchor
  type ClickOptions = {
    onShowLogo: () => void;
    onShowMain: () => void;
    getRandomQuote: () => { text: string; author: string };
  };
  let clickOptions: ClickOptions | null = null;
  const setPortfolioClickOptions = (opts: ClickOptions) => {
    clickOptions = opts;
  };

  const visibleCharCount = (html: string): number => {
    if (!import.meta.browser) return html.length;
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent ? tmp.textContent.length : 0;
  };

  const resetIntro = (opts: {
    activeTheme: string;
    showIconsDelayMs?: number;
  }) => {
    hideNow.value = false;
    fadeInClass.value = true;
    isIntroActive.value = true;

    if (import.meta.browser) {
      const delay = opts.showIconsDelayMs ?? 3369;
      setTimeout(() => {
        showSunAndMoonIcon.value = true;
      }, delay);

      const wrapper = document.querySelector(".typewrite-wrapper");
      if (wrapper) {
        wrapper.classList.remove("animate-slide", "fade-welcome", "fade-out");
      }
    }

    // stop any running typewriter instances
    if (typewriterInstances.length) {
      typewriterInstances.forEach((tw) => tw.stop && tw.stop());
      typewriterInstances = [];
    }

    // initialize typing for intro lines
    setupTypewriter();
  };

  const onPortfolioClick = (opts: {
    onShowLogo: () => void;
    onShowMain: () => void;
    getRandomQuote: () => { text: string; author: string };
  }) => {
    if (!import.meta.browser) return;
    const wrapper = document.querySelector(".typewrite-wrapper");
    // hide theme icons with transition
    hideThemeButtons.value = true;
    showSunAndMoonIcon.value = false;

    // initial small delay before sliding
    setTimeout(() => {
      if (wrapper) {
        wrapper.classList.add("animate-slide");
      }
      // slide duration (customized)
      setTimeout(() => {
        if (wrapper) {
          wrapper.classList.remove("animate-slide");
          const quote = opts.getRandomQuote();
          wrapper.innerHTML = `
            <div class="welcome-message text-center"></div>
          `;
          const quoteDiv = wrapper.querySelector(
            ".welcome-message",
          ) as HTMLElement | null;
          if (quoteDiv) {
            const quoteTw = new Typewriter(quoteDiv, {
              loop: false,
              delay: 12,
            });
            quoteTw
              .typeString(
                `<div class=\"text-2xl md:text-3xl text-gray-600 dark:text-gray-400 italic mb-2\">\"${quote.text}\"</div>`,
              )
              .pauseFor(639)
              .typeString(
                `<div class=\"text-sm text-gray-500 dark:text-gray-500\">- ${quote.author}</div>`,
              )
              .start();
          }
        }
        // show the quote briefly, then fade out and proceed (customized)
        setTimeout(() => {
          if (wrapper) {
            wrapper.classList.add("fade-out");
          }
          setTimeout(() => {
            hideNow.value = true;
            opts.onShowLogo();
            setTimeout(() => {
              opts.onShowMain();
              isIntroActive.value = false;
            }, 693);
          }, 369);
        }, 3321);
      }, 963);
    }, 369);
  };

  const setupTypewriter = () => {
    if (!typeWrite.value && import.meta.server) return;
    const rootEl = typeWrite.value as HTMLElement | null;
    if (!rootEl) return;
    const targets = Array.from(rootEl.querySelectorAll("[data-typer]"));
    if (typewriterInstances.length) {
      typewriterInstances.forEach((tw) => tw.stop && tw.stop());
      typewriterInstances = [];
    }
    let totalDelay = 1;
    const defaultPostPause = 400;
    targets.forEach((el, idx) => {
      const element = el as HTMLElement;
      const fullHTML = element.innerHTML;
      const chars = visibleCharCount(fullHTML);
      const rect = element.getBoundingClientRect();
      element.style.minHeight = `${Math.ceil(rect.height)}px`;
      element.style.minWidth = `${Math.ceil(rect.width)}px`;
      element.innerHTML = "";
      const elementDelay = idx === 0 ? Number(del.value) : 15;
      const tw = new Typewriter(element, { loop: false, delay: elementDelay });
      tw.pauseFor(totalDelay).typeString(fullHTML);
      if ((element as HTMLElement).dataset.attach === "portfolio-hook") {
        tw.callFunction(() => {
          // attach native click to survive re-render
          const btn = document.getElementById("portfolio-link");
          if (btn && clickOptions) {
            btn.addEventListener(
              "click",
              (ev) => {
                ev.preventDefault();
                onPortfolioClick(clickOptions as ClickOptions);
              },
              { once: true },
            );
          }
        });
      }
      tw.callFunction(() => {
        element.style.minHeight = "";
        element.style.minWidth = "";
      });
      tw.start();
      typewriterInstances.push(tw);
      const estTypingMs = (chars || 1) * elementDelay;
      totalDelay += estTypingMs;
      if (idx === 0) {
        totalDelay += 1;
      } else if (idx === 1) {
        totalDelay += 10;
      } else if (idx === 3) {
        totalDelay += 1;
      } else if (idx === 4) {
        totalDelay += 300;
      } else {
        totalDelay += defaultPostPause;
      }
    });
  };

  return {
    hideNow,
    fadeInClass,
    hideThemeButtons,
    showSunAndMoonIcon,
    isIntroActive,
    typeWrite,
    del,
    resetIntro,
    onPortfolioClick,
    setupTypewriter,
    setPortfolioClickOptions,
  };
};
