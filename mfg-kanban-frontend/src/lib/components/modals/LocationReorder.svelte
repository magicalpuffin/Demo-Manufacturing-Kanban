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
			onEnd: function (evt) {
				// Need to figure out how update database
				console.log('sort ended');
				console.log(evt.oldIndex);
				console.log(evt.newIndex);

				if (typeof evt.oldIndex !== 'undefined' && typeof evt.newIndex !== 'undefined') {
					let movedLocation = Locations.splice(evt.oldIndex, 1);
					Locations.splice(evt.newIndex, 0, movedLocation[0]);

					// uhh so i probably don't want reactivity, should set values to new variable
					// bug when reactive updating, sortable already reorders the dom
					// Locations = Locations.map((item, index) => ({ ...item, sequence: index }));
					Locations.forEach((object, index) => {
						object.sequence = index;
					});
					console.log(Locations);
				}
			}
		});
	});
	// $: console.log(Locations);
</script>

<span class="mt-2 text-gray-600">Re-Order Locations</span>
<div bind:this={sortableEle} class="flex max-w-sm flex-col gap-2">
	{#each Locations as Location}
		<div class="flex flex-row justify-between rounded-lg border px-2 py-2">
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
