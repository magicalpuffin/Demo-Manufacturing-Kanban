<script lang="ts">
	import type { LocationType } from '$lib/types';
	import type { Writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import Sortable from 'sortablejs';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Locations: Writable<LocationType[]>;

	const dispatch = createEventDispatcher<{
		locationReorder: LocationType[];
		locationDelete: LocationType;
	}>();

	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onSort: function (evt) {
				// console.log('sort ended');

				// uses new sequence of location id to update sequence
				let reorderedLocations = sortableObj.toArray().map((id, index) => {
					let updatingLocation = $Locations.find((item) => item.id == parseInt(id)) as LocationType;
					return { ...updatingLocation, sequence: index };
				});

				dispatch('locationReorder', reorderedLocations);
			}
		});
	});
</script>

<span class="mt-2 text-xl font-medium">Re-Order Locations</span>
<div bind:this={sortableEle} class="flex max-w-sm flex-col gap-2">
	{#each $Locations as Location (Location.id)}
		<div
			class="hover:bg-primary flex flex-row justify-between rounded-lg border px-2 py-2"
			data-id={Location.id}
		>
			<div>
				<span class="mr-4">
					{Location.sequence}
				</span>
				<span class="font-semibold">
					{Location.name}
				</span>
			</div>
			<button
				class="btn btn-xs btn-circle btn-ghost hover:text-error place-self-end"
				on:click={() => {
					// add popup warning
					dispatch('locationDelete', Location);
				}}><CancelIcon /></button
			>
		</div>
	{/each}
</div>
