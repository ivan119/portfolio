<template>
  <div class="!max-w-7xl">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h1
        class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center"
      >
        Affective Musical Key Characteristics
      </h1>

      <div class="w-full">
        <!-- Left Column: Search and Keys Grid -->
        <div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for a key..."
            class="w-full p-3 mb-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          />

          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="(keyData, index) in filteredKeys"
              :key="index"
              @click="selectKey(keyData)"
              :class="[
                getKeyColor(keyData.key),
                selectedKey === keyData
                  ? 'ring-4 ring-purple-400 dark:ring-purple-300 scale-105'
                  : 'hover:scale-105 hover:shadow-lg',
              ]"
              class="cursor-pointer p-4 rounded-lg text-white font-medium transform transition-all duration-200 ease-in-out"
            >
              {{ keyData.key }}
            </div>
          </div>
        </div>

        <!-- Right Column: Instant Description -->
        <div class="h-[600px] overflow-y-auto">
          <div
            v-if="selectedKey"
            class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border-2 border-purple-100 dark:border-gray-600"
          >
            <h2
              class="text-2xl font-bold mb-3 text-purple-800 dark:text-purple-300"
            >
              {{ selectedKey.key }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ selectedKey.description }}
            </p>
          </div>

          <div
            v-else
            class="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 italic"
          >
            Select a key to view its characteristics
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import keys from "~/data/musical_key_characteristics.json";

const selectedKey = ref(null);
const searchQuery = ref("");

const filteredKeys = computed(() => {
  return keys.filter((keyData) =>
    keyData.key.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const getKeyColor = (keyName) => {
  const colorMap = {
    C: "bg-red-500 dark:bg-red-600",
    D: "bg-orange-500 dark:bg-orange-600",
    E: "bg-yellow-500 dark:bg-yellow-600",
    F: "bg-green-500 dark:bg-green-600",
    G: "bg-blue-500 dark:bg-blue-600",
    A: "bg-indigo-500 dark:bg-indigo-600",
    B: "bg-violet-600 dark:bg-violet-700",
    "C#": "bg-red-400 dark:bg-red-500",
    "D♭": "bg-red-400 dark:bg-red-500",
    "D#": "bg-orange-400 dark:bg-orange-500",
    "E♭": "bg-orange-400 dark:bg-orange-500",
    "F#": "bg-green-400 dark:bg-green-500",
    "G♭": "bg-green-400 dark:bg-green-500",
    "G#": "bg-blue-400 dark:bg-blue-500",
    "A♭": "bg-blue-400 dark:bg-blue-500",
    "A#": "bg-indigo-400 dark:bg-indigo-500",
    "B♭": "bg-indigo-400 dark:bg-indigo-500",
  };

  const baseNote = keyName
    .replace(/[♭#]/g, (match) => (match === "♭" ? "b" : "#"))
    .split(" ")[0];

  return colorMap[baseNote] || "bg-gray-500 dark:bg-gray-600";
};

const selectKey = (keyData) => {
  selectedKey.value = keyData;
};
</script>
