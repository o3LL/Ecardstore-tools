<template>
  <button
    v-if="isLoading.value"
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
    {{ progressBar }}
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
      @change="storeSetting"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive, ref } from "vue";
import imglyRemoveBackground from "@imgly/background-removal";

const emits = defineEmits(["change"]);

let isLoading = reactive({ value: false });
let removeBackground = ref(true);
let progressBar = ref("");

// Store removeBackground value in localStorage
// by default, removeBackground is true so we need to check if stored value is false
removeBackground.value = !(
  localStorage.getItem("removeBackground") === "false"
);

const storeSetting = () => {
  localStorage.setItem("removeBackground", removeBackground.value.toString());
};

// Handle change event
async function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files === null) return;

  const file = target.files[0];

  // If remove background is not checked, just emit the file
  if (!removeBackground.value) {
    emits("change", file);
    return;
  }

  isLoading.value = true;

  /** @see: https://github.com/imgly/background-removal-js/blob/main/packages/web-examples/vite-project/src/components/BGRemoval.vue */
  const bgRemoved = await imglyRemoveBackground(await file.arrayBuffer(), {
    debug: false,
    progress: (key: string, current: number, total: number) => {
      const [type, subtype] = key.split(":");
      progressBar.value = `${type} ${subtype} ${(
        (current / total) *
        100
      ).toFixed(0)}%`;
    },
    output: {
      quality: 1,
      type: "foreground",
      format: "image/webp",
    },
  });

  if (bgRemoved) {
    emits("change", bgRemoved);
    isLoading.value = false;
  }
}
</script>
