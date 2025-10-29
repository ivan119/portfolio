<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    primaryHref: string;
    primaryLabel?: string;
    subtitle?: string;
    previewActive?: boolean;
    secondaryLabelShow?: string;
    secondaryLabelHide?: string;
    placement?: "inline" | "bottom" | "right";
    disabledPreview?: boolean;
  }>(),
  {
    primaryLabel: "Open",
    secondaryLabelShow: "Preview",
    secondaryLabelHide: "Hide preview",
    placement: "inline",
  },
);

const emit = defineEmits<{
  (e: "toggle-preview"): void;
}>();

const primaryLabel = computed(() => props.primaryLabel);
const secondaryLabelShow = computed(() => props.secondaryLabelShow);
const secondaryLabelHide = computed(() => props.secondaryLabelHide);
</script>

<template>
  <template v-if="props.placement === 'inline'">
    <div class="w-full">
      <div class="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-3">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">{{ title }}</p>
            <p v-if="subtitle" class="truncate text-xs text-slate-500">{{ subtitle }}</p>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton size="sm" :href="primaryHref" external variant="primary">
              {{ primaryLabel }}
            </BaseButton>
            <BaseButton size="sm" variant="default" @click="emit('toggle-preview')" :disabled="disabledPreview">
              {{ disabledPreview ? 'Preview disabled' : (props.previewActive ? secondaryLabelHide : secondaryLabelShow) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="props.placement === 'bottom'">
    <div class="fixed bottom-3 left-0 right-0 px-3 md:px-6 z-40">
      <div
        class="mx-auto max-w-4xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60 shadow-lg"
      >
        <div class="flex items-center justify-between gap-3 p-3">
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">{{ title }}</p>
            <p v-if="subtitle" class="truncate text-xs text-slate-500">{{ subtitle }}</p>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton size="sm" :href="primaryHref" external variant="primary">
              {{ primaryLabel }}
            </BaseButton>
            <BaseButton size="sm" variant="default" @click="emit('toggle-preview')" :disabled="disabledPreview">
              {{ disabledPreview ? 'Preview disabled' : (props.previewActive ? secondaryLabelHide : secondaryLabelShow) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 transform z-40">
      <div
        class="w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60 shadow-lg"
      >
        <div class="flex flex-col gap-3 p-3">
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">{{ title }}</p>
            <p v-if="subtitle" class="truncate text-xs text-slate-500">{{ subtitle }}</p>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton size="sm" :href="primaryHref" external variant="primary">
              {{ primaryLabel }}
            </BaseButton>
            <BaseButton size="sm" variant="default" @click="emit('toggle-preview')">
              {{ props.previewActive ? secondaryLabelHide : secondaryLabelShow }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </template>
  
</template>

<style scoped></style>


