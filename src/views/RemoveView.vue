<template>
  <div class="container mx-auto px-4">
    <full-resizer />
    <message-box />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FullResizer from "@/components/FullResizer.vue"; // @ is an alias to /src
import MessageBox from "@/components/MessageBox.vue";

export default defineComponent({
  name: "RemoveView",
  components: {
    FullResizer,
    MessageBox,
  },
});
</script>
