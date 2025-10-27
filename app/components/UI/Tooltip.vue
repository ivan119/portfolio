<template>
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
    <Transition name="tooltip" appear>
      <div
        v-show="showTooltip"
        ref="tooltipRef"
        :class="[
          'tooltip',
          `tooltip-${currentPosition}`,
          `tooltip-${size}`,
          `tooltip-${theme}`,
        ]"
        :style="tooltipStyles"
      >
        {{ text }}

        <!-- Arrow -->
        <div
          :class="['tooltip-arrow', `tooltip-arrow-${currentPosition}`]"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from "vue";

interface Props {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
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
const tooltipRef = ref<HTMLElement | null>(null);
const currentPosition = ref(props.position);
const isTouch = ref(false);
const touchStartTime = ref(0);
const adjustedStyles = ref<Record<string, string>>({});
const hideTimer = ref<number | null>(null);
const lastInteractionType = ref<"hover" | "click" | "touch" | "programmatic">(
  "programmatic",
);

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

<style scoped>
.tooltip-container {
  display: inline-block;
  position: relative;
}

/* Tooltip base */
.tooltip {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  white-space: nowrap;
  font-weight: 500;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Position variants */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}
.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}
.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 8px;
}
.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}

/* Size variants */
.tooltip-sm {
  padding: 4px 8px;
  font-size: 11px;
  line-height: 1.3;
}
.tooltip-md {
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.4;
}
.tooltip-lg {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
}

/* Theme variants */
.tooltip-dark {
  background: rgba(9, 26, 40, 0.95);
  color: white;
}
.tooltip-light {
  background: rgba(255, 255, 255, 0.95);
  color: #091a28;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.tooltip-brand {
  background: linear-gradient(135deg, #0d9488, #2563eb);
  color: white;
}

/* Arrow base */
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}

/* Arrow positions */
.tooltip-arrow-top {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid currentColor;
}
.tooltip-arrow-bottom {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid currentColor;
}
.tooltip-arrow-left {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid currentColor;
}
.tooltip-arrow-right {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 4px solid currentColor;
}

/* Dark theme arrow colors */
.tooltip-dark .tooltip-arrow {
  color: rgba(9, 26, 40, 0.95);
}
.tooltip-light .tooltip-arrow {
  color: rgba(255, 255, 255, 0.95);
}
.tooltip-brand .tooltip-arrow {
  color: #0d9488;
}

/* Transitions */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-5px);
}

/* Position-specific transitions */
.tooltip-top.tooltip-enter-from,
.tooltip-top.tooltip-leave-to {
  transform: translateX(-50%) translateY(5px);
}
.tooltip-bottom.tooltip-enter-from,
.tooltip-bottom.tooltip-leave-to {
  transform: translateX(-50%) translateY(-5px);
}
.tooltip-left.tooltip-enter-from,
.tooltip-left.tooltip-leave-to {
  transform: translateY(-50%) translateX(5px);
}
.tooltip-right.tooltip-enter-from,
.tooltip-right.tooltip-leave-to {
  transform: translateY(-50%) translateX(-5px);
}

/* Mobile optimizations */
@media (hover: none) and (pointer: coarse) {
  .tooltip {
    font-size: 14px;
    padding: 8px 12px;
    max-width: 250px;
  }

  .tooltip-sm {
    font-size: 12px;
    padding: 6px 10px;
  }

  /* Ensure container doesn't interfere with touch events */
  .tooltip-container {
    touch-action: manipulation;
  }
}
</style>
