<script lang="ts">
	import type { LocationType, WorkOrderType } from '$lib/types';
	import { onMount } from 'svelte';
	import KanbanCard from './KanbanCard.svelte';
	import Sortable from 'sortablejs';

	export let Location: LocationType;
	export let WorkOrders: WorkOrderType[];

	let sortableEle: HTMLElement;
	let sortableObj;

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

<div class="px-4">
	<h1 class="font-bold text-2xl pt-2 pb-4 px-2">{Location.name}</h1>
	<div bind:this={sortableEle} class="flex flex-col gap-2 py-2 min-h-[100px]">
		{#each WorkOrders as WorkOrder}
			<KanbanCard {WorkOrder} />
		{/each}
	</div>
</div>
