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

	// TODO: figure out all of the pass by reference or value
	// This sort of works? i don't understand
	let copyLocations = Locations.slice();
	// Locations.sort((a, b) => a.sequence - b.sequence);
	// let sortedLocations: LocationType[]

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onSort: function (evt) {
				// Need to figure out how update database
				console.log('sort ended');
				// console.log(evt.oldIndex);
				// console.log(evt.newIndex);
				console.log(sortableObj.toArray());

				// i guess this works
				// uses the ids added to div to determine order of obj, update sequence to index
				let reorderedLocations = sortableObj.toArray().map((id, index) => {
					let updatingLocation = Locations.find((item) => item.id == parseInt(id));
					return { ...updatingLocation, sequence: index };
				});
				console.log(reorderedLocations);

				dispatch('locationReorder', reorderedLocations);

				// seems like there was a easier method using toArray() method
				// if (typeof evt.oldIndex !== 'undefined' && typeof evt.newIndex !== 'undefined') {
				// 	let movedLocation = Locations.splice(evt.oldIndex, 1);
				// 	Locations.splice(evt.newIndex, 0, movedLocation[0]);

				// 	// uhh so i probably don't want reactivity, should set values to new variable
				// 	// bug when reactive updating, sortable already reorders the dom
				// 	// Locations = Locations.map((item, index) => ({ ...item, sequence: index }));
				// 	Locations.forEach((object, index) => {
				// 		object.sequence = index;
				// 	});
				// 	console.log(Locations);
				// }
			}
		});
	});
	// $: console.log(Locations);
</script>

<span class="mt-2 text-gray-600">Re-Order Locations</span>
<div bind:this={sortableEle} class="flex max-w-sm flex-col gap-2">
	{#each copyLocations as Location}
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
