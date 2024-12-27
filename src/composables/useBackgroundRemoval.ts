import { ref } from "vue";
import { removeBackground } from "@imgly/background-removal";

export function useBackgroundRemoval() {
  const isLoading = ref(false);
  const progress = ref("");

  // Get the base URL depending on environment
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/Ecardstore-tools"
      : window.location.origin;

  const processImage = async (file: File) => {
    isLoading.value = true;
    try {
      // Process the image
      const result = await removeBackground(file, {
        debug: true,
        progress: (key: string, current: number, total: number) => {
          const [type, subtype] = key.split(":");
          progress.value = `${type} ${subtype} ${(
            (current / total) *
            100
          ).toFixed(0)}%`;
        },
        output: {
          quality: 1,
          format: "image/webp",
        },
      });

      return result;
    } catch (error) {
      console.error("Background removal error:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    progress,
    processImage,
  };
}
