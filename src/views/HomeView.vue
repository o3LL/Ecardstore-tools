<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl text-white mb-2 font-extrabold">
      Ecardstore Image Resizer
    </h1>
    <image-resizer class="bg-slate-600 rounded p-2" />
    <message-box class="mt-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImageResizer from "@/components/ImageResizer.vue"; // @ is an alias to /src
import MessageBox from "@/components/MessageBox.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ImageResizer,
    MessageBox,
  },
});
</script>
