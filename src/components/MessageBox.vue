<template>
  <div class="bg-slate-600 rounded py-4 px-4">
    <ul class="flex flex-col gap-3">
      <li
        v-for="(message, index) in messages"
        :key="index"
        :class="`status-${message.status} text-white rounded p-1`"
      >
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// get messages from pinia store and display it reactively
import { useMessageStore } from "@/store";
const messageStore = useMessageStore();

const messages = messageStore.messages;
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  .status-success {
    background-color: rgba(0, 255, 0, 0.593);

    &::before {
      content: "✅ ";
    }
  }

  .status-warning {
    background-color: rgba(255, 166, 0, 0.685);

    &::before {
      content: "⚠️ ";
    }
  }

  .status-error {
    background-color: rgba(255, 0, 0, 0.558);

    &::before {
      content: "❌ ";
    }
  }
}
</style>
