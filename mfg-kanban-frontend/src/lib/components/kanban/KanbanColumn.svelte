<script lang="ts">
	import type { LocationType, WorkOrderDetailType } from '$lib/types';
	import { onMount } from 'svelte';
	import KanbanCard from './KanbanCard.svelte';
	import Sortable from 'sortablejs';

	export let Location: LocationType;
	export let WorkOrders: WorkOrderDetailType[];

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

<div class="h-full w-64 flex-none overflow-y-auto overflow-x-hidden px-4">
	<h1 class="px-2 pb-4 pt-2 text-2xl font-bold">{Location.name}</h1>
	<div bind:this={sortableEle} class="flex min-h-[100px] flex-col gap-2 py-2">
		{#each WorkOrders as WorkOrder}
			<KanbanCard on:workorderDelete {WorkOrder} />
		{/each}
	</div>
</div>
