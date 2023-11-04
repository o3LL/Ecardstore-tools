<template>
  <div class="container mx-auto px-4">
    <image-resizer />
    <message-box />
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
