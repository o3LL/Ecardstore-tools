import { defineStore } from "pinia";
import { ref } from "vue";

export interface Message {
  status: "success" | "error" | "warning";
  text: string;
}

export const useMessageStore = defineStore("message", () => {
  const messages = ref<Message[]>([]);
  const addMessage = (message: Message) => {
    messages.value.push(message);
  };

  return { messages, addMessage };
});
