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

export const useImageStore = defineStore("image", () => {
  const image = ref<HTMLImageElement | null>(null);
  const scaleFactor = ref(1);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const isNewImage = ref(true);
  const canvas = ref<HTMLCanvasElement | null>(null);

  const setImage = (newImage: HTMLImageElement) => {
    image.value = newImage;
    isNewImage.value = true;
    fitImageToCanvas();
  };

  const fitImageToCanvas = () => {
    if (!canvas.value || !image.value) return;
    const canvasWidth = canvas.value.width;
    const canvasHeight = canvas.value.height;
    const imageWidth = image.value.width;
    const imageHeight = image.value.height;

    if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
      scaleFactor.value = Math.min(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight
      );
    }
  };

  const updateScale = (scale: number) => {
    scaleFactor.value *= scale;
  };

  const setCanvas = (newCanvas: HTMLCanvasElement) => {
    canvas.value = newCanvas;
  };

  return {
    image,
    canvas,
    scaleFactor,
    offsetX,
    offsetY,
    isNewImage,
    setImage,
    setCanvas,
    updateScale,
    fitImageToCanvas,
  };
});
