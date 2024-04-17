<template>
  <div class="flex justify-start space-x-4">
    <canvas
      ref="canvasRef"
      id="myCanvas"
      width="1200"
      height="1200"
      class="border block bg-white w-full h-auto max-w-2xl max-h-2xl"
    ></canvas>

    <!-- Toolbar -->
    <section class="flex flex-col space-y-4 justify-center">
      <file-input @change="handleImageUpload" />

      <span class="flex justify-around space-x-4">
        <btn-input @click="() => zoom(1.2)">🔍+ Zoom In</btn-input>
        <btn-input @click="() => zoom(0.8)">🔍− Zoom Out</btn-input>
      </span>

      <form-input ref="product" @formSubmitted="saveImage" />

      <br />
    </section>
  </div>
</template>

<script setup lang="ts">
import BtnInput from "@/components/inputs/btnInput.vue";
import FileInput from "@/components/inputs/fileInput.vue";
import FormInput from "@/components/inputs/formInput.vue";

import { onMounted, ref } from "vue";
import { useMessageStore } from "@/store";
const messageStore = useMessageStore();

const canvasRef = ref<HTMLCanvasElement>();
let scaleFactor = 1;
let image: HTMLImageElement | null = null;
let offsetX = 0;
let offsetY = 0;
let isNewImage = true;

onMounted(() => {
  drawImageOnCanvas();
});

// draw image on canvas
function drawImageOnCanvas() {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");

  if (canvas && ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageWidth = (image && image.width * scaleFactor) || 0;
    const imageHeight = (image && image.height * scaleFactor) || 0;

    offsetX = (canvasWidth - imageWidth) / 2;
    offsetY = (canvasHeight - imageHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // check image background
    checkImageBackground(canvas, offsetX, offsetY, imageWidth, imageHeight);

    // draw background
    drawBackground(canvas, ctx);

    if (!image) return;

    ctx.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
  }
}

function drawBackground(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  let background = new Image();
  background.onload = function () {
    if (canvas && ctx) {
      ctx.drawImage(background, 0, 0);
    }
  };

  // background.src = "/img/bg.png";
}

function checkImageBackground(
  canvas: HTMLCanvasElement,
  offsetX: number,
  offsetY: number,
  imageWidth: number,
  imageHeight: number
) {
  if (canvas && image) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const imageData = ctx.getImageData(
        offsetX,
        offsetY,
        imageWidth,
        imageHeight
      );
      const data = imageData.data;
      let hasTransparentPixel = false;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) {
          hasTransparentPixel = true;
          break;
        }
      }

      if (isNewImage) {
        // Push message to store
        messageStore.addMessage(
          hasTransparentPixel
            ? {
                status: "success",
                text: "L'image a au moins un pixel transparent.",
              }
            : {
                status: "error",
                text: "L'image n'a pas de pixel transparent.",
              }
        );
      }

      isNewImage = false;
    }
  }
}

function handleImageUpload(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      image = img;
      // Resize image to not excend canvas size
      const canvas = canvasRef.value;
      if (canvas && image) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imageWidth = image.width;
        const imageHeight = image.height;

        if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
          const ratio = Math.min(
            canvasWidth / imageWidth,
            canvasHeight / imageHeight
          );

          scaleFactor = ratio;
        }
      }

      drawImageOnCanvas();
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function zoom(scale: number) {
  scaleFactor *= scale;
  drawImageOnCanvas();
}

function saveImage(formData: { [key: string]: string }) {
  const canvas: HTMLCanvasElement | undefined = canvasRef.value;
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = `${formData.marque}-${formData.serie}-${formData.nom}.png`;
  link.href = canvas.toDataURL("image/webp", 1);
  link.click();
}
</script>
