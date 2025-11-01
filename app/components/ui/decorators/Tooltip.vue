<script setup lang="ts">
/* ------------------------------------------------------------------
   All the logic is exactly the same as in your original file.
   Only the imports / wrapper are changed for lazy + client-only.
------------------------------------------------------------------ */
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  computed,
  useTemplateRef,
} from "vue";

interface Props {
  text: string;
  position?: "force-top" | "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light" | "brand";
  delay?: number;
  customStyles?: Record<string, string>;
  autoHideMs?: number;
}
const props = withDefaults(defineProps<Props>(), {
  position: "top",
  size: "md",
  theme: "dark",
  delay: 200,
  customStyles: () => ({}),
  autoHideMs: 3690,
});

/* ---------- state ---------- */
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

/* ---------- computed ---------- */
const tooltipStyles = computed(() => ({
  ...props.customStyles,
  ...adjustedStyles.value,
}));

/* ---------- handlers ---------- */
const handleMouseEnter = () => {
  if (!isTouch.value) {
    lastInteractionType.value = "hover";
    showTooltip.value = true;
  }
};
const handleMouseLeave = () => {
  if (!isTouch.value) showTooltip.value = false;
};
const handleClick = (e: MouseEvent) => {
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
};
const handleTouchEnd = (e: TouchEvent) => {
  const duration = Date.now() - touchStartTime.value;
  if (duration < 300) {
    lastInteractionType.value = "touch";
    toggleTooltip();
  }
  setTimeout(() => (isTouch.value = false), 300);
};

const toggleTooltip = () => (showTooltip.value = !showTooltip.value);
const hideTooltip = () => (showTooltip.value = false);

const clearHideTimer = () => {
  if (hideTimer.value !== null) clearTimeout(hideTimer.value);
  hideTimer.value = null;
};
const scheduleHide = () => {
  clearHideTimer();
  if (props.autoHideMs) {
    hideTimer.value = window.setTimeout(hideTooltip, props.autoHideMs);
  }
};

/* ---------- positioning ---------- */
const adjustTooltipPosition = () => {
  const el = tooltipRef.value;
  if (!el) return;

  currentPosition.value = props.position;
  adjustedStyles.value = {};

  nextTick(() => {
    const container = el.parentElement;
    if (!container) return;

    const tip = el.getBoundingClientRect();
    const con = container.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 12;

    const fits = {
      top: tip.top >= pad,
      bottom: tip.bottom <= vh - pad,
      left: tip.left >= pad,
      right: tip.right <= vw - pad,
    };

    let pos = props.position;
    const adj: Record<string, string> = {};

    // flip if needed
    if (props.position === "top" && !fits.top && fits.bottom) pos = "bottom";
    else if (props.position === "bottom" && !fits.bottom && fits.top)
      pos = "top";
    else if (props.position === "left" && !fits.left && fits.right)
      pos = "right";
    else if (props.position === "right" && !fits.right && fits.left)
      pos = "left";

    // horizontal fine-tune (top/bottom)
    if (pos === "top" || pos === "bottom") {
      if (!fits.left) {
        adj.left = `${pad}px`;
        adj.transform = "translateX(0)";
      } else if (!fits.right) {
        adj.right = `${pad}px`;
        adj.left = "auto";
        adj.transform = "translateX(0)";
      }
    }

    // vertical fine-tune (left/right)
    if (pos === "left" || pos === "right") {
      if (!fits.top) {
        adj.top = `${pad}px`;
        adj.transform = "translateY(0)";
      } else if (!fits.bottom) {
        adj.bottom = `${pad}px`;
        adj.top = "auto";
        adj.transform = "translateY(0)";
      }
    }

    currentPosition.value = pos;
    adjustedStyles.value = adj;
  });
};

/* ---------- outside click / esc ---------- */
const onClickOutside = (e: Event) => {
  const target = e.target as Node;
  const container = tooltipRef.value?.parentElement;
  if (container && !container.contains(target)) hideTooltip();
};
const onEscapeKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") hideTooltip();
};

/* ---------- watchers ---------- */
watch(showTooltip, (val) => {
  if (val) {
    nextTick(adjustTooltipPosition);
    if (lastInteractionType.value !== "hover") scheduleHide();
  } else clearHideTimer();
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

<template>
  <!-- ClientOnly is auto-imported by Nuxt -->
  <ClientOnly>
    <div
      class="tooltip-container relative inline-block"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <slot />

      <Transition name="tooltip" appear>
        <div
          v-if="showTooltip"
          ref="tooltip_ref"
          :class="[
            'tooltip',
            `tooltip-${currentPosition}`,
            `tooltip-${props.size}`,
            `tooltip-${props.theme}`,
          ]"
          :style="tooltipStyles"
        >
          {{ props.text }}
          <div
            :class="['tooltip-arrow', `tooltip-arrow-${currentPosition}`]"
          ></div>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* --------------------------------------------------------------
   Exactly the same CSS you posted – now **scoped** and only
   injected when the component is rendered on the client.
-------------------------------------------------------------- */
.tooltip-container {
  display: inline-block;
  position: relative;
}
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
.tooltip-force-top {
  bottom: 99%;
  left: 50%;
  transform: translateX(-99%);
  margin-bottom: 3px;
}
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
.tooltip-dark {
  background: rgba(9, 26, 40, 0.95);
  color: #fff;
}
.tooltip-light {
  background: rgba(255, 255, 255, 0.95);
  color: #091a28;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.tooltip-brand {
  background: linear-gradient(135deg, #0d9488, #2563eb);
  color: #fff;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}
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
.tooltip-dark .tooltip-arrow {
  color: rgba(9, 26, 40, 0.95);
}
.tooltip-light .tooltip-arrow {
  color: rgba(255, 255, 255, 0.95);
}
.tooltip-brand .tooltip-arrow {
  color: #0d9488;
}
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-5px);
}
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
  .tooltip-container {
    touch-action: manipulation;
  }
}
</style>
