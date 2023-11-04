<template>
  <div>
    <ul>
      <li
        v-for="(message, index) in messages"
        :key="index"
        :class="`status-${message.status}`"
      >
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const messages = store.getters.getMessages;

// Watch for changes in messages
store.watch(
  () => store.getters.getMessages,
  (newMessages) => {
    messages.value = newMessages;
  }
);
</script>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

status-0 {
  color: green;

  ::before {
    content: "✅";
  }
}

status-1 {
  color: orange;

  ::before {
    content: "⏳";
  }
}

status-2 {
  color: red;

  ::before {
    content: "❌";
  }
}
</style>
