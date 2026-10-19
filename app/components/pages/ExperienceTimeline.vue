<script setup lang="ts">
import { useExperience } from "~/composables/useExperience";

const { experience, education } = await useExperience();

// Prepare unified timeline steps (Experience items + Education item)
interface TimelineStep {
  id: string;
  shortYear: string;
  period: string;
  role: string;
  company: string;
  client?: string;
  location: string;
  type?: string;
  current?: boolean;
  themeColor: string;
  accentGradient: string;
  highlights: string[];
  technologies: string[];
  isEducation?: boolean;
}

const steps = computed<TimelineStep[]>(() => {
  const list: TimelineStep[] = (experience.value || []).map((item, idx) => {
    let themeColor = "#3b82f6";
    let accentGradient = "from-blue-500/20 via-blue-500/5 to-transparent";

    if (item.current) {
      themeColor = "#10b981";
      accentGradient = "from-emerald-500/20 via-emerald-500/5 to-transparent";
    } else if (item.company.includes("EveryMatrix")) {
      themeColor = "#8b5cf6";
      accentGradient = "from-purple-500/20 via-purple-500/5 to-transparent";
    } else if (item.role.includes("Lead")) {
      themeColor = "#3b82f6";
      accentGradient = "from-blue-500/20 via-indigo-500/5 to-transparent";
    } else {
      themeColor = "#06b6d4";
      accentGradient = "from-cyan-500/20 via-cyan-500/5 to-transparent";
    }

    // Extract a readable short badge (e.g. "2026", "2021-25")
    const shortYear = item.current
      ? "2026 - Now"
      : item.period.includes("2026")
      ? "2026"
      : item.period.includes("2021")
      ? "2021 - 25"
      : "2020 - 21";

    return {
      id: item.id,
      shortYear,
      period: item.period,
      role: item.role,
      company: item.company,
      client: item.client,
      location: item.location,
      type: item.type,
      current: item.current,
      themeColor,
      accentGradient,
      highlights: item.highlights,
      technologies: item.technologies,
      isEducation: false,
    };
  });

  // Append Education as final milestone
  if (education.value && education.value.length > 0) {
    list.push({
      id: "education-milestone",
      shortYear: "Education",
      period: "2008 – 2019",
      role: "Junior Developer & Mechanical Engineering",
      company: "CTK Rijeka Bootcamp & Technical High School",
      location: "Rijeka / Osijek",
      type: "Foundation",
      current: false,
      themeColor: "#f59e0b",
      accentGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
      highlights: education.value.map(
        (e) => `${e.degree} (${e.institution}, ${e.period}): ${e.description}`
      ),
      technologies: ["C++", "Algorithms", "OOP", "MySQL", "Mechanical Design"],
      isEducation: true,
    });
  }

  return list;
});

const activeIndex = ref(0);
const transitionDirection = ref<"next" | "prev">("next");

const activeStep = computed(() => {
  if (!steps.value.length) return null;
  return steps.value[activeIndex.value] ?? steps.value[0];
});

const selectStep = (index: number) => {
  if (index === activeIndex.value) return;
  transitionDirection.value = index > activeIndex.value ? "next" : "prev";
  activeIndex.value = index;
};

const nextStep = () => {
  if (activeIndex.value < steps.value.length - 1) {
    transitionDirection.value = "next";
    activeIndex.value++;
  }
};

const prevStep = () => {
  if (activeIndex.value > 0) {
    transitionDirection.value = "prev";
    activeIndex.value--;
  }
};

// Keyboard Arrow Support
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextStep();
    if (e.key === "ArrowLeft") prevStep();
  };
  window.addEventListener("keydown", handleKeydown);
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
});

