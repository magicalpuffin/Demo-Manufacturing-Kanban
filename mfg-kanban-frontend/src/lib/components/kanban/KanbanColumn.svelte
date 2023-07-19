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
				console.log('sort ended');
			}
		});
	});
</script>

<div class="border rounded-lg">
	<h1 class="font-bold text-2xl py-2 px-2">{Location.name}</h1>
	<div bind:this={sortableEle} class="flex flex-col gap-2 px-2 py-2">
		{#each WorkOrders as WorkOrder}
			<KanbanCard {WorkOrder} />
		{/each}
	</div>
</div>
