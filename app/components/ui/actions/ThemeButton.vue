<template>
  <div
    class="toggle-button relative group"
    :class="[`toggle-button-${variant}`, { 'is-active': isActive }]"
    @click="handleClick"
  >
    <!-- Icon with optional tooltip -->
    <LazyTooltip
      v-if="tooltip"
      :text="tooltip"
      :position="tooltipPosition"
      :size="tooltipSize"
      :theme="tooltipTheme"
    >
      <component :is="icon" :is-active="isActive" :class="iconClasses" />
    </LazyTooltip>

    <!-- Active indicator -->
    <div
      v-if="showActiveIndicator && isActive"
      class="active-indicator"
      :class="`active-indicator-${variant}`"
    ></div>

    <!-- Custom content slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useThrottleFn } from "@vueuse/core";
interface Props {
  icon: any;
  isActive?: boolean;
  variant?: "animated" | "dotted" | "sun" | "moon";
  tooltip?: string;
  tooltipPosition?: "force-top" | "top" | "bottom" | "left" | "right";
  tooltipSize?: "sm" | "md" | "lg";
  tooltipTheme?: "dark" | "light" | "brand";
  showActiveIndicator?: boolean;
  iconClasses?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  variant: "dotted",
  tooltipPosition: "top",
  tooltipSize: "sm",
  tooltipTheme: "dark",
  showActiveIndicator: true,
  iconClasses: "w-6 h-6 icon-transition",
});

const emit = defineEmits(["click"]);

const handleClick = useThrottleFn(() => {
  emit("click");
}, 369);
</script>

<style scoped>
.toggle-button {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  transform: scale(1.1);
}

.toggle-button-theme:hover {
  transform: scale(1.1);
}

.toggle-button-layout:hover,
.toggle-button-background:hover {
  transform: scale(1.1);
}

.toggle-button.is-changing {
  animation: toggle-change 0.5s ease-in-out;
}

/* Allow theme button to animate like others */
.toggle-button-theme.is-changing {
  animation: toggle-change 0.5s ease-in-out;
}

/* Layout variant: rotation handled via explicit spin classes from parent */

/* Active indicator styles */
.active-indicator {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.active-indicator-dotted {
  top: -4px;
  right: -4px;
  background-color: #10b981; /* emerald-500 */
}

.active-indicator-animated {
  top: -4px;
  right: -4px;
  background-color: #3b82f6; /* blue-500 */
}

.active-indicator-theme {
  top: -4px;
  right: -4px;
  background-color: #f59e0b; /* amber-500 */
}

/* Animation keyframes */
@keyframes toggle-change {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes layout-rotate {
  0% {
    transform: rotate(-15deg) scale(0.9);
  }
  50% {
    transform: rotate(8deg) scale(1.15);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

/* Icon spin helpers (used by Dotted/layout toggle) */
.icon-spin-cw {
  animation: spin-cw 0.6s ease-out;
}

.icon-spin-ccw {
  animation: spin-ccw 0.6s ease-out;
}

@keyframes spin-cw {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-ccw {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

/* Keep default hover scaling; no forced transform resets */

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
