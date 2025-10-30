<template>
  <ClientOnly>
    <div
      class="tooltip-container relative inline-block"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <!-- Trigger element (slot) -->
      <slot />

      <!-- Tooltip -->
      <Transition
        appear
        :enter-active-class="'transition ease-out duration-200'"
        :leave-active-class="'transition ease-in duration-200'"
        :enter-from-class="enterFromClass"
        :leave-to-class="enterFromClass"
      >
        <div
          v-if="showTooltip"
          ref="tooltip_ref"
          :class="tooltipClassList"
          :style="tooltipStyles"
        >
          {{ text }}

          <!-- Arrow -->
          <div :class="arrowClassList"></div>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from "vue";

interface Props {
  text: string;
  position?: "force-top" | "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light" | "brand";
  delay?: number;
  customStyles?: Record<string, string>;
  autoHideMs?: number; // auto-hide after shown
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
  size: "md",
  theme: "dark",
  delay: 200,
  customStyles: () => ({}),
  autoHideMs: 3690,
});

const showTooltip = ref(false);
const tooltipRef = useTemplateRef<HTMLDivElement>("tooltip_ref");
const currentPosition = ref(props.position);
const isTouch = ref(false);
const touchStartTime = ref(0);
const adjustedStyles = ref<Record<string, string>>({});
const hideTimer = ref<number | null>(null);
const lastInteractionType = ref<"hover" | "click" | "touch" | "programmatic">(
  "programmatic",
);

const positionForAnim = computed(() =>
  currentPosition.value === "force-top" ? "top" : currentPosition.value,
);

const tooltipClassList = computed(() => {
  const base = [
    "absolute",
    "z-[1000]",
    "pointer-events-none",
    "whitespace-nowrap",
    "font-medium",
    "rounded-md",
    "backdrop-blur-md",
    "shadow-lg",
    "max-w-[300px]",
    "overflow-hidden",
    "text-ellipsis",
  ];

  const positionMap: Record<string, string[]> = {
    top: ["bottom-full", "left-1/2", "-translate-x-1/2", "mb-2"],
    bottom: ["top-full", "left-1/2", "-translate-x-1/2", "mt-2"],
    left: ["right-full", "top-1/2", "-translate-y-1/2", "mr-2"],
    right: ["left-full", "top-1/2", "-translate-y-1/2", "ml-2"],
    "force-top": [
      "bottom-[99%]",
      "left-1/2",
      "-translate-x-[99%]",
      "mb-[3px]",
    ],
  };

  const sizeMap: Record<string, string[]> = {
    sm: ["px-2", "py-1", "text-[11px]", "leading-[1.3]"],
    md: ["px-2.5", "py-1.5", "text-[12px]", "leading-[1.4]"],
    lg: ["px-3", "py-2", "text-[14px]", "leading-[1.4]"],
  };

  const themeMap: Record<string, string[]> = {
    dark: ["bg-[#091a28]/95", "text-white"],
    light: ["bg-white/95", "text-[#091a28]", "border", "border-black/10"],
    brand: ["bg-gradient-to-br", "from-teal-600", "to-blue-600", "text-white"],
  };

  return [
    ...base,
    ...(positionMap[currentPosition.value] || positionMap.top),
    ...(sizeMap[props.size] || sizeMap.md),
    ...(themeMap[props.theme] || themeMap.dark),
  ];
});

const arrowClassList = computed(() => {
  const base = ["absolute", "w-2", "h-2", "rotate-45", "shadow-sm"];

  const pos = positionForAnim.value;
  const positionMap: Record<string, string[]> = {
    top: ["top-full", "left-1/2", "-translate-x-1/2"],
    bottom: ["bottom-full", "left-1/2", "-translate-x-1/2"],
    left: ["left-full", "top-1/2", "-translate-y-1/2"],
    right: ["right-full", "top-1/2", "-translate-y-1/2"],
  };

  const themeMap: Record<string, string[]> = {
    dark: ["bg-[#091a28]"],
    light: ["bg-white", "border", "border-black/10"],
    brand: ["bg-gradient-to-br", "from-teal-600", "to-blue-600"],
  };

  return [
    ...base,
    ...(positionMap[pos] || positionMap.top),
    ...(themeMap[props.theme] || themeMap.dark),
  ];
});

const enterFromClass = computed(() => {
  const map: Record<string, string> = {
    top: "opacity-0 translate-y-1",
    bottom: "opacity-0 -translate-y-1",
    left: "opacity-0 translate-x-1",
    right: "opacity-0 -translate-x-1",
  };
  return map[positionForAnim.value] || map.top;
});

