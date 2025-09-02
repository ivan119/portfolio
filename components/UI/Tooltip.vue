<template>
  <div 
    class="tooltip-container relative inline-block"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Trigger element (slot) -->
    <slot />
    
    <!-- Tooltip -->
    <Transition
      name="tooltip"
      appear
    >
      <div
        v-if="showTooltip"
        :class="[
          'tooltip',
          `tooltip-${position}`,
          `tooltip-${size}`,
          `tooltip-${theme}`
        ]"
        :style="customStyles"
      >
        {{ text }}
        
        <!-- Arrow -->
        <div 
          :class="[
            'tooltip-arrow',
            `tooltip-arrow-${position}`
          ]"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light' | 'brand';
  delay?: number;
  customStyles?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  size: 'md',
  theme: 'dark',
  delay: 200,
  customStyles: () => ({})
});

const showTooltip = ref(false);
</script>

<style scoped>
.tooltip-container {
  display: inline-block;
}

.tooltip {
  position: absolute;
  z-index: 50;
  pointer-events: none;
  white-space: nowrap;
  font-weight: 500;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
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
}

.tooltip-md {
  padding: 6px 10px;
  font-size: 12px;
}

.tooltip-lg {
  padding: 8px 12px;
  font-size: 14px;
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

/* Arrow styles */
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
</style>
