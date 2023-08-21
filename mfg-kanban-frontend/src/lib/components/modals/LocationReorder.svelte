<script lang="ts">
	import type { LocationType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import Sortable from 'sortablejs';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';
	import CreateWorkOrder from './CreateWorkOrder.svelte';

	export let Locations: LocationType[];
	const dispatch = createEventDispatcher();

	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onSort: function (evt) {
				// Need to figure out how update database
				console.log('sort ended');

				// uses new sequence of location id to update sequence
				let reorderedLocations = sortableObj.toArray().map((id, index) => {
					let updatingLocation = Locations.find((item) => item.id == parseInt(id));
					return { ...updatingLocation, sequence: index };
				});

				dispatch('locationReorder', reorderedLocations);
			}
		});
	});
</script>

<span class="mt-2 text-gray-600">Re-Order Locations</span>
<div bind:this={sortableEle} class="flex max-w-sm flex-col gap-2">
	{#each Locations as Location (Location.id)}
		<div class="flex flex-row justify-between rounded-lg border px-2 py-2" data-id={Location.id}>
			<div>
				<span class="mr-4">
					{Location.sequence}
				</span>
				<span class="font-semibold">
					{Location.name}
				</span>
			</div>
			<button
				class="place-self-end rounded-full hover:bg-gray-300 hover:text-red-600"
				on:click={() => {
					// add popup warning
					dispatch('locationDelete', Location);
				}}><CancelIcon /></button
			>
		</div>
	{/each}
</div>
