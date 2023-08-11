<script lang="ts">
	import type { LocationType } from '$lib/types';
	import { onMount } from 'svelte';

	import Sortable from 'sortablejs';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Locations: LocationType[];

	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onEnd: function (evt) {
				// Need to figure out how update database
				console.log('sort ended');
			}
		});
	});
</script>

<span class="text-gray-600 mt-2">Re-Order Locations</span>
<div bind:this={sortableEle} class="gap-2 flex flex-col max-w-sm">
	{#if Locations}
		{#each Locations as Location}
			<div class="py-2 px-2 border justify-between flex flex-row rounded-lg">
				<div>
					<span class="mr-4">
						{Location.sequence}
					</span>
					<span class="font-semibold">
						{Location.name}
					</span>
				</div>
				<button
					class="hover:bg-gray-300 rounded-full place-self-end hover:text-red-600"
					on:click={() => {}}><CancelIcon /></button
				>
			</div>
		{/each}
	{/if}
</div>
