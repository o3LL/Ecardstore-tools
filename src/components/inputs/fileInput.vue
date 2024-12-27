<template>
  <button
    v-if="isLoading"
    type="button"
    disabled
    class="flex rounded p-2 w-full text-sm text-slate-500 bg-white text-center items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 animate-spin mr-2 basis-1/4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
    {{ progress }}
  </button>
  <input
    v-else
    type="file"
    accept="image/*"
    class="block w-full text-sm text-slate-500 bg-white rounded p-2"
    @change="handleChange"
  />
  <div class="flex justify-center">
    <span class="text-white">Remove background ?</span>
    <input
      type="checkbox"
      class="ml-2"
      v-model="removeBackground"
      @change="toggleRemoveBackground"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useBackgroundRemoval } from "@/composables/useBackgroundRemoval";
import { useLocalStorage } from "@/composables/useLocalStorage";

const { removeBackground, toggleRemoveBackground } = useLocalStorage(
  "removeBackground",
  true
);
const { processImage, isLoading, progress } = useBackgroundRemoval();

const emit = defineEmits<{
  (event: "change", file: File | Blob): void;
}>();

async function handleChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (!removeBackground.value) {
    emit("change", file);
    return;
  }

  const processed = await processImage(file);
  if (processed) {
    emit("change", processed);
  }
}
</script>
