<template>
  <form
    ref="form"
    action=""
    class="flex flex-col"
    @submit.prevent="handleSubmit"
  >
    <label for="text" class="text-white">Marque</label>
    <input
      type="text"
      name="marque"
      id="marque"
      placeholder="Pokémon"
      class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
    />

    <label for="text" class="text-white mt-4">Série</label>
    <input
      type="text"
      name="serie"
      id="serie"
      placeholder="Soleil et Lune"
      class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
    />

    <label for="text" class="text-white mt-4">Nom</label>
    <input
      type="text"
      name="nom"
      id="nom"
      placeholder="Salamèche"
      class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
    />

    <btn-input type="submit" class="mt-12">Save</btn-input>
  </form>
</template>

<script setup lang="ts">
import BtnInput from "@/components/inputs/btnInput.vue";
// Handle submit
import { defineEmits } from "vue";
const emits = defineEmits(["formSubmitted"]);

// Handle submit
function handleSubmit(event: Event) {
  event.preventDefault();
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  const data = Object.fromEntries(formData.entries());

  emits("formSubmitted", data);
}
</script>
