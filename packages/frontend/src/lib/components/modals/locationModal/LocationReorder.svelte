<script lang="ts">
	import type { locationSelectType } from '@Demo-Manufacturing-Kanban/core/zodSchema';
	import type { Writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import Sortable from 'sortablejs';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';
	import { locationStore } from '$lib/stores';

	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onSort: function (evt) {
				// console.log('sort ended');

				let reorderedLocations = sortableObj.toArray().map((id, index) => {
					let updatingLocation = $locationStore.find(
						(item) => item.id == parseInt(id)
					) as locationSelectType;
					return { ...updatingLocation, sequence: index };
				});
				// console.log(reorderedLocations);
				locationStore.reorder(reorderedLocations);
			}
		});
	});
</script>

<span class="mt-2 text-xl font-medium">Re-Order Locations</span>
<div bind:this={sortableEle} class="flex max-w-sm flex-col gap-2">
	{#each $locationStore.sort((a, b) => a.sequence - b.sequence) as Location (Location.id)}
		<div
			class="flex flex-row justify-between rounded-lg border px-2 py-2 hover:bg-primary"
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
				class="btn btn-circle btn-ghost btn-xs place-self-end hover:text-error"
				on:click={() => {
					if (confirm(`Are you sure you want to delete ${Location.name}?`)) {
						locationStore.remove(Location);
					}
				}}><CancelIcon /></button
			>
		</div>
	{/each}
</div>
