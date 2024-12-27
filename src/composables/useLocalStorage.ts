import { ref } from "vue";

export function useLocalStorage(key: string, defaultValue: boolean) {
  const removeBackground = ref(!(localStorage.getItem(key) === "false"));

  const toggleRemoveBackground = () => {
    localStorage.setItem(key, removeBackground.value.toString());
  };

  return { removeBackground, toggleRemoveBackground };
}