// Progress percentage across the horizontal track
const progressPercent = computed(() => {
  if (steps.value.length <= 1) return 100;
  return (activeIndex.value / (steps.value.length - 1)) * 100;
});
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Header Controls & Step Tracker -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <span>Career Timeline</span>
          <span
            v-if="activeStep?.current"
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Current Role
          </span>
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Interactive milestone roadmap. Click nodes or use arrows to traverse through career chapters.
        </p>
      </div>

      <!-- Navigation Arrows -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <span class="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">
          {{ activeIndex + 1 }} / {{ steps.length }}
        </span>
        <button
          type="button"
          @click="prevStep"
          :disabled="activeIndex === 0"
          aria-label="Previous career milestone"
          class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          @click="nextStep"
          :disabled="activeIndex === steps.length - 1"
          aria-label="Next career milestone"
          class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- HORIZONTAL TRACK CONTAINER -->
    <div class="relative py-4 px-2 overflow-x-auto no-scrollbar">
      <div class="min-w-[620px] relative px-6 py-3">
        <!-- Background Connecting Track Rail -->
        <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full"></div>

        <!-- Animated Active Fill Line -->
        <div
          class="absolute left-6 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `calc(${progressPercent}% * 0.9 + 2px)` }"
        ></div>

        <!-- Milestone Interactive Nodes -->
        <div class="relative flex items-center justify-between z-10">
          <button
            v-for="(step, idx) in steps"
            :key="step.id"
            type="button"
            @click="selectStep(idx)"
            class="group flex flex-col items-center focus:outline-none cursor-pointer transition-transform hover:-translate-y-1"
          >
            <!-- Step Pin Indicator -->
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm"
              :class="[
                activeIndex === idx
                  ? 'border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/40 shadow-lg scale-125 ring-4 ring-emerald-500/20'
                  : idx < activeIndex
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 group-hover:border-slate-400'
              ]"
            >
              <svg v-if="idx < activeIndex" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span v-else class="text-xs font-bold">{{ idx + 1 }}</span>
            </div>

            <!-- Text label below node -->
            <div class="mt-2.5 text-center">
              <span
                class="block text-xs font-mono font-bold transition-colors whitespace-nowrap"
                :class="[
                  activeIndex === idx
                    ? 'text-slate-900 dark:text-white font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                ]"
              >
                {{ step.shortYear }}
              </span>
              <span class="block text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[110px]">
                {{ step.company.split(' ')[0] }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- ACTIVE CARD SHOWCASE STAGE (With Silky GPU Animated Transitions) -->
    <div class="relative overflow-hidden min-h-[360px]">
      <Transition
        :name="transitionDirection === 'next' ? 'slide-left' : 'slide-right'"
        mode="out-in"
      >
        <div
          v-if="activeStep"
          :key="activeStep.id"
          class="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 shadow-md transition-all duration-300 will-change-transform"
        >
          <!-- Ambient Glow Background -->
          <div
            class="absolute inset-0 rounded-3xl opacity-50 pointer-events-none bg-gradient-to-br"
            :class="activeStep.accentGradient"
          ></div>

          <div class="relative z-10 space-y-6">
            <!-- Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-5">
              <div>
                <div class="flex items-center gap-2.5 flex-wrap">
                  <h3 class="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    {{ activeStep.role }}
                  </h3>
                  <span
                    v-if="activeStep.type"
                    class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {{ activeStep.type }}
                  </span>
                </div>

                <div class="text-base font-semibold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-2 flex-wrap">
                  <span>{{ activeStep.company }}</span>
                  <span v-if="activeStep.client" class="text-slate-600 dark:text-slate-300">
                    for <strong class="text-slate-900 dark:text-white">{{ activeStep.client }}</strong>
                  </span>
                  <span class="text-slate-400 dark:text-slate-600">•</span>
                  <span class="text-xs md:text-sm font-normal text-slate-500 dark:text-slate-400">{{ activeStep.location }}</span>
                </div>
              </div>

              <!-- Period Badge -->
              <div class="shrink-0">
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border shadow-xs"
                  :class="[
                    activeStep.current
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                  ]"
                >
                  <span v-if="activeStep.current" class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {{ activeStep.period }}
                </span>
              </div>
            </div>

            <!-- Key Achievements / Highlights Grid -->
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-3">
                Key Deliverables & Responsibilities
              </h4>
              <ul class="space-y-2.5">
                <li
                  v-for="(highlight, hIdx) in activeStep.highlights"
                  :key="hIdx"
                  class="flex items-start gap-3 text-sm md:text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed"
                >
                  <span class="text-emerald-500 dark:text-emerald-400 mt-1 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Technology Stack Pills -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2.5">
                Technologies & Tools Applied
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in activeStep.technologies"
                  :key="tech"
                  class="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/70 hover:border-blue-500/40 transition-colors"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Bottom Navigation Bar for Card -->
            <div class="flex items-center justify-between pt-2">
              <button
                type="button"
                @click="prevStep"
                :disabled="activeIndex === 0"
                class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-0 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                <span>← Previous</span>
              </button>

              <!-- Dot indicators -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(_, dotIdx) in steps"
                  :key="dotIdx"
                  type="button"
                  @click="selectStep(dotIdx)"
                  aria-label="Go to milestone"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  :class="[
                    activeIndex === dotIdx
                      ? 'w-6 bg-emerald-500'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  ]"
                ></button>
              </div>

              <button
                type="button"
                @click="nextStep"
                :disabled="activeIndex === steps.length - 1"
                class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-0 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Silky Smooth 60FPS Directional Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease;
  will-change: transform, opacity;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate3d(28px, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-28px, 0, 0);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate3d(-28px, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(28px, 0, 0);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
