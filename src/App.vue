<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Card from '@/components/Card.vue';
import { characterService } from '@/services';
import type { Character } from '@/types';
import { normalizeText } from '@/utils';

const search = ref('');
const results = ref<Character[]>([]);
const isLoading = ref(true);
const error = ref('');
const currentPage = ref(1);
const totalPages = ref(0);

const fetchCharacters = async (page: number) => {
  isLoading.value = true;
  try {
    const response = await characterService.getCharacters(page);
    results.value = response.results;
    totalPages.value = Math.ceil(response.count / 10); // the API returns 10 results per page
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCharacters(1);
});

const filteredResults = computed(() => {
  const searchTerm = normalizeText(search.value);
  if (!searchTerm) return results.value;

  const filtered = results.value.filter(character =>
    normalizeText(character.name).includes(searchTerm)
  );

  return filtered;
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchCharacters(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const visiblePages = computed(() => {
  const delta = 2; // Number of pages to show before and after current page
  const range: number[] = [];
  const maxPages = totalPages.value;
  const current = currentPage.value;

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(maxPages - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift(-1); // Add ellipsis
  }
  if (current + delta < maxPages - 1) {
    range.push(-1); // Add ellipsis
  }

  if (maxPages > 1) {
    range.unshift(1); // Always add first page
    if (maxPages > 2) {
      range.push(maxPages); // Always add last page
    }
  }

  return range;
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

    <div v-if="isLoading" class="text-center py-8 text-gray-600">
      Loading...
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      {{ error }}
    </div>

    <div v-else-if="filteredResults.length === 0" class="text-center py-8 text-gray-600">
      No characters found
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card v-for="character in filteredResults" :key="character.name" :character="character" />
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
        <div class="flex flex-wrap justify-center items-center gap-2">
          <button v-for="page in visiblePages" :key="page" @click="page !== -1 ? handlePageChange(page) : null"
            :disabled="page === -1 || page === currentPage" :class="[
              'px-4 py-2 rounded-lg transition-colors duration-200',
              page === -1
                ? 'cursor-default px-2'
                : page === currentPage
                  ? 'bg-slate-600 text-white cursor-default'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
            ]">
            {{ page === -1 ? '...' : page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
