<script setup lang="ts">
import type { Character } from '@/types';

const props = defineProps<{
	character: Character;
}>();

</script>

<template>
	<div class="bg-white rounded-xl shadow-md overflow-hidden w-full">
		<div class="bg-slate-800 p-4">
			<h2 class="m-0 text-xl font-semibold text-white text-center">
				{{ props.character.name }}
			</h2>
		</div>
	</div>
</template>