// Combine custom styles with adjusted positioning styles
const tooltipStyles = computed(() => ({
  ...props.customStyles,
  ...adjustedStyles.value,
}));

const handleMouseEnter = () => {
  if (!isTouch.value) {
    lastInteractionType.value = "hover";
    showTooltip.value = true;
  }
};

const handleMouseLeave = () => {
  if (!isTouch.value) {
    showTooltip.value = false;
  }
};

const handleClick = (e: MouseEvent) => {
  // Prevent click if it was a touch interaction
  if (isTouch.value) {
    e.preventDefault();
    return;
  }
  lastInteractionType.value = "click";
  toggleTooltip();
};

const handleTouchStart = (e: TouchEvent) => {
  isTouch.value = true;
  touchStartTime.value = Date.now();
  // Don't prevent default - let buttons work normally
};

const handleTouchEnd = (e: TouchEvent) => {
  const touchDuration = Date.now() - touchStartTime.value;

  // Only toggle tooltip if it was a quick tap (not a scroll)
  // And don't prevent default - let button clicks work
  if (touchDuration < 300) {
    lastInteractionType.value = "touch";
    toggleTooltip();
  }

  // Reset touch flag after a delay
  setTimeout(() => {
    isTouch.value = false;
  }, 300);
};

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value;
};

const hideTooltip = () => {
  showTooltip.value = false;
};

const clearHideTimer = () => {
  if (hideTimer.value !== null) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
};

const scheduleHide = () => {
  clearHideTimer();
  if ((props.autoHideMs || 0) > 0) {
    hideTimer.value = window.setTimeout(() => {
      hideTooltip();
    }, props.autoHideMs);
  }
};

// Improved viewport positioning
const adjustTooltipPosition = () => {
  const tooltipEl = tooltipRef.value;
  if (!tooltipEl) return;

  // Reset position and styles
  currentPosition.value = props.position;
  adjustedStyles.value = {};

  // Wait for next tick to get accurate measurements
  nextTick(() => {
    const container = tooltipEl.parentElement;
    if (!container) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const padding = 12;

    let newPosition = props.position;
    let adjustments: Record<string, string> = {};

    // Check if current position fits in viewport
    const fits = {
      top: tooltipRect.top >= padding,
      bottom: tooltipRect.bottom <= viewport.height - padding,
      left: tooltipRect.left >= padding,
      right: tooltipRect.right <= viewport.width - padding,
    };

    // Adjust position if needed
    if (props.position === "top" && !fits.top && fits.bottom) {
      newPosition = "bottom";
    } else if (props.position === "bottom" && !fits.bottom && fits.top) {
      newPosition = "top";
    } else if (props.position === "left" && !fits.left && fits.right) {
      newPosition = "right";
    } else if (props.position === "right" && !fits.right && fits.left) {
      newPosition = "left";
    }

    // Fine-tune horizontal positioning for top/bottom tooltips
    if (newPosition === "top" || newPosition === "bottom") {
      if (!fits.left) {
        adjustments.left = `${padding}px`;
        adjustments.transform = "translateX(0)";
      } else if (!fits.right) {
        adjustments.right = `${padding}px`;
        adjustments.left = "auto";
        adjustments.transform = "translateX(0)";
      }
    }

    // Fine-tune vertical positioning for left/right tooltips
    if (newPosition === "left" || newPosition === "right") {
      if (!fits.top) {
        adjustments.top = `${padding}px`;
        adjustments.transform = "translateY(0)";
      } else if (!fits.bottom) {
        adjustments.bottom = `${padding}px`;
        adjustments.top = "auto";
        adjustments.transform = "translateY(0)";
      }
    }

    currentPosition.value = newPosition;
    adjustedStyles.value = adjustments;
  });
};

// Improved outside click detection
const onClickOutside = (e: Event) => {
  const target = e.target as Node;
  const container = tooltipRef.value?.parentElement;

  if (container && !container.contains(target)) {
    hideTooltip();
  }
};

// Handle escape key
const onEscapeKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    hideTooltip();
  }
};

watch(showTooltip, (val) => {
  if (val) {
    nextTick(() => {
      adjustTooltipPosition();
    });
    // Only auto-hide when not hovered (desktop hover should control visibility)
    if (lastInteractionType.value !== "hover") {
      scheduleHide();
    }
  } else {
    clearHideTimer();
  }
});

onMounted(() => {
  document.addEventListener("click", onClickOutside, true);
  document.addEventListener("touchend", onClickOutside, true);
  document.addEventListener("keydown", onEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside, true);
  document.removeEventListener("touchend", onClickOutside, true);
  document.removeEventListener("keydown", onEscapeKey);
  clearHideTimer();
});
</script>

<style scoped></style>
