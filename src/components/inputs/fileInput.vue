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
    {{ rotatingText.value }}...
  </button>
  <input
    v-else
    type="file"
    accept="image/*"
    class="block w-full text-sm text-slate-500 bg-white rounded p-2"
    @change="handleChange"
  />
  <div class="flex">
    <span class="text-white">Remove background ?</span>
    <input
      type="checkbox"
      name="bgRemove"
      id="bgRemove"
      v-model="shouldRemoveBackground"
    />
  </div>
</template>

<script setup lang="ts">
import imglyRemoveBackground from "@imgly/background-removal";

// Push all events to parent
import { defineEmits, reactive } from "vue";
const emits = defineEmits(["change"]);
let isLoading = reactive({ value: false });
let rotatingText = reactive({ value: "Uploading image" });
let shouldRemoveBackground = reactive({ value: true });

// Rotate text to something fun
setInterval(() => {
  const texts = [
    "Uploading image",
    "Removing background",
    "Almost done",
    "Wait a sec",
    "One eternity later",
  ];
  rotatingText.value = texts[Math.floor(Math.random() * texts.length)];
}, 2000);

// Handle change event
async function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  isLoading.value = true;
  const bgRemoved = await imglyRemoveBackground(await files[0].arrayBuffer());

  console.log(bgRemoved);

  if (bgRemoved) {
    emits("change", bgRemoved);
    isLoading.value = false;
  }
}
</script>
