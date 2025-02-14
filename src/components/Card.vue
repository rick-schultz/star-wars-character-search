<script setup lang="ts">
import type { Character } from '@/types';
import { formatAttribute } from '@/utils';

const props = defineProps<{
	character: Character;
}>();
</script>

<template>
	<div
		class="bg-white rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden w-full">
		<div class="bg-slate-800 p-4">
			<h2 class="m-0 text-xl font-semibold text-white text-center">
				{{ props.character.name }}
			</h2>
		</div>

		<div class="p-6">
			<div class="space-y-3">
				<div class="flex justify-between items-center pb-3 border-b border-gray-100">
					<span class="text-gray-600 font-medium">Birth Year:</span>
					<span class="text-slate-800 font-semibold">{{ formatAttribute(props.character.birth_year) }}</span>
				</div>

				<div class="flex justify-between items-center pb-3 border-b border-gray-100">
					<span class="text-gray-600 font-medium">Height:</span>
					<span class="text-slate-800 font-semibold">
						{{ props.character.height === 'unknown' ? 'Unknown' : `${props.character.height} cm` }}
					</span>
				</div>

				<div class="flex justify-between items-center pb-3 border-b border-gray-100">
					<span class="text-gray-600 font-medium">Mass:</span>
					<span class="text-slate-800 font-semibold">
						{{ props.character.mass === 'unknown' ? 'Unknown' : `${props.character.mass} kg` }}
					</span>
				</div>

				<div class="flex justify-between items-center pb-3">
					<span class="text-gray-600 font-medium">Gender:</span>
					<span class="text-slate-800 font-semibold">{{ formatAttribute(props.character.gender) }}</span>
				</div>

				<div class="flex flex-wrap gap-2 mt-4">
					<div class="p-2 rounded-md text-center bg-gray-50 shadow-md">
						<span
							class="text-xs uppercase tracking-wider text-gray-600 font-semibold block whitespace-nowrap">Hair</span>
						<p class="text-sm text-slate-800 whitespace-nowrap">{{ formatAttribute(props.character.hair_color) }}</p>
					</div>

					<div class="p-2 rounded-md text-center bg-gray-50 shadow-md">
						<span
							class="text-xs uppercase tracking-wider text-gray-600 font-semibold block whitespace-nowrap">Eyes</span>
						<p class="text-sm text-slate-800 whitespace-nowrap">{{ formatAttribute(props.character.eye_color) }}</p>
					</div>

					<div class="p-2 rounded-md text-center bg-gray-50 shadow-md">
						<span
							class="text-xs uppercase tracking-wider text-gray-600 font-semibold block whitespace-nowrap">Skin</span>
						<p class="text-sm text-slate-800 whitespace-nowrap">{{ formatAttribute(props.character.skin_color) }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
