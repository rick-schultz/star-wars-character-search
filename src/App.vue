<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Card from '@/components/Card.vue';
import { characterService } from '@/services';
import type { Character } from '@/types';
import { normalizeText } from '@/utils';

const search = ref('');
const results = ref<Character[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await characterService.getCharacters();
  results.value = response.results;
  isLoading.value = false;
});

const filteredResults = computed(() => {
  const searchTerm = normalizeText(search.value);
  if (!searchTerm) return results.value;

  const filtered = results.value.filter(character =>
    normalizeText(character.name).includes(searchTerm)
  );

  return filtered;
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-slate-800 mb-8">
      Star Wars Character Search
    </h1>

    <div class="text-center mb-8">
      <input v-model="search" type="text" placeholder="Search characters..." :disabled="isLoading"
        class="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card v-for="character in filteredResults" :key="character.name" :character="character" />
    </div>
  </div>
</template>
