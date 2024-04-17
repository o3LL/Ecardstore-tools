<template>
  <div class="flex justify-evenly space-x-4">
    <file-input @change="handleImageUpload" />
  </div>

  <img ref="original" />
</template>

<script setup lang="ts">
import FileInput from "@/components/inputs/fileInput.vue";
import { ref } from "vue";

const original = ref<HTMLImageElement>();

function handleImageUpload(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      original.value?.setAttribute("src", img.src);
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}
</script>
